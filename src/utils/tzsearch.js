import logIfDevelopment from './logIfDevelopment';

const tzlookup = require('tz-lookup');

export default function tzsearch(long, lat){
    // The entire Astronova infrastructure uses "long, lat" as the desired format.
    // This library unfortunately uses "lat, long", so the parameters are reversed here.
    try {
        const res = tzlookup(lat, long);
        logIfDevelopment(`tzlookup results: ${res}`);
        return res;
    } catch (e) {
        logIfDevelopment(e);
        return undefined;
    }
}