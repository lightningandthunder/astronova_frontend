import { AspectEnum } from "../settings";
import { getOrb } from "../utils/geometry";

export default class AspectLister {
  constructor(config, coords1 = null, coords2 = null) {
    this.config = config;
    this.coords1 = coords1;
    this.coords2 = coords2;
  }

  getAspects() {
    const compareSingleChart = !this.coords2;
    const aspectList = [];
    const usedKeys = [];

    // If only one set of coordinates, just compare that array to itself
    const transitingPlanets = compareSingleChart ? this.coords1 : this.coords2;
    const natalPlanets = this.coords1;

    for (let transitingPlanetName of Object.keys(transitingPlanets)) {
      for (let natalPlanetName of Object.keys(natalPlanets)) {
        const aspectWasAlreadyCompared = compareSingleChart
          ? transitingPlanetName === natalPlanetName || usedKeys.indexOf(natalPlanetName) >= 0
          : false;

        const aspect = aspectWasAlreadyCompared
          ? null
          : this.parseAspect(
            transitingPlanetName,
            transitingPlanets[transitingPlanetName],
            natalPlanetName,
            natalPlanets[natalPlanetName]
          );

        // Inner loop
        if (aspect)
          aspectList.push(aspect);
      }
      // Outer loop
      usedKeys.push(transitingPlanetName);
    }

    return aspectList;
  }
 
  parseAspect(pname1, plong1, pname2, plong2) {
    let orb = null;

    // Conjunction
    const cnjOrb = this.config.getOrb(AspectEnum.CONJUNCTION);
    orb = getOrb(plong1, plong2, 0, cnjOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb, AspectEnum.CONJUNCTION);
    }

    // Opposition
    const oppOrb = this.config.getOrb(AspectEnum.OPPOSITION);
    orb = getOrb(plong1, plong2, 180 - oppOrb, 180 + oppOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 180, AspectEnum.OPPOSITION);
    }

    // Square
    const sqrOrb = this.config.getOrb(AspectEnum.SQUARE);
    orb = getOrb(plong1, plong2, 90 - sqrOrb, 90 + sqrOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 90, AspectEnum.SQUARE);
    }

    // Trine
    const triOrb = this.config.getOrb(AspectEnum.TRINE);
    orb = getOrb(plong1, plong2, 120 - triOrb, 120 + triOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 120, AspectEnum.TRINE);
    }

    // Sextile
    const sxtOrb = this.config.getOrb(AspectEnum.SEXTILE);
    orb = getOrb(plong1, plong2, 60 - sxtOrb, 60 + sxtOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 60, AspectEnum.SEXTILE);
    }

    // Semisquare
    const smsOrb = this.config.getOrb(AspectEnum.SEMISQUARE);
    orb = getOrb(plong1, plong2, 45 - smsOrb, 45 + smsOrb);
    if (orb !== null) {
      return new Aspect(pname1, pname2, orb % 45, AspectEnum.SEMISQUARE);
    }

    // Sesquisquare
    const sqqOrb = this.config.getOrb(AspectEnum.SESQUISQUARE);
    orb = getOrb(plong1, plong2, 135 - sqqOrb, 135 + sqqOrb);
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