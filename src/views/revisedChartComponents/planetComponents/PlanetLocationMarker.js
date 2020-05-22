import React from "react";
import { Line } from "react-konva";
import { derivePoint } from "../../utils/geometry";

export default function PlanetLocationMarker(props) {
  const radiusMap = {
    [WheelRingEnum.UNIWHEEL]: 170,
    [WheelRingEnum.BIWHEEL_INNER]: 105,
    [WheelRingEnum.BIWHEEL_OUTER]: 205,
  };

  const innerRadius = radiusMap[props.ringLayer] * props.scaleFactor;
  const outerRadius = innerRadius + (5 * props.scaleFactor);

  const [x1, y1] = derivePoint(
    props.origin,
    props.rawCoordinate,
    innerRadius,
    props.rotationalOffset
  );
  const [x2, y2] = derivePoint(
    props.origin,
    props.rawCoordinate,
    outerRadius,
    props.rotationalOffset
  );

  return (
    <Line key={`PlanetMarker-${props.planetName}-${props.ringLayer}`}
      points={[x1, y1, x2, y2]}
      stroke={"black"}
      strokeWidth={1}
    />
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/
