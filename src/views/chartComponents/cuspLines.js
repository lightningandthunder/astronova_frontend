import React from "react";
import { Line, Group } from "react-konva";
import { derivePoint } from "../../utils/geometry";

export default function CuspLines(props) {
    const cuspLine = (pos, cuspId) => {
        return (
            <Line key={cuspId}
                points={[...derivePoint(props.scale.origin, pos, props.scale.houseRingInnerRadius, props.cuspOffset),
                ...derivePoint(props.scale.origin, pos, props.scale.signRingInnerRadius, props.cuspOffset)]}
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