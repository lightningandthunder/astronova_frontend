export default class Location {
    constructor(geo) {
        this.longitude = geo.data.lon;
        this.latitude = geo.data.lat;
        this.tz = geo.tz;
    }
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/