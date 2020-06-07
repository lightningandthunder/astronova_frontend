import React from "react";
import { Line, Group, Arrow } from "react-konva";
import { derivePoint } from "../../utils/geometry";
import { RingLayerEnum } from "../../settings";

export default function CuspLines(props) {
  const angularCusps = [1, 4, 7, 10];
  const succedentCusps = [2, 5, 8, 11];
  // const cadentCusps = [3, 6, 9, 12];

  const houseRingInnerRadiusMap = {
    [RingLayerEnum.UNIWHEEL]: 140,
    [RingLayerEnum.BIWHEEL_INNER]: 75,
    [RingLayerEnum.BIWHEEL_OUTER]: 75,
  };

  const houseRingInnerRadius = houseRingInnerRadiusMap[props.ringLayer] * props.scaleFactor;
  const signRingInnerRadius = 300 * props.scaleFactor;

  const getStrokeColor = (cuspId) => {
    if (props.isZodiacal || angularCusps.indexOf(cuspId) >= 0)
      return "black";

    return "gray";
  }
  const getStrokeWidth = (cuspId) => {
    if (angularCusps.indexOf(cuspId) >= 0)
      return props.isZodiacal ? 2 : 1;
    if (succedentCusps.indexOf(cuspId) >= 0)
      return props.isZodiacal ? 1 : 0.15;

    // Cadent cusps
    return 1;
  }

  const cuspLine = (pos, cuspId) => {
    const [x1, y1] = derivePoint(props.origin, pos, houseRingInnerRadius, props.rotationalOffset);
    const [x2, y2] = derivePoint(props.origin, pos, signRingInnerRadius, props.rotationalOffset);
    return (
      cuspId === 10  // MC gets an arrow instead of a line
        ? <Arrow key={`${cuspId}-Line`}
          points={[x1, y1, x2, y2]}
          stroke={"black"}
          strokeWidth={2}
          fill={"black"} />

        : <Line key={`${cuspId}-Line`}
          points={[x1, y1, x2, y2]}
          stroke={getStrokeColor(cuspId)}
          strokeWidth={getStrokeWidth(cuspId)}
        />
    )
  }

  return (
    <Group>
      {Object.keys(props.cusps).map((_, index) => (
        cuspLine(props.cusps[index + 1], index + 1)
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