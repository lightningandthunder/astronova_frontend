import { getOrb, getAdjustedLongitude, greater, less } from "../utils/geometry";

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
    this._minAngle = (500 - radius) * 0.022;
    this._smoothDisplayCoords(radius);
  }

  get chartPoints() {
    return this.planets.concat(this.cusps);
  }

  get planets() {
    return Object.keys(this)
      .filter(key => !parseInt(key) && key !== "_minAngle")
      .map(key => this[key]);
  }

  get cusps() {
    return Object.keys(this)
      .filter(key => parseInt(key))
      .map(key => this[key]);
  }

  /* 
  ** Private 
  */

  _isPrimaryCusp(name) {
    return this._isCusp(name) && ["1", "4", "7", "10"].indexOf(name) >= 0;
  }

  _isCusp(name) {
    return !!parseInt(name)
  }

  _smoothDisplayCoords() {
    const sorted = this._mergeSortCoordinates(this.chartPoints);
    // Rearrange so that 1st cusp begins array
    while (sorted[0].name !== "1") {
      sorted.push(sorted.shift());
    }
    sorted[sorted.length] = sorted[0];  // Artificially connect array back to itself

    const arr = [];
    let lowerBound = null;
    let upperBound = null;

    for (let el of sorted) {
      // First element is 1st cusp
      if (!lowerBound) {
        lowerBound = el;
        continue;
      }

      if (!this._isCusp(el.name)) {
        arr.push(el);
        continue;
      }

      if (this._isPrimaryCusp(el.name)) {
        // Iterate through sub-array in order, smoothing it out
        upperBound = el;
        let prev = lowerBound;
        for (let e of arr) {
          this._adjust(prev, e);
          prev = e;
        }
        // Iterate back in reverse order
        let cloneArray = [...arr].reverse();
        prev = upperBound;
        for (let element of cloneArray) {
          // stop if we're back at the lower bound again
          if (getOrb(element.display, lowerBound.display, 0, this._minAngle)) {
            break;
          }
          this._adjust(prev, element, { invert: true });
          prev = element;
        }
        // reset array
        arr.length = 0;
        lowerBound = upperBound;
      }
    }  // for loop over sorted array

    return sorted;
  }

  _adjust(prev, el, params={}) {
    const invert = params.invert;

    // Edge planets closer to cusps than to other planets
    const minimum = this._isCusp(prev.name) ? this._minAngle / 1.5 : this._minAngle;
    const overlapOrb = getOrb(prev.display, el.display, 0, minimum);
    let adjustmentAngle;

    // Check to see if leftmost element was pushed so far it's on the right
    if (!invert && less(prev.raw, el.raw) && greater(prev.display, el.display))
      adjustmentAngle = prev.display - el.display + minimum;

    // Or vice-versa
    else if (invert && greater(prev.raw, el.raw) && less(prev.display, el.display))
      adjustmentAngle = el.display - prev.display + minimum;

    else
      adjustmentAngle = overlapOrb ? minimum - overlapOrb : null;

    // If iterating backwards, adjustment angle needs to be negative
    if (adjustmentAngle && invert)
      adjustmentAngle *= -1;

    if (adjustmentAngle) {
      let adjusted = getAdjustedLongitude(el.display, adjustmentAngle);
      el.display = adjusted;
      this[el.name].display = adjusted;
    }
  }

  _mergeSortCoordinates(coords) {
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

    return this._merge(this._mergeSortCoordinates(left), this._mergeSortCoordinates(right));
  }

  _merge(left, right) {
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