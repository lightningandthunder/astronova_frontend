import Uniwheel from "./Uniwheel";
import { WheelTypes } from "../settings";

export default class Biwheel {
  constructor(radix, solunar) {
    this.radix = radix;
    this.solunar = solunar;
    this.type = WheelTypes.BIWHEEL;
    this.name = "Biwheel";  // Default value
  }

  static fromJSON(json) {
    if (typeof (json) === "string")
      json = JSON.parse(json);

    const radix = new Uniwheel(json.radix);
    const solunar = new Uniwheel(json.solunar);
    return new Biwheel(radix, solunar);
  }

  static arrayFromJSON(json) {
    if (typeof (json) === "string")
      json = JSON.parse(json);

    const charts = json;
    const arr = [];
    for (let c = 0; c < charts.length; c++) {
      const radix = new Uniwheel(charts[c].radix);
      const solunar = new Uniwheel(charts[c].solunar);
      const newChart = new Biwheel(radix, solunar);
      arr.push(newChart);
    }

    return arr;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setRadixName(name) {
    this.radix.name = name;
    return this;
  }

  setSolunarName(name) {
    this.solunar.name = name;
    return this;
  }

  setPlaceName(placeName) {
    this.placeName = placeName;
    return this;
  }

  setRadixPlaceName(placeName) {
    this.radix.placeName = placeName;
    return this;
  }

  setSolunarPlaceName(placeName) {
    this.solunar.placeName = placeName;
    return this;
  }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/