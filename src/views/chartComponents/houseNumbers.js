import React from "react";
import { Text, Group } from "react-konva";
import { point, avgCoords } from "../../utils/geometry";

export default function HouseNumbers(props) {
    const houseNumberRadius = 155 * props.scaleFactor;

    const houseNumber = (num, coord) => {
        const [x, y] = point(props.origin, coord, houseNumberRadius, props.cuspOffset)
        return (
            <Text key={num}
                x={x}
                y={y}
                text={num}
                fontSize={16 * props.scaleFactor}
                strokeWidth={1}
                offsetX={8 * props.scaleFactor}
                offsetY={8 * props.scaleFactor}
            />
        )
    }

    return (
        <Group>
            {Object.keys(props.cusps).map((cusp, index) => (
                // 1-index and wrap 13 back around to 1, i.e. 2,1; 3,2... 12,11; 1,12.
                houseNumber(index + 1, avgCoords(props.cusps[((index + 1) % 12) + 1], props.cusps[index + 1]))
            ))}

        </Group>
    )
}