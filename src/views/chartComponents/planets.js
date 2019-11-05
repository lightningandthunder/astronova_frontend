import React from "react";
import { Text, Group } from "react-konva";

import { derivePoint, parseSign } from "../../utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE } from "../../settings";

export default function Planets(props) {
    const planet = (planetName, coord) => {
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.planetRadius, props.rotationalOffset)
        return (
            <Text key={planetName}
                x={x}
                y={y}
                text={PLANET_UNICODE[planetName]}
                fontSize={props.scale.planetFontSize}
                stroke={PLANET_COLORS[planetName]}
                strokeWidth={1}
                offsetX={props.scale.planetOffsetX}
                offsetY={props.scale.planetOffsetY}
            />
        )
    }

    const planetDegrees = (coord) => {
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.planetDegreeRadius, props.rotationalOffset);
        return (
            <Text key={`PlanetDegrees-${coord}`}
                x={x}
                y={y}
                text={`${Math.trunc(coord) % 30}\u00B0`}
                fontSize={props.scale.planetDegreesFontSize}
                strokeWidth={1}
                offsetX={props.scale.planetDegreesOffsetX}
                offsetY={props.scale.planetDegreesOffsetY}
            />
        )
    }

    const planetSign = (coord) => {
        const sign = parseSign(coord);
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.planetSignRadius, props.rotationalOffset);
        return (
            <Text key={`PlanetSign-${coord}`}
                x={x}
                y={y}
                text={sign}
                fontSize={props.scale.planetSignFontSize}
                strokeWidth={1}
                offsetX={props.scale.planetSignOffsetX}
                offsetY={props.scale.planetSignOffsetY}
            />
        )
    }

    const planetMinutes = (coord) => {
        const mins = coord - Math.trunc(coord);
        const minsAsInt = Math.trunc(((mins).toFixed(2)) * 100);
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.planetMinuteRadius, props.rotationalOffset);
        return (
            <Text key={`PlanetMinutes-${coord}`}
                x={x}
                y={y}
                text={`${minsAsInt}'`}
                fontSize={props.scale.planetMinutesFontSize}
                strokeWidth={1}
                offsetX={props.scale.planetMinutesOffsetX}
                offsetY={props.scale.planetMinutesOffsetY}
            />
        )
    }
    return (
        <Group>
            {Object.keys(props.coords).map((coord) => (
                [planet(coord, props.coords[coord]),
                planetDegrees(props.coords[coord]),
                planetSign(props.coords[coord]),
                planetMinutes(props.coords[coord])]
            ))}
        </Group>
    )
}