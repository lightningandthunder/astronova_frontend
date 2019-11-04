import React from "react";
import { Text, Line, Group } from "react-konva";
import { point, avgCoords, parseSign } from "../../utils/geometry";

export default function Houses(props) {

    // House positions
    const CUSPS = props.cusps ? props.cusps : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
        key => ((key - 1) * 30)
    );

    // Signs
    const cuspSignRadius = 315;
    const signRingInnerRadius = 300;

    // House ring
    const houseRingInnerRadius = 140;
    const houseNumberRadius = 155;


    const cuspSign = (coord) => {
        const sign = parseSign(coord);
        const [x, y] = point(props.origin, coord, cuspSignRadius);
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
        const [x, y] = point(props.origin, adjustedCoordPos, cuspSignRadius);
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
        const [x, y] = point(props.origin, adjustedCoordPos, cuspSignRadius);
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

    const houseNumber = (num, coord) => {
        const rotationalOffset = props.rotateCusps ? props.rotationalOffset : 0
        const [x, y] = point(props.origin, coord, houseNumberRadius, rotationalOffset)
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

    const cuspLine = (pos, cuspId) => {
        const rotationalOffset = props.rotateCusps ? props.rotationalOffset : 0
        return (
            <Line key={cuspId}
                points={[...point(props.origin, pos, houseRingInnerRadius, rotationalOffset), ...point(props.origin, pos, signRingInnerRadius, rotationalOffset)]}
                stroke={'black'}
                strokeWidth={1}
                lineCap={'round'}
                lineJoin={'round'}
            />
        )
    }

    return (
        <Group>
            {Object.keys(CUSPS).map((cusp) => (
                cuspLine(CUSPS[cusp], cusp)
            ))} 
            {Object.keys(CUSPS).map((cusp, index) => (
                // 1-index and wrap 13 back around to 1, i.e. 2,1; 3,2... 12,11; 1,12.
                houseNumber(index + 1, avgCoords(CUSPS[((index + 1) % 12) + 1], CUSPS[index + 1]))
            ))}
            {Object.keys(CUSPS).map((cusp, index) => (
                cuspSign(CUSPS[index + 1])
            ))}
            { Object.keys(CUSPS).map((cusp, index) => (
                cuspDegrees(CUSPS[index + 1])
            ))} 
            {Object.keys(CUSPS).map((cusp, index) => (
                cuspMins(CUSPS[index + 1])
            ))}
        </Group>
    )
}