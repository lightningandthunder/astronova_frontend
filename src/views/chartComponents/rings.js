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

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/