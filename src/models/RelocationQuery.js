export default class RelocationQuery {
  constructor(radix, location, solunar = undefined) {
    this.location = location;
    this.radix = radix;
    this.solunar = solunar;
  }

  static fromWheel(wheel) {
    if (wheel.solunar) {
      return new RelocationQuery(
        wheel.radix,
        wheel.placeName,
        wheel.solunar,
      );
    } else {
      return new RelocationQuery(wheel, wheel.placeName);
    }
  }

  setLocation(location) {
    this.location = location

    return this;
  }
}