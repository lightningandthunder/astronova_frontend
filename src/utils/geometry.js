import { SIGNS, SIGN_UNICODE } from "../settings";

export function toRads(deg) {
    return deg * (Math.PI / 180);
}

export function avgCoords(pos1, pos2) {
    // Unwrap 0 back around to 360 for easier math
    const normalizedPos2 = Math.abs(pos1 - pos2) > 180 ? pos2 + 360 : pos2;

    const midpoint = (pos1 + normalizedPos2) / 2;

    // Wrap 360 back around to 0
    return midpoint >= 360 ? midpoint - 360 : midpoint;
}

export function parseSign(coord) {
    return SIGN_UNICODE[SIGNS[Math.trunc(coord / 30)]];
}