import React from "react";
import { Text, Group } from "react-konva";

import { point, parseSign } from "../../utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE } from "../../settings";


export default function Planets(props) {

    const planetRadius = 280;
    const planetDegreeRadius = 260;
    const planetSignRadius = 235;
    const planetMinuteRadius = 210;

    /* ================= Chart points ================= */

    const planet = (planetName, coord) => {
        const [x, y] = point(props.origin, coord, planetRadius, props.rotationalOffset)
        return (
            <Text key={planetName}
                x={x}
                y={y}
                text={PLANET_UNICODE[planetName]}
                align={"center"}
                fontSize={22}
                stroke={PLANET_COLORS[planetName]}
                strokeWidth={1}
                offsetX={8}
                offsetY={8}
            />
        )
    }



    const planetDegrees = (coord) => {
        const [x, y] = point(props.origin, coord, planetDegreeRadius, props.rotationalOffset);
        return (
            <Text key={coord}
                x={x}
                y={y}
                text={`${Math.trunc(coord) % 30}\u00B0`}
                fontSize={14}
                strokeWidth={1}
                align={"center"}
                verticalAlign={"middle"}
                offsetX={8}
                offsetY={8}
            />
        )
    }

    const planetSign = (coord) => {
        const sign = parseSign(coord);
        const [x, y] = point(props.origin, coord, planetSignRadius, props.rotationalOffset);
        return (
            <Text key={coord}
                x={x}
                y={y}
                text={sign}
                fontSize={14}
                strokeWidth={1}
                align={"center"}
                verticalAlign={"middle"}
                offsetX={8}
                offsetY={8}
            />
        )
    }

    const planetMinutes = (coord) => {
        const mins = coord - Math.trunc(coord);
        const minsAsInt = Math.trunc(((mins).toFixed(2)) * 100);
        const [x, y] = point(props.origin, coord, planetMinuteRadius, props.rotationalOffset);
        return (
            <Text key={coord}
                x={x}
                y={y}
                text={`${minsAsInt}'`}
                fontSize={14}
                strokeWidth={1}
                align={"center"}
                verticalAlign={"middle"}
                offsetX={8}
                offsetY={8}
            />
        )
    }
    return (
        <Group>
            {Object.keys(props.coords).map((coord) => (
                planet(coord, props.coords[coord.toString()])
            ))}
            {Object.keys(props.coords).map((planet) => (
                planetDegrees(props.coords[planet])
            ))}
            {Object.keys(props.coords).map((planet) => (
                planetSign(props.coords[planet])
            ))}
            {Object.keys(props.coords).map((planet) => (
                planetMinutes(props.coords[planet])
            ))}
        </Group>
    )
}