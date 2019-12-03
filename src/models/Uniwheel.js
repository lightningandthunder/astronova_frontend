export default class Uniwheel {
    constructor(data) {
        this.ecliptical = data.ecliptical;
        this.mundane = data.mundane;
        this.right_ascension = data.right_ascension;
        this.angles = data.angles;
        this.cusps = data.cusps;
        this.julian_day = data.julian_day;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.obliquity = data.obliquity;
        this.lst = data.lst;
        this.ramc = data.ramc;
        this.svp = data.svp;
        this.local_datetime = data.local_datetime;
        this.tz = data.tz;
        this.type = "Uniwheel";
        this.name = "Uniwheel" // default value
        this.placeName = data.placeName; 
    }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/