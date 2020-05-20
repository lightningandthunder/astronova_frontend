import React from "react";
import { Text } from "react-konva";

import { derivePoint, parseSign } from "../../../utils/geometry";
import { SIGN_COLORS, SIGN_UNICODE } from "../../../settings";

export default function PlanetSign(props) {
  const house = Math.trunc(props.planet.rawCoord / 30) + 1;
  const sign = props.zodiacal
    ? parseSign(props.planet.rawCoord)
    : house;

  const [x, y] = derivePoint(props.origin,
    props.planet.renderCoord,
    props.radius,
    props.rotationalOffset);
  return (
    <Text
      x={x}
      y={y}
      key={`${props.planet.name}-${props.radius}-Sign`}
      text={props.zodiacal ? SIGN_UNICODE[sign] : house}
      stroke={props.zodiacal ? SIGN_COLORS[sign] : "black"}
      strokeWidth={1}
      fontFamily={props.zodiacal ? "AstroDotBasic" : "Arial"}
      fontSize={props.zodiacal ? 22 : 14}
      offsetX={8}
      offsetY={8}
    />
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/