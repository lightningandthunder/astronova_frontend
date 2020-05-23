import React from "react";
import { Text, Group } from "react-konva";
import { derivePoint, parseSign, degToMin } from "../../utils/geometry";
import { SIGN_UNICODE, SIGN_COLORS } from "../../settings";

export default function CuspCoords(props) {
    const cuspSign = (cusp, coord) => {
        const house = Math.trunc(coord / 30) + 1;
        const sign = props.zodiacal ? parseSign(coord) : house;
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <Text
                x={x}
                y={y}
                key={`${cusp}-Sign`}
                text={props.zodiacal ? SIGN_UNICODE[sign] : house}
                stroke={props.zodiacal ? SIGN_COLORS[sign] : "black"}
                strokeWidth={1}
                fontFamily={props.zodiacal ? "AstroDotBasic" : "Arial"}
                fontSize={props.zodiacal ? props.scale.planetFontSize : props.scale.planetDegreeFontSize}
                offsetX={props.scale.cuspSignOffsetX}
                offsetY={props.scale.cuspSignOffsetY}
            />
        )
    }

    const cuspDegrees = (cusp, coord) => {
        // Cusps 7-12 need to have degrees and minutes in opposite places for readability
        const offset = cusp <= 6
            ? props.scale.cuspDegreesRotationalOffset
            : props.scale.cuspMinutesRotationalOffset
        const adjustedCoordPos = Math.trunc(coord + offset);
        const [x, y] = derivePoint(props.scale.origin, adjustedCoordPos, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${cusp}-Degrees`}
                x={x}
                y={y}
                text={`${Math.trunc(coord % 30)}\u00B0`}
                fontSize={props.scale.cuspDegreesFontSize}
                strokeWidth={1}
                offsetX={props.scale.cuspDegreesOffsetX}
                offsetY={props.scale.cuspDegreesOffsetY}
            />
        )
    }

    const cuspMins = (cusp, coord) => {
        // Cusps 7-12 need to have degrees and minutes in opposite places for readability
        const offset = cusp <= 6
            ? props.scale.cuspMinutesRotationalOffset
            : props.scale.cuspDegreesRotationalOffset
        const adjustedCoordPos = Math.trunc(coord + offset);
        const mins = degToMin(coord);
        const [x, y] = derivePoint(props.scale.origin, adjustedCoordPos, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${cusp}-Minutes`}
                x={x}
                y={y}
                text={`${mins}'`}
                fontSize={props.scale.cuspMinsFontSize}
                strokeWidth={1}
                offsetX={props.scale.cuspMinsOffsetX}
                offsetY={props.scale.cuspMinsOffsetY}
            />
        )
    }

    return (
        <Group>
            {Object.keys(props.cusps).map((cusp, index) => (
                [cuspSign(cusp, props.cusps[index + 1]),
                cuspDegrees(cusp, props.cusps[index + 1]),
                cuspMins(cusp, props.cusps[index + 1])]
            ))}
        </Group>
    )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/