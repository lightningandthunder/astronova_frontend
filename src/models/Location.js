export default class Location {
  constructor(data) {
    this.longitude = data.lon;
    this.latitude = data.lat;
    this.tz = data.tz;

    const _state = data.address.country_code === "us"
      ? data.address.state
      : data.address.country;

    this.placeName = `${data.address.city}, ${_state}`;
  }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/