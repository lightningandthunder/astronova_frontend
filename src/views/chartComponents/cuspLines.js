import React from "react";
import { Line, Group, Arrow } from "react-konva";
import { derivePoint } from "../../utils/geometry";

export default function CuspLines(props) {
    const boldCusps = [1, 4, 7, 10];

    const cuspLine = (pos, cuspId) => {
        return (
            cuspId === 10
                ? <Arrow key={`${cuspId}-Line`}
                    points={[...derivePoint(props.scale.origin, pos, props.scale.houseRingInnerRadius, props.cuspOffset),
                    ...derivePoint(props.scale.origin, pos, props.scale.signRingInnerRadius, props.cuspOffset)]}
                    stroke={"black"}
                    strokeWidth={2}
                    fill={"black"} />

                : <Line key={cuspId}
                    points={[...derivePoint(props.scale.origin, pos, props.scale.houseRingInnerRadius, props.cuspOffset),
                    ...derivePoint(props.scale.origin, pos, props.scale.signRingInnerRadius, props.cuspOffset)]}
                    stroke={"black"}
                    strokeWidth={boldCusps.indexOf(cuspId) >= 0 ? 2 : 1}
                />
        )
    }

    return (
        <Group>
            {Object.keys(props.cusps).map((_, index) => (
                cuspLine(props.cusps[index + 1], index + 1)
            ))}
        </Group>
    )
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/