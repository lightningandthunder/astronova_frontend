export default class UserConfig {
    constructor() {
        this.showChartMetaData = false;
        this.chartPointsEcliptical = [
            "Sun",
            "Moon",
            "Mercury",
            "Venus",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
            "Neptune",
            "Pluto",
            "EP",
            "Asc",
            "MC"
        ];
        this.chartPointsMundane = [
            "Sun",
            "Moon",
            "Mercury",
            "Venus",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
            "Neptune",
            "Pluto",
            "Asc",
            "MC"
        ];
        this.chartPointsRightAscension = [
            "Sun",
            "Moon",
            "Mercury",
            "Venus",
            "Mars",
            "Jupiter",
            "Saturn",
            "Uranus",
            "Neptune",
            "Pluto",
            "EP"
        ];
        this.orbs = {
            Cnj: 10,
            Opp: 10,
            Sqr: 7.5,
            Sms: 2,
            Sqq: 2,
            Tri: 6,
            Sxt: 6
        }
    }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/