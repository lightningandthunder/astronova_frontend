import React from "react";
import { Line, Group } from "react-konva";
import { derivePoint } from "../../utils/geometry";
import { ASPECT_COLORS, AspectEnum } from "../../settings";

export default function AspectLines(props) {
  // const aspects = props.aspects;
  const dashedAspects = [AspectEnum.TRINE, AspectEnum.SEXTILE];
  const radius = 140 * props.scaleFactor;

  const aspectLine = (aspect) => {
    if (aspect && aspect.aspectType !== AspectEnum.CONJUNCTION) {
      const pos1 = props.coords[aspect.planet1];
      const pos2 = props.coords[aspect.planet2];

      const [x1, y1] = derivePoint(props.origin, pos1, radius, props.rotationalOffset);
      const [x2, y2] = derivePoint(props.origin, pos2, radius, props.rotationalOffset);
      return (
        <Line key={`AspectLine-${aspect.planet1}-${aspect.planet2}`}
          points={[x1, y1, x2, y2]}
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