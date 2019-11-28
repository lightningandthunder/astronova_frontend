import Aspect from "../models/Aspect";

export default class AspectManager {

    getAspectsFromCoords(charts, angles, mode) {
        const planetRowVertical = charts[0];

        // Need to clean this up and put into a dedicated function to determine
        // Chart points, for the grid cells as well as their contents.
        planetRowVertical["Asc"] = angles["Asc"];
        planetRowVertical["MC"] = angles["MC"];
        planetRowVertical["Dsc"] = angles["Dsc"];
        planetRowVertical["IC"] = angles["IC"];

        let planetRowHorizontal = null;
        if (charts.length > 1 && angles.length > 1) {
            planetRowHorizontal = charts[1];
            planetRowHorizontal["Asc"] = angles[1]["Asc"];
            planetRowHorizontal["MC"] = angles[1]["MC"];
            planetRowHorizontal["Dsc"] = angles[1]["Dsc"];
            planetRowHorizontal["IC"] = angles[1]["IC"];
        } else {
            planetRowHorizontal = planetRowVertical;
        }
        return this.getAspectList(planetRowHorizontal, planetRowVertical, mode)
    }

    getAspectList(planetRowHorizontal, planetRowVertical, mode) {
        const usedKeys = [];
        const aspectList = [];
        for (let planet1 of Object.keys(planetRowHorizontal)) {
            for (let planet2 of Object.keys(planetRowVertical)) {

                let aspect;

                if (mode === "Uniwheel"
                    && (planet1 === planet2 || usedKeys.indexOf(planet2) >= 0)) {
                    // Don't re-parse aspects in Uniwheels
                    aspect = null;
                } else {
                    aspect = this.parseAspect(
                        planet1,
                        planetRowHorizontal[planet1],
                        planet2,
                        planetRowVertical[planet2]
                    );
                }

                aspectList.push(aspect);
            }

            usedKeys.push(planet1);
        }

        return aspectList;
    }

    getOrb(longitude1, longitude2, lowbound, highbound) {
        const aspectAverage = (lowbound + highbound) / 2;

        const aspect = Math.abs(longitude1 - longitude2);

        // If one longitude is near 360º and the other is near 0º
        const aspect360 = Math.abs(aspect - 360);

        // console.log(`Aspect: ${aspect} aspect360: ${aspect360}`)
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

    parseAspect(pname1, plong1, pname2, plong2) {
        let orb = null;

        // Conjunction
        orb = this.getOrb(plong1, plong2, 0, 10);
        if (orb !== null) {
            // console.log(`${pname1} ${orb} ${pname2}`);
            return new Aspect(pname1, pname2, orb, "Cnj");
        }

        // Opposition
        orb = this.getOrb(plong1, plong2, 170, 190);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 180, "Opp");
        }

        // Square
        orb = this.getOrb(plong1, plong2, 82.5, 97.5);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 90, "Sqr");
        }

        // Trine
        orb = this.getOrb(plong1, plong2, 115, 125);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 120, "Tri");
        }

        // Sextile
        orb = this.getOrb(plong1, plong2, 55, 65);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 60, "Sxt");
        }

        // Semisquare
        orb = this.getOrb(plong1, plong2, 43, 47);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 45, "Sms");
        }


        // Sesquisquare
        orb = this.getOrb(plong1, plong2, 133, 137);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 135, "Ssq");
        }

        return new Aspect(pname1, pname2, null, null);
    }
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/