const tzlookup = require('tz-lookup');

export default function tzsearch(long, lat){
    // The entire Astronova infrastructure uses "long, lat" as the desired format.
    // This library unfortunately uses "lat, long", so the parameters are reversed here.
    try {
        return tzlookup(lat, long);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}