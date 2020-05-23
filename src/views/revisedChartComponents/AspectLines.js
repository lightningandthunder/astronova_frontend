import React from "react";
import { Line, Group } from "react-konva";
import { derivePoint } from "../../utils/geometry";
import { ASPECT_COLORS, AspectEnum } from "../../settings";

export default function AspectLines(props) {
  // const aspects = props.aspects;
  const dashedAspects = [AspectEnum.TRINE, AspectEnum.SEXTILE];

  const aspectLine = (aspect) => {
    if (aspect && aspect.aspectType !== AspectEnum.CONJUNCTION) {
      const pos1 = props.coords[aspect.planet1];
      const pos2 = props.coords[aspect.planet2];

      return (
        <Line key={`AspectLine-${aspect.planet1}-${aspect.planet2}`}
          points={[...derivePoint(props.scale.origin, pos1, props.scale.houseRingInnerRadius, props.rotationalOffset),
          ...derivePoint(props.scale.origin, pos2, props.scale.houseRingInnerRadius, props.rotationalOffset)]}
          stroke={ASPECT_COLORS[aspect.aspectType]}
          strokeWidth={(11 - aspect.orb) / 10}
          dash={[10, 7]}
          dashEnabled={dashedAspects.indexOf(aspect.aspectType) >= 0 ? true : false}
        />
      )
    }
  }


  return (
    <Group>
      {props.aspects.map(aspect => (
        aspectLine(aspect)
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