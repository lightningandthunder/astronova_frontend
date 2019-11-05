import React from "react";
import { Text, Group } from "react-konva";
import { derivePoint, parseSign } from "../../utils/geometry";

export default function CuspCoords(props) {
    const cuspSign = (coord) => {
        const sign = parseSign(coord);
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${sign}-${coord}`}
                x={x}
                y={y}
                text={sign}
                fontSize={props.scale.cuspSignFontSize}
                strokeWidth={1}
                offsetX={props.scale.cuspSignOffsetX}
                offsetY={props.scale.cuspSignOffsetY}
            />
        )
    }

    const cuspDegrees = (coord) => {
        const adjustedCoordPos = Math.trunc(coord + props.scale.cuspDegreesRotationalOffset);
        const [x, y] = derivePoint(props.scale.origin, adjustedCoordPos, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${coord}-${adjustedCoordPos}`}
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

    const cuspMins = (coord) => {
        const adjustedCoordPos = Math.trunc(coord + props.scale.cuspMinutesRotationalOffset);

        const mins = coord - Math.trunc(coord);
        const minsAsInt = Math.trunc(((mins).toFixed(2)) * 100);
        const [x, y] = derivePoint(props.scale.origin, adjustedCoordPos, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${coord}-${minsAsInt}`}
                x={x}
                y={y}
                text={`${minsAsInt}'`}
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
                [cuspSign(props.cusps[index + 1]),
                cuspDegrees(props.cusps[index + 1]),
                cuspMins(props.cusps[index + 1])]
            ))}
        </Group>
    )
}