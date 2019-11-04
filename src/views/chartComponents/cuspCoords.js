import React from "react";
import { Text, Group } from "react-konva";
import { point, parseSign } from "../../utils/geometry";

export default function CuspCoords(props) {
    const cuspSignRadius = 315 * props.scaleFactor;

    const cuspSign = (coord) => {
        const sign = parseSign(coord);
        const [x, y] = point(props.origin, coord, cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${sign}-${coord}`}
                x={x}
                y={y}
                text={sign}
                fontSize={14 * props.scaleFactor}
                strokeWidth={1}
                offsetX={8 * props.scaleFactor}
                offsetY={8 * props.scaleFactor}
            />
        )
    }

    const cuspDegrees = (coord) => {
        const adjustedCoordPos = Math.trunc(coord - 4);
        const [x, y] = point(props.origin, adjustedCoordPos, cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${coord}-${adjustedCoordPos}`}
                x={x}
                y={y}
                text={`${Math.trunc(coord % 30)}\u00B0`}
                fontSize={14 * props.scaleFactor}
                strokeWidth={1}
                offsetX={8 * props.scaleFactor}
                offsetY={8 * props.scaleFactor}
            />
        )
    }

    const cuspMins = (coord) => {
        const adjustedCoordPos = Math.trunc(coord + 5);

        const mins = coord - Math.trunc(coord);
        const minsAsInt = Math.trunc(((mins).toFixed(2)) * 100);
        const [x, y] = point(props.origin, adjustedCoordPos, cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${coord}-${minsAsInt}`}
                x={x}
                y={y}
                text={`${minsAsInt}'`}
                fontSize={14 * props.scaleFactor}
                strokeWidth={1}
                offsetX={8 * props.scaleFactor}
                offsetY={8 * props.scaleFactor}
            />
        )
    }

    return (
        <Group>
            {Object.keys(props.cusps).map((cusp, index) => (
                [cuspSign(props.cusps[index + 1]),
                cuspDegrees(props.cusps[index + 1]),
                cuspMins(props.cusps[index + 1])]
            ))}
        </Group>
    )
}