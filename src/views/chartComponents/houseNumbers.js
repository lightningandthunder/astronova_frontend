import React from "react";
import { Text, Group } from "react-konva";
import { derivePoint, avgCoords } from "../../utils/geometry";

export default function HouseNumbers(props) {
    const houseNumber = (num, coord) => {
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.houseNumberRadius, props.cuspOffset)
        return (
            <Text key={`${num}-HouseNumber`}
                x={x}
                y={y}
                text={num}
                fontSize={props.scale.houseNumberFontSize}
                strokeWidth={1}
                offsetX={props.scale.houseNumberOffsetX}
                offsetY={props.scale.houseNumberOffsetY}
            />
        )
    }

    return (
        <Group>
            {Object.keys(props.cusps).map((cusp, index) => (
                // 1-index and wrap 13 back around to 1, i.e. 2,1; 3,2... 12,11; 1,12.
                houseNumber(index + 1,
                    avgCoords(props.cusps[((index + 1) % 12) + 1], props.cusps[index + 1])
                )
            ))}

        </Group>
    )
}