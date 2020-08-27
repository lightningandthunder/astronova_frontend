import React from "react";
import { Text } from "react-konva";

import { derivePoint } from "../../../utils/geometry";
import { RingLayerEnum } from "../../../settings";

export default function PlanetDegrees(props) {
  const radiusMap = {
    [RingLayerEnum.UNIWHEEL]: 255,
    [RingLayerEnum.BIWHEEL_INNER]: 165,
    [RingLayerEnum.BIWHEEL_OUTER]: 265,
  };

  const radius = radiusMap[props.ringLayer] * props.scaleFactor;

  const [x, y] = derivePoint(props.origin,
    props.renderCoordinate,
    radius,
    props.rotationalOffset);

  return (
    <Text key={`${props.planetName}-${radius}-Degrees`}
      x={x}
      y={y}
      text={`${Math.trunc(props.rawCoordinate) % 30}\u00B0`}
      fontSize={14}
      strokeWidth={1}
      offsetX={8}
      offsetY={8}
      scale={{ x: props.scaleFactor, y: props.scaleFactor }}
    />
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/