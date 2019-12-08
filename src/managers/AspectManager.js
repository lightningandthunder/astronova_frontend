import Aspect from "../models/Aspect";
import UserConfigManager from "./UserConfigManager";

export default class AspectManager {
    constructor(configManager=null) {
        this.manager = configManager ? configManager : new UserConfigManager();
    }
    getAspectsFromCoords(charts, angles, mode) {
        const planetRowVertical = charts[0];

        // Need to clean this up and put into a dedicated function to determine
        // Chart points, for the grid cells as well as their contents.
        planetRowVertical["Asc"] = angles["Asc"];
        planetRowVertical["MC"] = angles["MC"];

        let planetRowHorizontal = null;
        if (charts.length > 1 && angles.length > 1) {
            planetRowHorizontal = charts[1];
            planetRowHorizontal["Asc"] = angles[1]["Asc"];
            planetRowHorizontal["MC"] = angles[1]["MC"];
        } else {
            planetRowHorizontal = planetRowVertical;
        }
        return this.getAspectList(planetRowHorizontal, planetRowVertical, mode)
    }

    // Todo: pass in an array or something for coords, so that 
    // uniwheels don't need to pass the same coordinate set in twice.
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
        const cnjOrb = this.manager.getOrb("Cnj");
        orb = this.getOrb(plong1, plong2, 0, cnjOrb);
        if (orb !== null) {
            // console.log(`${pname1} ${orb} ${pname2}`);
            return new Aspect(pname1, pname2, orb, "Cnj");
        }

        // Opposition
        const oppOrb = this.manager.getOrb("Opp");
        orb = this.getOrb(plong1, plong2, 180 - oppOrb, 180 + oppOrb);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 180, "Opp");
        }

        // Square
        const sqrOrb = this.manager.getOrb("Sqr");
        orb = this.getOrb(plong1, plong2, 90 - sqrOrb, 90 + sqrOrb);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 90, "Sqr");
        }

        // Trine
        const triOrb = this.manager.getOrb("Tri");
        orb = this.getOrb(plong1, plong2, 120 - triOrb, 120 + triOrb);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 120, "Tri");
        }

        // Sextile
        const sxtOrb = this.manager.getOrb("Sxt");
        orb = this.getOrb(plong1, plong2, 60 - sxtOrb, 60 + sxtOrb);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 60, "Sxt");
        }

        // Semisquare
        const smsOrb = this.manager.getOrb("Sms");
        orb = this.getOrb(plong1, plong2, 45 - smsOrb, 45 + smsOrb);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 45, "Sms");
        }

        // Sesquisquare
        const sqqOrb = this.manager.getOrb("Sqq");
        orb = this.getOrb(plong1, plong2, 135 - sqqOrb, 135 + sqqOrb);
        if (orb !== null) {
            return new Aspect(pname1, pname2, orb % 135, "Sqq");
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