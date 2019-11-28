/* Adapted from Typescript from this article: 
** https://itnext.io/an-alternative-to-google-geocoder-api-in-node-js-78728c7b9faa
** originally written by Armando Magalhães
*/

import Location from '../models/Location';

import axios from "axios";
import tzsearch from './tzsearch';
import logIfDevelopment from '../utils/logIfDevelopment';

export default async function geosearch(q) {
    const limit = "1";
    const params = new URLSearchParams({
        q,
        limit,
        format: "json"
    });

    const endpoint = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
    const res = await axios.get(endpoint);
    logIfDevelopment("Geosearch result: ", res);

    if (res.data.length === 0)
        return undefined;
    else
        res.data = res.data[0]; // Take the first location

    try {
        const tz = tzsearch(res.data.lon, res.data.lat)
        res.tz = tz;
        return new Location(res);
    } catch (err) {
        throw new Error(`Geocoding failed: ${err}`)
    }
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/