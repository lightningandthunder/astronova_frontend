import React from "react";
import { Text } from "react-konva";

import { derivePoint, degToMin } from "../../../utils/geometry";
import { RingLayerEnum } from "../../../settings";

export default function PlanetMinutes(props) {
  const radiusMap = {
    [RingLayerEnum.UNIWHEEL]: 210,
    [RingLayerEnum.BIWHEEL_INNER]: 120,
    [RingLayerEnum.BIWHEEL_OUTER]: 220,
  };

  const radius = radiusMap[props.ringLayer] * props.scaleFactor;

  const mins = degToMin(props.rawCoordinate);

  const [x, y] = derivePoint(props.origin,
    props.renderCoordinate,
    radius,
    props.rotationalOffset);

  return (
    <Text key={`${props.planetName}-${radius}-Minutes`}
      x={x}
      y={y}
      text={`${mins}'`}
      fontSize={12}
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