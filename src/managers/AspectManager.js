import { AspectEnum } from "../settings";

export default class AspectsLister {
  constructor(config, coords1, coords2 = null) {
    this.config = config;
    this.coords1 = coords1;
    this.coords2 = coords2;
  }

  getAspects() {
    if (!this.coords1 || this.coords1.length === 0)
      return [];

    const compareSingleChart = !!this.coords2;
    const aspectList = [];
    const usedKeys = [];

    // If only one set of coordinates, just compare that array to itself
    const planetRowHorizontal = compareSingleChart ? this.coords1 : this.coords2;

    const planetRowVertical = this.coords1;

    for (let planet1 of Object.keys(planetRowHorizontal)) {
      for (let planet2 of Object.keys(planetRowVertical)) {

        const aspectWasAlreadyCompared = compareSingleChart
          ? planet1 === planet2 || usedKeys.indexOf(planet2) >= 0
          : false;

        const aspect = aspectWasAlreadyCompared
          ? null
          : this._parseAspect(
            planet1,
            planetRowHorizontal[planet1],
            planet2,
            planetRowVertical[planet2]
          );

        // Inner loop
        aspectList.push(aspect);
      }
      // Outer loop
      usedKeys.push(planet1);
    }

    return aspectList;
  }

  _getOrb(longitude1, longitude2, lowbound, highbound) {
    const aspectAverage = (lowbound + highbound) / 2;

    const aspect = Math.abs(longitude1 - longitude2);

    // If one longitude is near 360º and the other is near 0º
    const aspect360 = Math.abs(aspect - 360);

    if (lowbound <= aspect && aspect <= highbound) {
      return lowbound === 0
        ? aspect
        : Math.abs(aspect - aspectAverage);
    }

    else if (lowbound <= aspect360 && aspect360 <= highbound) {
      return lowbound === 0
        ? aspect360
        : Math.abs(aspect360 - aspectAverage);
    }

    return null;
  }

  _parseAspect(pname1, plong1, pname2, plong2) {
    let orb = null;

    // Conjunction
    const cnjOrb = this.config.getOrb(AspectEnum.CONJUNCTION);
    orb = this._getOrb(plong1, plong2, 0, cnjOrb);
    if (orb !== null) {
      // console.log(`${pname1} ${orb} ${pname2}`);
      return new Aspect(pname1, pname2, orb, AspectEnum.CONJUNCTION);
    }

    // Opposition
    const oppOrb = this.config.getOrb(AspectEnum.OPPOSITION);
    orb = this._getOrb(plong1, plong2, 180 - oppOrb, 180 + oppOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 180, AspectEnum.OPPOSITION);
    }

    // Square
    const sqrOrb = this.config.getOrb(AspectEnum.SQUARE);
    orb = this._getOrb(plong1, plong2, 90 - sqrOrb, 90 + sqrOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 90, AspectEnum.SQUARE);
    }

    // Trine
    const triOrb = this.config.getOrb(AspectEnum.TRINE);
    orb = this._getOrb(plong1, plong2, 120 - triOrb, 120 + triOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 120, AspectEnum.TRINE);
    }

    // Sextile
    const sxtOrb = this.config.getOrb(AspectEnum.SEXTILE);
    orb = this._getOrb(plong1, plong2, 60 - sxtOrb, 60 + sxtOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 60, AspectEnum.SEXTILE);
    }

    // Semisquare
    const smsOrb = this.config.getOrb(AspectEnum.SEMISQUARE);
    orb = this._getOrb(plong1, plong2, 45 - smsOrb, 45 + smsOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 45, AspectEnum.SEMISQUARE);
    }

    // Sesquisquare
    const sqqOrb = this.config.getOrb(AspectEnum.SESQUISQUARE);
    orb = this._getOrb(plong1, plong2, 135 - sqqOrb, 135 + sqqOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 135, AspectEnum.SESQUISQUARE);
    }

    return new Aspect(pname1, pname2, null, null);
  }
}

class Aspect {
  constructor(planet1, planet2, orb, aspectType) {
    this.planet1 = planet1;
    this.planet2 = planet2;
    this.orb = orb;
    this.aspectType = aspectType;
  }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/