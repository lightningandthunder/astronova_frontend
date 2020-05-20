import React from "react";
import { Text } from "react-konva";

import { derivePoint } from "../../../utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE } from "../../../settings";

export default function PlanetSymbol(props) {
  const [x, y] = derivePoint(props.origin,
    props.planet.renderCoord,
    props.radius,
    props.rotationalOffset);

  return (
    <Text key={`${props.planet.name}-${props.radius}-Symbol`}
      x={x}
      y={y}
      text={PLANET_UNICODE[props.planet.name]}
      fontSize={
        props.planet.name === "EP" || props.planet.name === "WP"
          ? 14 * props.scaleFactor
          : 22 * props.scaleFactor
      }
      stroke={PLANET_COLORS[props.planet.name]}
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