import React from "react";
import { Text } from "react-konva";

import { derivePoint, degToMin } from "../../utils/geometry";

export default function PlanetMinutes(props) {
  const mins = degToMin(props.planet.rawCoord);

  const [x, y] = derivePoint(props.scale.origin,
    props.planet.renderCoord,
    props.radius,
    props.rotationalOffset);

  return (
    <Text key={`${props.planet.name}-${props.radius}-Minutes`}
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