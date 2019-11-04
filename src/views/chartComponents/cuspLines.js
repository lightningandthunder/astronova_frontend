import React from "react";
import { Line, Group } from "react-konva";
import { point } from "../../utils/geometry";

export default function CuspLines(props) {
    const signRingInnerRadius = 300;
    const houseRingInnerRadius = 140;

    const cuspLine = (pos, cuspId) => {
        return (
            <Line key={cuspId}
                points={[...point(props.origin, pos, houseRingInnerRadius, props.cuspOffset), ...point(props.origin, pos, signRingInnerRadius, props.cuspOffset)]}
                stroke={'black'}
                strokeWidth={1}
                lineCap={'round'}
                lineJoin={'round'}
            />
        )
    }

    return (
        <Group>
            {Object.keys(props.cusps).map((cusp, index) => (
                cuspLine(props.cusps[index + 1], index + 1)
            ))}
        </Group>
    )
}