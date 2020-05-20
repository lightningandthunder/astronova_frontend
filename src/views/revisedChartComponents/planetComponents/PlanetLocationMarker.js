import React from "react";
import { Line } from "react-konva";
import { derivePoint } from "../../utils/geometry";

export default function PlanetLocationMarker(props) {
  return (
    <Line key={`PlanetMarker-${planet}-${props.ringLayer}`}
      points={[...derivePoint(props.origin, props.coordinate, props.scale.planetMarkerOutsideRadius, props.rotationalOffset),
      ...derivePoint(props.origin, props.coordinate, props.scale.planetMarkerInsideRadius, props.rotationalOffset)]}
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
