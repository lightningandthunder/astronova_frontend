/* Adapted from Typescript from this article: 
** https://itnext.io/an-alternative-to-google-geocoder-api-in-node-js-78728c7b9faa
** originally written by Armando Magalhães
*/

import axios from "axios";

export default async function geosearch (query)  {
    const q = "san francisco, california"
    const limit = "1";
    const params = new URLSearchParams({
        q,
        limit,
        format: "json"
    });
    console.log(params.toString());

    const endpoint = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
    const res = await axios.get(endpoint);
    try {
        console.log(res);
        return res;
    } catch (err) {
        throw new Error(`Geocoding failed: ${err}`)
    }
}