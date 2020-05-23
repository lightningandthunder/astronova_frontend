import React from "react";
import { Text, Group } from "react-konva";
import { derivePoint, parseSign, degToMin } from "../../utils/geometry";
import { SIGN_UNICODE, SIGN_COLORS } from "../../settings";

export default function CuspCoords(props) {
  const radius = 315 * props.scaleFactor;

  const cuspSign = (cusp, coord) => {
    const house = Math.trunc(coord / 30) + 1;
    const sign = props.isZodiacal ? parseSign(coord) : house;
    const [x, y] = derivePoint(props.origin, coord, radius, props.rotationalOffset);
    return (
      <Text
        x={x}
        y={y}
        key={`${cusp}-Sign`}
        text={props.isZodiacal ? SIGN_UNICODE[sign] : house}
        stroke={props.isZodiacal ? SIGN_COLORS[sign] : "black"}
        strokeWidth={1}
        fontFamily={props.isZodiacal ? "AstroDotBasic" : "Arial"}
        fontSize={(props.isZodiacal ? 22 : 14) * props.scaleFactor}
        offsetX={8 * props.scaleFactor}
        offsetY={8 * props.scaleFactor}
      />
    )
  }

  const cuspDegrees = (cusp, coord) => {
    // Cusps 7-12 need to have degrees and minutes in opposite places for readability
    const offset = (cusp <= 6 ? -4 : 4) * props.scaleFactor;
    const adjustedCoordPos = Math.trunc(coord + offset);  // TODO: Can I remove Math.trunc?
    const [x, y] = derivePoint(props.origin, adjustedCoordPos, radius, props.rotationalOffset);
    return (
      <Text key={`${cusp}-Degrees`}
        x={x}
        y={y}
        text={`${Math.trunc(coord % 30)}\u00B0`}
        fontSize={14 * props.scaleFactor}
        strokeWidth={1}
        offsetX={8 * props.scaleFactor}
        offsetY={8 * props.scaleFactor}
      />
    )
  }

  const cuspMins = (cusp, coord) => {
    // Cusps 7-12 need to have degrees and minutes in opposite places for readability
    const offset = (cusp <= 6 ? 4 : -4) * props.scaleFactor;
    const adjustedCoordPos = Math.trunc(coord + offset);   // TODO: Can I remove Math.trunc?
    const mins = degToMin(coord);
    const [x, y] = derivePoint(props.origin, adjustedCoordPos, radius, props.rotationalOffset);
    return (
      <Text key={`${cusp}-Minutes`}
        x={x}
        y={y}
        text={`${mins}'`}
        fontSize={14 * props.scaleFactor}
        strokeWidth={1}
        offsetX={8 * props.scaleFactor}
        offsetY={8 * props.scaleFactor}
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