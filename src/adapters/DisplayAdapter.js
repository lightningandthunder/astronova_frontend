import { getOrb, getAdjustedLongitude } from "../utils/geometry";
import { logIfDebug } from "../utils/utils";

export default class DisplayAdapter {
  constructor(coords, cusps, radius) {
    this.coords = Object.keys(coords).forEach(key => {
      this[key] = {
        name: key,
        rawCoord: coords[key],
        renderCoord: coords[key],
      };
    })
    this.cusps = Object.keys(cusps).forEach(key => {
      this[key] = {
        name: key,
        rawCoord: cusps[key],
        renderCoord: cusps[key],
      };
    })
    this.minAngle = (500 - radius) * 0.022;
    this.smooth(coords, 0, 360, this.minAngle);
  }

  useCusps(cusps) {
    this.cusps = cusps;
  }

  smooth(coords, lowerBound, upperBound, minAngle) {
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

  mergeSortCoordinates(coords) {
    if (coords.length < 2)
      return coords;
  
    let arrayOfCoords = [];
    if (!(Array.isArray(coords))) {
      // Add coordinates to array as individual objects
      Object.keys(coords).map(key => (
        arrayOfCoords.push({ [key]: coords[key] })
      ));
    } else {
      arrayOfCoords = coords;
    }
  
    const middle = Math.floor(arrayOfCoords.length / 2);
    const left = arrayOfCoords.slice(0, middle);
    const right = arrayOfCoords.slice(middle);
  
    return merge(mergeSortCoordinates(left), mergeSortCoordinates(right));
  }
  
  merge(left, right) {
    let arr = [];
  
    while (left.length && right.length) {
      // TODO: This is gross; clean this up
      if (Object.values(left[0])[0].rawCoord < Object.values(right[0])[0].rawCoord) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }
  
    // Concat anything left over and return the whole array
    return arr.concat(left.slice().concat(right.slice()));
  }
}