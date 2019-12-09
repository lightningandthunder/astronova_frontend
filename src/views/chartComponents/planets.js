import React from "react";
import { Text, Group } from "react-konva";

import { derivePoint, parseSign, degToMin, getRenderCoords } from "../../utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE, SIGN_COLORS, SIGN_UNICODE } from "../../settings";
import PlanetCoords from "../../models/PlanetCoords";

export default function Planets(props) {
    const adjustedCoords = getRenderCoords(
        new PlanetCoords(props.coords),
        props.scale.planetMinuteRadius
    );

    const planetSymbol = (planetInfo) => {
        const [x, y] = derivePoint(props.scale.origin,
            planetInfo.renderCoord,
            props.scale.planetRadius,
            props.rotationalOffset);
        return (
            <Text key={`${planetInfo.name}-${props.ringLayer}-Symbol`}
                x={x}
                y={y}
                text={PLANET_UNICODE[planetInfo.name]}
                fontSize={
                    planetInfo.name === "EP" || planetInfo.name === "WP"
                        ? props.scale.epWPFontSize
                        : props.scale.planetFontSize
                }
                stroke={PLANET_COLORS[planetInfo.name]}
                strokeWidth={1}
                offsetX={props.scale.planetOffsetX}
                offsetY={props.scale.planetOffsetY}
            />
        )
    }

    const planetDegrees = (planetInfo) => {
        const [x, y] = derivePoint(props.scale.origin,
            planetInfo.renderCoord,
            props.scale.planetDegreeRadius,
            props.rotationalOffset);
        return (
            <Text key={`${planetInfo.name}-${props.ringLayer}-Degrees`}
                x={x}
                y={y}
                text={`${Math.trunc(planetInfo.rawCoord) % 30}\u00B0`}
                fontSize={props.scale.planetDegreesFontSize}
                strokeWidth={1}
                offsetX={props.scale.planetDegreesOffsetX}
                offsetY={props.scale.planetDegreesOffsetY}
            />
        )
    }

    const planetSign = (planetInfo) => {
        const house = Math.trunc(planetInfo.rawCoord / 30) + 1;
        const sign = props.zodiacal
            ? parseSign(planetInfo.rawCoord)
            : house;

        const [x, y] = derivePoint(props.scale.origin,
            planetInfo.renderCoord,
            props.scale.planetSignRadius,
            props.rotationalOffset);
        return (
            <Text
                x={x}
                y={y}
                key={`${planetInfo.name}-${props.ringLayer}-Sign`}
                text={props.zodiacal ? SIGN_UNICODE[sign] : house}
                stroke={props.zodiacal ? SIGN_COLORS[sign] : "black"}
                strokeWidth={1}
                fontFamily={props.zodiacal ? "AstroDotBasic" : "Arial"}
                fontSize={props.zodiacal ? props.scale.planetFontSize : props.scale.planetDegreeFontSize}
                offsetX={props.scale.planetSignOffsetX}
                offsetY={props.scale.planetSignOffsetY}
            />
        )
    }


    const planetMinutes = (planetInfo) => {
        const mins = degToMin(planetInfo.rawCoord)
        const [x, y] = derivePoint(props.scale.origin,
            planetInfo.renderCoord,
            props.scale.planetMinuteRadius,
            props.rotationalOffset);
        return (
            <Text key={`${planetInfo.name}-${props.ringLayer}-Minutes`}
                x={x}
                y={y}
                text={`${mins}'`}
                fontSize={props.scale.planetMinutesFontSize}
                strokeWidth={1}
                offsetX={props.scale.planetMinutesOffsetX}
                offsetY={props.scale.planetMinutesOffsetY}
            />
        )
    }

    const planetAndCoords = (planetInfo) => {
        return (
            <Group key={planetInfo.name}>
                {planetSymbol(planetInfo)}
                {planetDegrees(planetInfo)}
                {planetSign(planetInfo)}
                {planetMinutes(planetInfo)}
            </Group>
        )
    }
    return (
        <Group>
            {Object.keys(adjustedCoords).map((planet) => (
                planetAndCoords(adjustedCoords[planet])
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