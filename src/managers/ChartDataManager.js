import moment from "moment";

import Uniwheel from "../models/Uniwheel";
import Biwheel from "../models/Biwheel";
import RadixQuery from "../models/RadixQuery";
import { TIMEZONES } from "../timezones";
import ReturnParams from "../models/ReturnParams";
import ReturnQuery from "../models/ReturnQuery";
import RelocationQuery from "../models/RelocationQuery";

export default class ChartManager {

    /* ================== Chart models =================  */

    createUniwheel(data, location, name = undefined) {
        const expectedPropertiesData = [
            "local_datetime",
            "ecliptical",
            "mundane",
            "right_ascension",
            "angles",
            "cusps",
            "julian_day",
            "latitude",
            "longitude",
            "obliquity",
            "lst",
            "ramc",
            "svp",
            "tz"
        ];

        const expectedPropertiesLocation = ["placeName"];

        this.validateExpectedProperties(expectedPropertiesData, data);
        this.validateExpectedProperties(expectedPropertiesLocation, location)
        data.placeName = location.placeName;
        const uniwheel = new Uniwheel(data);
        uniwheel.name = name ? name : `${moment(data.local_datetime).format("YYYY/MM/DD")}`
        return uniwheel;
    }

    createBiwheel(data, location, name = undefined) {
        const expectedPropertiesTopLevel = [
            "radix",
            "return_chart"
        ];

        this.validateExpectedProperties(expectedPropertiesTopLevel, data);

        const expectedPropertiesLocation = ["placeName"];
        this.validateExpectedProperties(expectedPropertiesLocation, location);

        const expectedPropertiesCharts = [
            "local_datetime",
            "ecliptical",
            "mundane",
            "right_ascension",
            "angles",
            "cusps",
            "julian_day",
            "latitude",
            "longitude",
            "obliquity",
            "lst",
            "ramc",
            "svp",
            "tz"
        ];

        this.validateExpectedProperties(expectedPropertiesCharts, data.radix);
        this.validateExpectedProperties(expectedPropertiesCharts, data.return_chart);
        const radix = this.createUniwheel(data.radix, location);
        const returnChart = this.createUniwheel(data.return_chart, location);
        const biwheel = new Biwheel(radix, returnChart);
        biwheel.name = `${name || radix.name} return ${moment(returnChart.local_datetime).format("YYYY/MM/DD")}`;
        biwheel.placeName = location.placeName;
        return biwheel;
    }

    /* ================== Query models =================  */

    createRadixQueryFromRaw(local_dt, longitude, latitude, tz) {
        this.validateRadixQuery(local_dt, longitude, latitude, tz);
        return new RadixQuery(local_dt, longitude, latitude, tz);
    }

    createRadixQueryFromUniwheel(radix) {
        if (radix.type !== "Uniwheel")
            throw new Error(`Radix must be instance of Uniwheel, not ${radix.type}`);

        const expectedProperties = [
            "local_datetime",
            "longitude",
            "latitude",
            "tz"
        ];

        this.validateExpectedProperties(expectedProperties, radix);
        return this.createRadixQueryFromRaw(radix.local_datetime, radix.longitude, radix.latitude, radix.tz)
    }

    createReturnParams(return_planet, return_harmonic, return_longitude,
        return_latitude, return_start_date, tz, return_quantity) {
        this.validateReturnParams(return_planet, return_harmonic, return_longitude,
            return_latitude, return_start_date, tz, return_quantity);
        return new ReturnParams(return_planet, return_harmonic, return_longitude,
            return_latitude, return_start_date, tz, return_quantity);
    }

    createReturnQuery(radix, return_planet, return_harmonic, return_longitude,
        return_latitude, return_start_date, tz, return_quantity) {

        const radixQ = this.createRadixQueryFromUniwheel(radix);
        const returnParams = this.createReturnParams(return_planet, return_harmonic, return_longitude,
            return_latitude, return_start_date, tz, return_quantity);

        return new ReturnQuery(radixQ, returnParams);
    }

    createRelocationQuery(location, chart) {
        const expectedProperties = [
            "longitude",
            "latitude",
            "tz",
            "placeName"
        ];
        this.validateExpectedProperties(expectedProperties, location);
        if (!chart.returnChart) {
            return new RelocationQuery(
                location.longitude,
                location.latitude,
                location.tz,
                location.placeName,
                chart
                );
        }
    }

    /* ================== Validations ==================  */

    validateInt(initialValue, varName) {
        let x = NaN;
        try {
            x = parseInt(initialValue);
        } catch (err) {
            throw new Error(`Error while validating ${varName} as int: ${err}`);
        }

        if (isNaN(x))
            throw new Error(`Unable to convert ${varName} to int with value ${initialValue}`)
    }

    validateFloat(initialValue, varName) {
        let x = NaN;
        try {
            x = parseFloat(initialValue);
        } catch (err) {
            throw new Error(`Error while validating ${varName} as float: ${err}`);
        }

        if (isNaN(x))
            throw new Error(`Unable to convert ${varName} to float with value ${initialValue}`)
    }

    validateDate(initialValue, varName) {
        let x = NaN;
        try {
            x = new Date(initialValue);
        } catch (err) {
            throw new Error(`Error while validating ${varName} as date: ${err}`);
        }

        if (isNaN(x) || x.toString() === "Invalid Date")
            throw new Error(`Unable to convert ${varName} to date with value ${initialValue}`);
    }

    validateTz(tz) {
        if (!TIMEZONES.has(tz))
            throw new Error(`${tz} is not a valid timezone`);
    }

    validateReturnParams(return_planet, return_harmonic, return_longitude,
        return_latitude, return_start_date, tz, return_quantity) {
        if (!(return_planet === "Sun" || return_planet === "Moon"))
            throw new Error(`Valid inputs for returns are "Sun" or "Moon"; received ${return_planet}`);

        this.validateInt(return_harmonic, "return_harmonic");
        this.validateFloat(return_longitude, "return_longitude");
        this.validateFloat(return_latitude, "return_latitude");
        this.validateDate(return_start_date, "return_start_date")
        this.validateTz(tz);
        this.validateInt(return_quantity, "return_quantity");
    }

    validateRadixQuery(local_dt, longitude, latitude, tz) {
        this.validateDate(local_dt, "local_dt");
        this.validateFloat(longitude, "longitude");
        this.validateFloat(latitude, "latitude");
        this.validateTz(tz);
    }

    validateExpectedProperties(expectedProperties, obj) {
        if (!(expectedProperties instanceof Array))
            throw new Error("expectedProperties must be instance of Array");

        expectedProperties.forEach(p => {
            if (!obj.hasOwnProperty(p))
                throw new Error(`Data is missing expected property: ${p}. Data: ${obj.toString()}`);
            else if (!obj[p])
                throw new Error(`Data has null or undefined property: ${p}`);
        });
    }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/