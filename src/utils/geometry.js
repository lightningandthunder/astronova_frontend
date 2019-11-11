import { SIGNS, SIGN_UNICODE } from "../settings";

export function toRads(deg) {
    return deg * (Math.PI / 180);
}

export function degToMin(deg) {
    return Math.trunc((deg - Math.trunc(deg)) * 60);
}

export function fixOverlap(coords) {
    const fixedAnglePlacement = 10;
    let adjustedAngles = Object.assign(coords);

    let previousKey = null;
    Object.keys(coords).forEach((key) => {
        let first = coords[key].renderCoord;
        if (!previousKey) {
            previousKey = key;
            return;
        }

        let second = coords[previousKey].renderCoord;
        let diff = Math.abs(first - second);
        if (diff < fixedAnglePlacement || diff > 360 - fixedAnglePlacement) {
            console.log(`Found diff ${diff}; Making adjustment between ${key} and ${previousKey}`)
            adjustedAngles[key].renderCoord += (fixedAnglePlacement - diff);
        }
        previousKey = key;
    });
    return adjustedAngles;
}

export function avgCoords(pos1, pos2) {
    // Unwrap 0 back around to 360 for easier math
    const normalizedPos2 = Math.abs(pos1 - pos2) > 180 ? pos2 + 360 : pos2;

    const midpoint = (pos1 + normalizedPos2) / 2;

    // Wrap 360 back around to 0
    return midpoint >= 360 ? midpoint - 360 : midpoint;
}

// Calculate any point on the circle with an angle ("position") and circle radius
export function derivePoint(origin, pos, radius, rotationalOffset = 0) {
    const angleRotated = pos - rotationalOffset;
    const angleNormalized = angleRotated >= 0 ? toRads(angleRotated) : toRads(angleRotated + 360);

    // Mirror across Y axis; 0 begins at left side for us, not right side.
    const x = origin.x + (-1 * radius * Math.cos(angleNormalized));
    const y = origin.y + (radius * Math.sin(angleNormalized));

    return [x, y];
}

export function parseSign(coord) {
    return SIGNS[Math.trunc(coord / 30)];
}

export function parseAspect(longitude1, longitude2) {
    throw new Error("Not implemented yet!");
}
