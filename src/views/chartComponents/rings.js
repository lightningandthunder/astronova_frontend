import React from "react";
import { Ring, Group } from "react-konva";

export default function Rings(props) {
    return (
        <Group>
            <Ring id="signRing"
                x={props.scale.origin.x}
                y={props.scale.origin.y}
                outerRadius={props.scale.signRingOuterRadius}
                innerRadius={props.scale.signRingInnerRadius}
                fill={'white'}
                stroke={'black'}
                strokeWidth={1}
            />
            <Ring id="houseRing"
                x={props.scale.origin.x}
                y={props.scale.origin.y}
                outerRadius={props.scale.houseRingOuterRadius}
                innerRadius={props.scale.houseRingInnerRadius}
                fill={'white'}
                stroke={'black'}
                strokeWidth={1}
            />
        </Group>
    )
}