export default class RadixQuery {
    // Represents the JSON that the back end expects as input for single chart calculation.
    constructor(local_dt, longitude, latitude, tz) {
        this.local_datetime = local_dt;
        this.longitude = longitude;
        this.latitude = latitude;
        this.tz = tz;
    }
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/