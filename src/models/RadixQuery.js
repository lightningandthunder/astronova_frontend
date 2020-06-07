export default class RadixQuery {
  // Represents the JSON that the backend expects as input for single chart calculation.
  constructor(local_dt, location) {
    this.local_datetime = local_dt;
    this.longitude = location.longitude;
    this.latitude = location.latitude;
    this.tz = location.tz;
  }

  static fromUniwheel(uniwheel) {
    return new RadixQuery(uniwheel.local_datetime, {
      longitude: uniwheel.longitude,
      latitude: uniwheel.latitude,
      tz: uniwheel.tz,
    });
  }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/
