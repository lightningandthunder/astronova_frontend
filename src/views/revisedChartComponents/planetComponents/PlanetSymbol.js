import React from "react";
import { Text } from "react-konva";

import { derivePoint } from "../../../utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE, WheelRingEnum } from "../../../settings";


export default function PlanetSymbol(props) {
  const radiusMap = {
    [WheelRingEnum.UNIWHEEL]: 280,
    [WheelRingEnum.BIWHEEL_INNER]: 190,
    [WheelRingEnum.BIWHEEL_OUTER]: 280,
  };

  const radius = radiusMap[props.ringLayer] * props.scaleFactor;
  const textualChartPoints = ["EP", "WP"];

  const [x, y] = derivePoint(props.origin,
    props.renderCoordinate,
    radius,
    props.rotationalOffset);

  return (
    <Text key={`${props.planetName}-${radius}-Symbol`}
      x={x}
      y={y}
      text={PLANET_UNICODE[props.planetName]}
      fontSize={
        textualChartPoints.indexOf(props.planetName) >= 0
          ? 14 * props.scaleFactor
          : 22 * props.scaleFactor
      }
      stroke={PLANET_COLORS[props.planetName]}
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