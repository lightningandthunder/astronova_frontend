import React from "react";
import { Text, Group } from "react-konva";
import { derivePoint, parseSign, degToMin } from "../../utils/geometry";
import { SIGN_UNICODE, SIGN_COLORS } from "../../settings";

export default function CuspCoords(props) {
  const radius = 315 * props.scaleFactor;
  const planetFontSize = 22 * props.scaleFactor;
  const planetDegreeFontSize = 14 * props.scaleFactor;
  const cuspSignOffsetX = 8 * props.scaleFactor;
  const cuspSignOffsetY = 8 * props.scaleFactor;
  const clockwiseOffset = 4 * props.scaleFactor;
  const cuspDegreesFontSize = 8 * props.scaleFactor;

  const cuspSign = (cusp, coord) => {
    const house = Math.trunc(coord / 30) + 1;
    const sign = props.zodiacal ? parseSign(coord) : house;
    const [x, y] = derivePoint(props.origin, coord, radius, props.cuspOffset);
    return (
      <Text
        x={x}
        y={y}
        key={`${cusp}-Sign`}
        text={props.zodiacal ? SIGN_UNICODE[sign] : house}
        stroke={props.zodiacal ? SIGN_COLORS[sign] : "black"}
        strokeWidth={1}
        fontFamily={props.zodiacal ? "AstroDotBasic" : "Arial"}
        fontSize={props.zodiacal ? planetFontSize : planetDegreeFontSize}
        offsetX={cuspSignOffsetX}
        offsetY={cuspSignOffsetY}
      />
    )
  }

  const cuspDegrees = (cusp, coord) => {
    // Cusps 7-12 need to have degrees and minutes in opposite places for readability
    const offset = cusp <= 6
      ? clockwiseOffset * -1
      : clockwiseOffset
    const adjustedCoordPos = Math.trunc(coord + offset);  // TODO: Can I remove Math.trunc?
    const [x, y] = derivePoint(props.origin, adjustedCoordPos, radius, props.cuspOffset);
    return (
      <Text key={`${cusp}-Degrees`}
        x={x}
        y={y}
        text={`${Math.trunc(coord % 30)}\u00B0`}
        fontSize={cuspDegreesFontSize}
        strokeWidth={1}
        offsetX={props.scale.cuspDegreesOffsetX}
        offsetY={props.scale.cuspDegreesOffsetY}
      />
    )
  }

  const cuspMins = (cusp, coord) => {
    // Cusps 7-12 need to have degrees and minutes in opposite places for readability
    const offset = cusp <= 6
      ? clockwiseOffset
      : clockwiseOffset * -1
    const adjustedCoordPos = Math.trunc(coord + offset);   // TODO: Can I remove Math.trunc?
    const mins = degToMin(coord);
    const [x, y] = derivePoint(props.origin, adjustedCoordPos, radius, props.cuspOffset);
    return (
      <Text key={`${cusp}-Minutes`}
        x={x}
        y={y}
        text={`${mins}'`}
        fontSize={props.scale.cuspMinsFontSize}
        strokeWidth={1}
        offsetX={props.scale.cuspMinsOffsetX}
        offsetY={props.scale.cuspMinsOffsetY}
      />
    )
  }

  return (
    <Group>
      {Object.keys(props.cusps).map((cusp, index) => (
        [cuspSign(cusp, props.cusps[index + 1]),
        cuspDegrees(cusp, props.cusps[index + 1]),
        cuspMins(cusp, props.cusps[index + 1])]
      ))}
    </Group>
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/