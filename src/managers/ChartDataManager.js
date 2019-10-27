import ChartData from "../models/ChartData";
import RadixQuery from "../models/RadixQuery";

export default class ChartManager {
    createChartData(data) {
        // Validations
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

    /* ================== Validations ==================  */

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

    validateRadixQuery(local_dt, longitude, latitude, tz) {
        /* These "conversions" will work even if the variable is already the correct type.
        ** Everything will get stringified into JSON for communication with the back end, 
        ** of course, but if we can't parse a date from this local_dt value, for instance, 
        ** neither can the back end. 
        */

        try {
            local_dt = new Date(local_dt);
        } catch (err) {
            throw new Error("local_dt cannot be converted to date: " + err);
        }

        try {
            longitude = parseFloat(longitude);
        } catch (err) {
            throw new Error("longitude cannot be converted to float: " + err);
        }

        try {
            latitude = parseFloat(latitude);
        } catch (err) {
            throw new Error("latitude cannot be converted to float: " + err);
        }

        if (typeof (tz) !== "string") {
            throw new Error("tz must be a string");
        } else if (tz.trim().length === 0) {
            throw new Error("tz cannot be empty string");
        }
    }
}