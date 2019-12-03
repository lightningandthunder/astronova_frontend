import logIfDevelopment from './logIfDevelopment';

const tzlookup = require('tz-lookup');

export default function tzsearch(long, lat){
    // The entire Nova infrastructure uses "long, lat" as the desired format.
    // This library unfortunately uses "lat, long", so the parameters are reversed here.
    try {
        const res = tzlookup(lat, long);
        logIfDevelopment("Timezone lookup results:", res);
        return res;
    } catch (e) {
        logIfDevelopment(e);
        return undefined;
    }
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/