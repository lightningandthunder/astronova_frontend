import Aspect from "../models/Aspect";

export default class AspectManager {
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
        if (pname1 === pname2)
            return null;

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

        return null;
    }
}