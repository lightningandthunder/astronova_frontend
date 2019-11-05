import React from "react";
import { Circle, Group } from "react-konva";

export default function BiwheelDivider(props) {
    return (
        <Group>
            <Circle id="BiwheelDivider"
                x={props.scale.origin.x}
                y={props.scale.origin.y}
                radius={props.scale.dividerRadiusBiwheel}
                stroke={'black'}
                strokeWidth={1}
            />
        </Group>
    )
}