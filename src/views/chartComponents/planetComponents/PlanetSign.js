import React from "react";
import { Text } from "react-konva";

import { derivePoint, parseSign } from "../../../utils/geometry";
import { getSymbol } from "../../../utils/utils";
import { SIGN_COLORS, RingLayerEnum } from "../../../settings";

export default function PlanetSign(props) {
  const radiusMap = {
    [RingLayerEnum.UNIWHEEL]: 230,
    [RingLayerEnum.BIWHEEL_INNER]: 140,
    [RingLayerEnum.BIWHEEL_OUTER]: 230,
  };
  const radius = radiusMap[props.ringLayer] * props.scaleFactor;

  const house = Math.trunc(props.rawCoordinate / 30) + 1;
  const sign = props.isZodiacal
    ? parseSign(props.rawCoordinate)
    : house;

  const [x, y] = derivePoint(props.origin,
    props.renderCoordinate,
    radius,
    props.rotationalOffset);
  return (
    <Text
      x={x}
      y={y}
      key={`${props.planetName}-${radius}-Sign`}
      text={props.isZodiacal ? getSymbol(sign) : house}
      stroke={props.isZodiacal ? SIGN_COLORS[sign] : "black"}
      strokeWidth={1}
      fontFamily={props.isZodiacal ? "AstroDotBasic" : "Arial"}
      fontSize={props.isZodiacal ? 22 : 14}
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