import React from "react";
import { Ring, Group } from "react-konva";

export default function Rings(props) {
    // Signs
    const signRingOuterRadius = 330 * props.scaleFactor;
    const signRingInnerRadius = 300 * props.scaleFactor;

    // House ring
    const houseRingOuterRadius = 170 * props.scaleFactor;
    const houseRingInnerRadius = 140 * props.scaleFactor;

    return (
        <Group>
            <Ring id="signRing"
                x={props.origin.x}
                y={props.origin.y}
                outerRadius={signRingOuterRadius}
                innerRadius={signRingInnerRadius}
                fill={'white'}
                stroke={'black'}
                strokeWidth={1}
            />
            <Ring id="houseRing"
                x={props.origin.x}
                y={props.origin.y}
                outerRadius={houseRingOuterRadius}
                innerRadius={houseRingInnerRadius}
                fill={'white'}
                stroke={'black'}
                strokeWidth={1}
            />
        </Group>
    )
}