import React from "react";
import { Text } from "react-konva";

import { derivePoint } from "../../utils/geometry";

export default function PlanetDegrees(props) {
  const [x, y] = derivePoint(props.origin,
    props.planet.renderCoord,
    props.radius,
    props.rotationalOffset);

  return (
    <Text key={`${props.planet.name}-${props.radius}-Degrees`}
      x={x}
      y={y}
      text={`${Math.trunc(props.planet.rawCoord) % 30}\u00B0`}
      fontSize={14 * props.scaleFactor}
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