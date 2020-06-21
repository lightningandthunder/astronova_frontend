import { SIGNS } from "../settings";

export function toRads(deg) {
  return deg * (Math.PI / 180);
}

export function degToMin(deg) {
  return Math.trunc((deg - Math.trunc(deg)) * 60);
}

export function parseSign(coord) {
  return SIGNS[Math.trunc(coord / 30)];
}

export function avgCoords(pos1, pos2) {
  // Unwrap 0 back around to 360 for easier math
  const normalizedPos2 = Math.abs(pos1 - pos2) > 180 ? pos2 + 360 : pos2;

  const midpoint = (pos1 + normalizedPos2) / 2;

  // Wrap 360 back around to 0
  return midpoint >= 360 ? midpoint - 360 : midpoint;
}

export function getOrb(longitude1, longitude2, lowbound, highbound) {
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

export function derivePoint(origin, pos, radius, rotationalOffset = 0) {
  // Calculate any point on the circle with an angle ("position") and circle radius
  const angleRotated = pos - rotationalOffset;
  const angleNormalized = angleRotated >= 0 ? toRads(angleRotated) : toRads(angleRotated + 360);

  // Mirror across Y axis; 0 begins at left side for us, not right side.
  const x = origin.x + (-1 * radius * Math.cos(angleNormalized));
  const y = origin.y + (radius * Math.sin(angleNormalized));

  return [x, y];
}

export function rotateCoordinatesInRA(coords, ramc) {
  // multiply by -1 since we're adding
  const rotationalOffset = -1 * (ramc - 270);
  const rotatedCoords = {};
  Object.keys(coords).forEach(k => {
    rotatedCoords[k] = getAdjustedLongitude(coords[k], rotationalOffset)
  });
  return rotatedCoords;
}

export function getAdjustedLongitude(baseLongitude, addition) {
  // Adds a value to a base longitude, and normalizes to within 0-359
  let adjustedLongitude = baseLongitude + addition;
  if (adjustedLongitude > 360)
    adjustedLongitude -= 360;
  else if (adjustedLongitude < 0)
    adjustedLongitude += 360;

  return adjustedLongitude;
}

export function mergeSortCoordinates(coords) {
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

export function merge(left, right) {
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

// export function getRenderCoords(coords, cusps, radius) {
//   // TODO: Though this works, these are kind of magic numbers; 
//   // find something more logical
//   const minAngle = (500 - radius) * 0.022;
//   const sorted = mergeSortCoordinates(coords);

//   const [asc, ic, dsc, mc] = [cusps["1"], cusps["4"], cusps["7"], cusps["10"]];

//   smooth(sorted, asc, ic, minAngle);
//   smooth(sorted, ic, dsc, minAngle);
//   smooth(sorted, dsc, mc, minAngle);
//   smooth(sorted, mc, asc, minAngle);

//   return coords;
// }





/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/

export function getRenderCoords(coords, cusps, radius) {
  // TODO: Though this works, these are kind of magic numbers; 
  // find something more logical
  const minAngle = (500 - radius) * 0.022;
  const sorted = mergeSortCoordinates(coords);

  let prev = null;
  sorted.forEach((obj, index) => {
    const key = Object.keys(obj)[0];
    if (index === 0) {
      prev = coords[key];
      return;
    }

    let overlap = minAngle - (obj[key].rawCoord - prev.renderCoord);
    if (overlap > 0) {
      coords[key].renderCoord = getAdjustedLongitude(coords[key].rawCoord, overlap)
    }
    prev = coords[key];
  });
  return coords;
}