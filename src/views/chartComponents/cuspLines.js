import React from "react";
import { Line, Group, Arrow } from "react-konva";
import { derivePoint } from "../../utils/geometry";

export default function CuspLines(props) {
    const cuspLine = (pos, cuspId) => {
        return (
            <Line key={cuspId}
                points={[...derivePoint(props.scale.origin, pos, props.scale.houseRingInnerRadius, props.cuspOffset),
                ...derivePoint(props.scale.origin, pos, props.scale.signRingInnerRadius, props.cuspOffset)]}
                stroke={"black"}
                strokeWidth={1}
            />
        )
    }

    const mcArrow = (pos, cuspId) => {
        return (
            <Arrow key={cuspId}
                points={[...derivePoint(props.scale.origin, pos, props.scale.houseRingInnerRadius, props.cuspOffset),
                ...derivePoint(props.scale.origin, pos, props.scale.signRingInnerRadius, props.cuspOffset)]}
                stroke={"black"}
                strokeWidth={1}
                fill={"black"}
            />
        )
    }

    return (
        <Group>
            {Object.keys(props.cusps).map((cusp, index) => (
                cusp === "10"  // 10th house cusp, as MC, typically has arrow
                    ? mcArrow(props.cusps["10"], "Arrow")
                    : cuspLine(props.cusps[index + 1], index + 1)
            ))}
        </Group>
    )
}