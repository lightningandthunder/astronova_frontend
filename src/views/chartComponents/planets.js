import React from "react";
import { Text, Group } from "react-konva";

import { point, parseSign } from "../../utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE } from "../../settings";


export default function Planets(props) {

    const planetRadius = 280 * props.scaleFactor;
    const planetDegreeRadius = 260 * props.scaleFactor;
    const planetSignRadius = 235 * props.scaleFactor;
    const planetMinuteRadius = 210 * props.scaleFactor;

    const planet = (planetName, coord) => {
        const [x, y] = point(props.origin, coord, planetRadius, props.rotationalOffset)
        return (
            <Text key={planetName}
                x={x}
                y={y}
                text={PLANET_UNICODE[planetName]}
                align={"center"}
                fontSize={22 * props.scaleFactor}
                stroke={PLANET_COLORS[planetName]}
                strokeWidth={1}
                offsetX={8 * props.scaleFactor}
                offsetY={8 * props.scaleFactor}
            />
        )
    }



    const planetDegrees = (coord) => {
        const [x, y] = point(props.origin, coord, planetDegreeRadius, props.rotationalOffset);
        return (
            <Text key={`PlanetDegrees-${coord}`}
                x={x}
                y={y}
                text={`${Math.trunc(coord) % 30}\u00B0`}
                fontSize={14 * props.scaleFactor}
                strokeWidth={1}
                align={"center"}
                verticalAlign={"middle"}
                offsetX={8 * props.scaleFactor}
                offsetY={8 * props.scaleFactor}
            />
        )
    }

    const planetSign = (coord) => {
        const sign = parseSign(coord);
        const [x, y] = point(props.origin, coord, planetSignRadius, props.rotationalOffset);
        return (
            <Text key={`PlanetSign-${coord}`}
                x={x}
                y={y}
                text={sign}
                fontSize={14 * props.scaleFactor}
                strokeWidth={1}
                align={"center"}
                verticalAlign={"middle"}
                offsetX={8 * props.scaleFactor}
                offsetY={8 * props.scaleFactor}
            />
        )
    }

    const planetMinutes = (coord) => {
        const mins = coord - Math.trunc(coord);
        const minsAsInt = Math.trunc(((mins).toFixed(2)) * 100);
        const [x, y] = point(props.origin, coord, planetMinuteRadius, props.rotationalOffset);
        return (
            <Text key={`PlanetMinutes-${coord}`}
                x={x}
                y={y}
                text={`${minsAsInt}'`}
                fontSize={14 * props.scaleFactor}
                strokeWidth={1}
                align={"center"}
                verticalAlign={"middle"}
                offsetX={8 * props.scaleFactor}
                offsetY={8 * props.scaleFactor}
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