export default class Location {
  constructor(data) {
    this.longitude = data.long;
    this.latitude = data.lat;
    this.tz = data.tz;
    this.placeName = data.place_name;
  }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/