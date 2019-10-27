import ChartData from "../models/ChartData";
import RadixQuery from "../models/RadixQuery";
import { TIMEZONES } from "../settings";
import ReturnParams from "../models/ReturnParams";
import ReturnQuery from "../models/ReturnQuery";

export default class ChartManager {
    createChartData(data) {
        const expectedProperties = [
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

        this.validateExpectedProperties(expectedProperties, data);
        return new ChartData(data);
    }

    createRadixQueryFromRaw(local_dt, longitude, latitude, tz) {
        this.validateRadixQuery(local_dt, longitude, latitude, tz);
        return new RadixQuery(local_dt, longitude, latitude, tz);
    }

    createRadixQueryFromChartData(radix) {
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

        const radixQ = this.createRadixQueryFromChartData(radix);
        const returnParams = this.createReturnParams(return_planet, return_harmonic, return_longitude,
            return_latitude, return_start_date, tz, return_quantity);
        return new ReturnQuery(radixQ, returnParams);
    }

    /* ================== Query models =================  */



    /* ================== Chart models =================  */



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
                throw new Error(`Data is missing expected property: ${p}. Data: ${obj}`);
            else if (!obj[p])
                throw new Error(`Data has null or undefined property: ${p}`);
        });
    }
}