import React from "react";
import { Stage, Layer, Ring, Line, Text, Group } from "react-konva";

import { toRads } from "./utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE, SIGN_COLORS, SIGN_UNICODE } from "./settings";

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
    const signGlyphRadius = 285;
    const signRingInnerRadius = 300;

    // Planetary ring
    const planetRadius = 280;
    const planetDegreeRadius = 240;
    const planetSignRadius = 220;
    const planetMinuteRadious = 200;

    // House ring
    const houseRingOuterRadius = 170;
    const houseRingInnerRadius = 140;
    const houseNumberRadius = 155;

    // House positions
    const CUSPS = {
        "1": props.cusps ? props.cusps["1"] : 0,
        "2": props.cusps ? props.cusps["2"] : 30,
        "3": props.cusps ? props.cusps["3"] : 60,
        "4": props.cusps ? props.cusps["4"] : 90,
        "5": props.cusps ? props.cusps["5"] : 120,
        "6": props.cusps ? props.cusps["6"] : 150,
        "7": props.cusps ? props.cusps["7"] : 180,
        "8": props.cusps ? props.cusps["8"] : 210,
        "9": props.cusps ? props.cusps["9"] : 240,
        "10": props.cusps ? props.cusps["10"] : 270,
        "11": props.cusps ? props.cusps["11"] : 300,
        "12": props.cusps ? props.cusps["12"] : 330
    }



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
            <Line id={cuspId} key={cuspId}
                points={[...point(cuspNum, houseRingInnerRadius, rotationalOffset), ...point(cuspNum, signRingInnerRadius, rotationalOffset)]}
                stroke={'black'}
                strokeWidth={1}
                lineCap={'round'}
                lineJoin={'round'}
            />
        )
    }

    const planet = (planetName, coord) => {
        return (
            <Text id={planetName} key={planetName}
                x={point(coord, planetRadius)[0]}
                y={point(coord, planetRadius)[1]}
                text={PLANET_UNICODE[planetName]}
                fontSize={20}
                stroke={PLANET_COLORS[planetName]}
                strokeWidth={1}
            />
        )
    }

    const houseNumber = (num, coord) => {
        const rotationalOffset = props.rotateCusps ? props.rotationalOffset : 0
        return (
            <Text id={num} key={num}
                x={point(coord, houseNumberRadius, rotationalOffset)[0]}
                y={point(coord, houseNumberRadius, rotationalOffset)[1]}
                text={num}
                fontSize={16}
                strokeWidth={1}
            />
        )
    }

    const avgCoords = (pos1, pos2) => {
        // Adjust coordinates to account for wrapping 360 around to 0.
        const normalizedPos2 = Math.abs(pos1 - pos2) > 180 ? pos2 + 360 : pos2;
        const midpoint = (pos1 + normalizedPos2) / 2;
        return midpoint >= 360 ? midpoint - 360 : midpoint;
    }

    // Object.keys(CUSPS).forEach((el, index) => {
    //     console.log(el);
    //     console.log(CUSPS[index % 11 + 2]);
    //     console.log(CUSPS[index % 11 + 1]);
    //     console.log(avgCoords(CUSPS[index % 11 + 2], CUSPS[index % 11 + 1]));
    // })


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

            </Layer>
            <Layer>
                {Object.keys(CUSPS).map((cusp, index) => (
                    // 1-index and wrap 13 back around to 1, i.e. 2,1; 3,2... 12,11; 1,12.
                    houseNumber(cusp, avgCoords(CUSPS[((index + 1) % 12) + 1], CUSPS[index + 1]))
                ))}
            </Layer>
            <Layer>
                {Object.keys(props.coords).map((coord) => (
                    planet(coord, props.coords[coord.toString()])
                ))}

            </Layer>
        </Stage>
    );
}
