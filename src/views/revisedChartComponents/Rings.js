import React from "react";
import { Ring, Group } from "react-konva";
import { RingLayerEnum } from "../../settings";

export default function Rings(props) {
  const houseRingInnerRadiusMap = {
    [RingLayerEnum.UNIWHEEL]: 140,
    [RingLayerEnum.BIWHEEL_INNER]: 75,
    [RingLayerEnum.BIWHEEL_OUTER]: 75,
  };
  const houseRingOuterRadiusMap = {
    [RingLayerEnum.UNIWHEEL]: 170,
    [RingLayerEnum.BIWHEEL_INNER]: 105,
    [RingLayerEnum.BIWHEEL_OUTER]: 105,
  };

  const signRingInnerRadius = 300 * props.scaleFactor;
  const signRingOuterRadius = 330 * props.scaleFactor;
  const houseRingInnerRadius = houseRingInnerRadiusMap[props.ringLayer] * props.scaleFactor;
  const houseRingOuterRadius = houseRingOuterRadiusMap[props.ringLayer] * props.scaleFactor;

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

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/