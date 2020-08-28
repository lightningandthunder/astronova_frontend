import { WheelTypes } from "../settings";

export default class Uniwheel {
  constructor(data) {
    console.log(data)
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
    this.type = WheelTypes.UNIWHEEL;
    this.placeName = data.place_name;

    this.name = null;
  }

  static fromJSON(json) {
    return new Uniwheel(JSON.parse(json));
  }

  setName(name) {
    this.name = name;
    return this;
  }
  setPlaceName(placeName) {
    this.placeName = placeName;
    return this;
  }

}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019 Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/