export default class SolunarQuery {
  constructor(radix, solunarParams) {
    this.radix = radix;                 // Instance of ChartData
    this.return_params = {
      return_planet: solunarParams.return_planet,
      return_harmonic: solunarParams.return_harmonic,
      return_longitude: solunarParams.return_longitude,
      return_latitude: solunarParams.return_latitude,
      return_start_date: solunarParams.return_start_date,
      tz: solunarParams.tz,
      return_quantity: solunarParams.return_quantity,
    }
  }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/