import React from "react";
import { Stage, Layer, Ring, Line, Text, Group } from "react-konva";

import { toRads, parseSign, avgCoords } from "./utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE } from "./settings";

export default function UniwheelChart(props) {
    if (!props.coords) {
        throw new Error("No coordinates given!");
    }

    // Establish center of the ring
    const originX = props.width / 4;
    const originY = props.height / 2;

    /* ==== Set ring radii ==== */
    // Signs
    const signRingOuterRadius = 330;
    const cuspSignRadius = 315;
    const signRingInnerRadius = 300;

    // Planetary ring
    const planetRadius = 280;
    const planetDegreeRadius = 260;
    const planetSignRadius = 235;
    const planetMinuteRadius = 210;

    // House ring
    const houseRingOuterRadius = 170;
    const houseRingInnerRadius = 140;
    const houseNumberRadius = 155;

    // House positions
    const CUSPS = props.cusps ? props.cusps : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
        key => ((key - 1) * 30)
    )

    // Calculate any point on the circle with an angle ("position") and circle radius
    const point = (pos, radius, rotationalOffset = props.rotationalOffset) => {
        const angleRotated = pos - rotationalOffset;
        const angleNormalized = angleRotated >= 0 ? toRads(angleRotated) : toRads(angleRotated + 360);

        // Mirror across Y axis; 0 begins at left side for us, not right side.
        const x = originX + (-1 * radius * Math.cos(angleNormalized));
        const y = originY + (radius * Math.sin(angleNormalized));

        return [x, y];
    }

    /* ================= Chart points ================= */

    const cuspLine = (cuspNum, cuspId) => {
        const rotationalOffset = props.rotateCusps ? props.rotationalOffset : 0
        return (
            <Line key={cuspId}
                points={[...point(cuspNum, houseRingInnerRadius, rotationalOffset), ...point(cuspNum, signRingInnerRadius, rotationalOffset)]}
                stroke={'black'}
                strokeWidth={1}
                lineCap={'round'}
                lineJoin={'round'}
            />
        )
    }

    const planet = (planetName, coord) => {
        const [x, y] = point(coord, planetRadius)
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

    const houseNumber = (num, coord) => {
        const rotationalOffset = props.rotateCusps ? props.rotationalOffset : 0
        const [x, y] = point(coord, houseNumberRadius, rotationalOffset)
        return (
            <Text key={num}
                x={x}
                y={y}
                text={num}
                fontSize={16}
                strokeWidth={1}
                align={"center"}
                verticalAlign={"middle"}
                offsetX={8}
                offsetY={8}
            />
        )
    }

    const planetDegrees = (coord) => {
        const [x, y] = point(coord, planetDegreeRadius);
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
        const [x, y] = point(coord, planetSignRadius);
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
        const [x, y] = point(coord, planetMinuteRadius);
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

    const cuspSign = (coord) => {
        const sign = parseSign(coord);
        const [x, y] = point(coord, cuspSignRadius);
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

    const cuspDegrees = (coord) => {
        const adjustedCoordPos = Math.trunc(coord - 4);
        const [x, y] = point(adjustedCoordPos, cuspSignRadius);
        return (
            <Text
                x={x}
                y={y}
                text={`${Math.trunc(coord % 30)}\u00B0`}
                fontSize={14}
                strokeWidth={1}
                align={"center"}
                verticalAlign={"middle"}
                offsetX={8}
                offsetY={8}
            />
        )
    }

    const cuspMins = (coord) => {
        const adjustedCoordPos = Math.trunc(coord + 5);

        const mins = coord - Math.trunc(coord);
        const minsAsInt = Math.trunc(((mins).toFixed(2)) * 100);
        const [x, y] = point(adjustedCoordPos, cuspSignRadius);
        return (
            <Text
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
        <Stage width={props.width} height={props.height}>
            <Layer>
                <Ring id="signRing"
                    x={originX}
                    y={originY}
                    outerRadius={signRingOuterRadius}
                    innerRadius={signRingInnerRadius}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={1}
                />
                <Ring id="houseRing"
                    x={originX}
                    y={originY}
                    outerRadius={houseRingOuterRadius}
                    innerRadius={houseRingInnerRadius}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={1}
                />
            </Layer>
            <Layer>
                {Object.keys(CUSPS).map((cusp) => (
                    cuspLine(CUSPS[cusp], cusp)
                ))}
                {Object.keys(CUSPS).map((cusp, index) => (
                    // 1-index and wrap 13 back around to 1, i.e. 2,1; 3,2... 12,11; 1,12.
                    houseNumber(index + 1, avgCoords(CUSPS[((index + 1) % 12) + 1], CUSPS[index + 1]))
                ))}
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
                {Object.keys(CUSPS).map((cusp) => (
                    cuspSign(props.coords[cusp])
                ))}
                {Object.keys(CUSPS).map((cusp, index) => (
                    cuspSign(CUSPS[index + 1])
                ))}
                {Object.keys(CUSPS).map((cusp, index) => (
                    cuspDegrees(CUSPS[index + 1])
                ))}
                {Object.keys(CUSPS).map((cusp, index) => (
                    cuspMins(CUSPS[index + 1])
                ))}
            </Layer>
        </Stage>
    );
}
