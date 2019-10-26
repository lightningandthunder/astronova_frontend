/* Adapted from Typescript from this article: 
** https://itnext.io/an-alternative-to-google-geocoder-api-in-node-js-78728c7b9faa
** originally written by Armando Magalhães
*/

import Location from '../models/Location';

import axios from "axios";
import tzsearch from './tzsearch';

export default async function geosearch (q)  {
    const limit = "1";
    const params = new URLSearchParams({
        q,
        limit,
        format: "json"
    });
    console.log(params.toString());

    const endpoint = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
    const res = await axios.get(endpoint);
    if (res.data.length === 0)
        return undefined;
    else
        res.data = res.data[0]; // Take the first location

    try {
        console.log(res);
        const tz = tzsearch(res.data.lon, res.data.lat)
        res.tz = tz;
        return new Location(res);
    } catch (err) {
        throw new Error(`Geocoding failed: ${err}`)
    }
}