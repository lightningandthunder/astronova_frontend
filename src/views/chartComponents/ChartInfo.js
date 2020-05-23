import React from "react";
import { Text, Group } from "react-konva";

export default function ChartInfo(props) {
  /* Displays chart information in the top left corner.
  ** TODO: rewrite this with dynamic font sizing and offset.
  */

  return (
    <Group>
      <Text key={`ChartInfoName`}
        x={10}
        y={10}
        text={props.name}
        fontSize={14}
        strokeWidth={1}
      />
      <Text key={`ChartInfoPlaceName`}
        x={10}
        y={25}
        text={`${props.placeName}`}
        fontSize={14}
        strokeWidth={1}
      />
      <Text key={`ChartInfoGeoCoords`}
        x={10}
        y={40}
        text={`${props.longitude}, ${props.latitude}`}
        fontSize={14}
        strokeWidth={1}
      />
      <Text key={`ChartInfoDatetime`}
        x={10}
        y={55}
        // Newline to split long text into 2 shorter lines
        text={props.localDatetime.replace("GMT", "\nGMT")}
        fontSize={14}
        strokeWidth={1}
      />
    </Group>
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/