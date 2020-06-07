export default class RelocationQuery {
  constructor(radix, location, solunar = undefined) {
    this.longitude = location.longitude;
    this.latitude = location.latitude;
    this.tz = location.tz;
    this.placeName = location.placeName;
    this.radix = radix;
    this.solunar = solunar;
  }

  static fromWheel(wheel) {
    if (wheel.solunar) {
      return new RelocationQuery(
        wheel.radix,
        {
          longitude: wheel.solunar.longitude,
          latitude: wheel.solunar.latitude,
          tz: wheel.solunar.tz,
          placeName: wheel.solunar.placeName,
        },
        wheel.solunar,
      );

    } else {
      return new RelocationQuery(wheel, {
        longitude: wheel.longitude,
        latitude: wheel.latitude,
        tz: wheel.tz,
        placeName: wheel.placeName,
      });
    }
  }

  setLocation(location) {
    this.longitude = location.longitude;
    this.latitude = location.latitude;
    this.tz = location.tz;
    this.placeName = location.placeName;

    return this;
  }
}