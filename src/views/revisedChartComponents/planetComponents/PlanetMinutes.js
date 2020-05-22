import React from "react";
import { Text } from "react-konva";

import { derivePoint, degToMin } from "../../utils/geometry";

export default function PlanetMinutes(props) {
  const radiusMap = {
    [WheelRingEnum.UNIWHEEL]: 210,
    [WheelRingEnum.BIWHEEL_INNER]: 120,
    [WheelRingEnum.BIWHEEL_OUTER]: 220,
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
      fontSize={12 * props.scaleFactor}
      strokeWidth={1}
      offsetX={8 * props.scaleFactor}
      offsetY={8 * props.scaleFactor}
    />
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/