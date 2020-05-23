import React from "react";
import { Text, Group } from "react-konva";
import { derivePoint, avgCoords } from "../../utils/geometry";

export default function HouseNumbers(props) {
  const radiusMap = {
    [RingLayerEnum.UNIWHEEL]: 210,
    [RingLayerEnum.BIWHEEL_INNER]: 120,
    [RingLayerEnum.BIWHEEL_OUTER]: 220,
  };
  const radius = radiusMap[props.ringLayer] * props.scaleFactor;

  const getMidpointCoordinate = index => {
    // 1-index and wrap 13 back around to 1, i.e. 2,1; 3,2... 12,11; 1,12.
    const nextCuspCoordinate = props.cusps[((index + 1) % 12) + 1];
    const currentCuspCoordinate = props.cusps[index + 1];
    return avgCoords(nextCuspCoordinate, currentCuspCoordinate);
  }

  const houseNumber = (num, coord) => {
    const [x, y] = derivePoint(props.origin, coord, radius, props.cuspOffset)
    return (
      <Text key={`${num}-HouseNumber`}
        x={x}
        y={y}
        text={num}
        fontSize={16 * props.scaleFactor}
        strokeWidth={1}
        offsetX={8 * props.scaleFactor}
        offsetY={8 * props.scaleFactor}
      />
    )
  }

  return (
    <Group>
      {Object.keys(props.cusps).map((cusp, index) => (
        houseNumber(index + 1, getMidpointCoordinate(index))
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