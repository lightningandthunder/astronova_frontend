export default class PlanetCoords {
    constructor(coords) {
        Object.keys(coords).forEach(key => {
            this[key] = {
                name: key,
                rawCoord: coords[key],
                renderCoord: coords[key]
            };
        })
    }
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/