import { getOrb, getAdjustedLongitude } from "../utils/geometry";
import { logIfDebug } from "../utils/utils";

export default class DisplayAdapter {
  constructor(coords, cusps, radius) {
    Object.keys(coords).forEach(key => {
      this[key] = {
        name: key,
        raw: coords[key],
        display: coords[key],
      };
    });
    Object.keys(cusps).forEach(key => {
      this[key] = {
        name: key,
        raw: cusps[key],
        display: cusps[key],
      };
    });
    this.getRenderCoords(radius);
    // this.smooth(coords, 0, 360, this.minAngle);
  }

  get planets() {
    return Object.keys(this)
      .filter(key => !parseInt(key))
      .map(key => this[key]);
  }

  get cusps() {
    return Object.keys(this)
      .filter(key => parseInt(key))
      .map(key => this[key]);
  }

  smooth_v1(coords, lowerBound, upperBound, minAngle) {
    let prev = { renderCoord: lowerBound };

    // Iterate from first to last planet
    for (let planet of coords) {
      // Abort if too close to the upper bound
      if (getOrb(planet.renderCoord, upperBound, 0, minAngle) <= minAngle) {
        break;
      }

      // Otherwise, proceed
      const overlap = getOrb(planet.renderCoord, prev.renderCoord, 0, minAngle);
      if (overlap < minAngle) {
        coords[planet.name].renderCoord = getAdjustedLongitude(coords[planet.name].renderCoord, overlap)
      }
      prev = coords[planet.name];
    }

    // Iterate from last back to first
    coords = coords.reverse();
    prev = { renderCoord: upperBound };

    for (let planet of coords) {
      // If there's no overlap, we're done
      if (getOrb(prev.renderCoord, planet.rawCoord, 0, minAngle) >= minAngle) {
        break;
      }

      // If we're too close to the lower bound, the house is too small; just abort
      if (getOrb(planet.renderCoord, lowerBound, 0, minAngle) <= minAngle) {
        logIfDebug('House too small to fit planets; aborting the de-clumping process');
        break;
      }

      const overlap = getOrb(prev.renderCoord, planet.renderCoord, 0, minAngle);
      coords[planet.name].renderCoord = getAdjustedLongitude(coords[planet.name].rawCoord, -1 * overlap);
      prev = coords[planet.name];
    }

    return coords;
  }

  getRenderCoords(radius) {
    const minAngle = (500 - radius) * 0.022;
    const sorted = this.mergeSortCoordinates(this);

    let prev = null;
    sorted.forEach((obj, index) => {
      const key = obj.name;
      if (parseInt(key))
        return;  // skip cusps

      if (!prev) {
        prev = this[key];
        return;
      }

      let overlap = minAngle - (this[key].raw - prev.display);
      if (overlap > 0) {
        this[key].display = getAdjustedLongitude(this[key].raw, overlap)
      }
      prev = this[key];
    });
    return;
  }

  mergeSortCoordinates(coords) {
    if (coords.length < 2)
      return coords;

    let arrayOfCoords = [];
    // Add coordinates to array as individual objects
    // Object.keys(coords).map(key => (
    //   arrayOfCoords.push({ [key]: coords[key] })
    // ));
    Object.keys(coords).map(key => (
      arrayOfCoords.push(coords[key])
    ));

    const middle = Math.floor(arrayOfCoords.length / 2);
    const left = arrayOfCoords.slice(0, middle);
    const right = arrayOfCoords.slice(middle);

    return this.merge(this.mergeSortCoordinates(left), this.mergeSortCoordinates(right));
  }

  merge(left, right) {
    let arr = [];
    while (left.length && right.length) {
      if (left[0].raw < right[0].raw) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }

    // Concat anything left over and return the whole array
    return arr.concat(left.slice().concat(right.slice()));
  }
}