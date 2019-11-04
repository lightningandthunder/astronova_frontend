import React from "react";
import { Ring, Group } from "react-konva";

export default function Rings(props) {
    // Signs
    const signRingOuterRadius = 330;
    const signRingInnerRadius = 300;

    // House ring
    const houseRingOuterRadius = 170;
    const houseRingInnerRadius = 140;

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