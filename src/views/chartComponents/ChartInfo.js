import React from "react";
import { Text, Group } from "react-konva";

export default function ChartInfo(props) {
    /* Displays chart information in the top left corner.
    ** Will eventually need to rewrite this with dynamic font sizing and offset.
    */

    const name = () => {
        return (
            <Text key={`ChartInfoName`}
                x={10}
                y={10}
                text={props.name}
                fontSize={14}
                strokeWidth={1}
            />
        )
    }

    const geoCoords = () => {
        return (
            <Text key={`ChartInfoGeoCoords`}
                x={10}
                y={25}
                text={`${props.longitude}, ${props.latitude}`}
                fontSize={14}
                strokeWidth={1}
            />
        )
    }

    const dt = () => {
        return (
            <Text key={`ChartInfoDatetime`}
                x={10}
                y={40}
                // Newline to split long text into 2 shorter lines
                text={props.local_datetime.replace("GMT", "\nGMT")} 
                fontSize={14}
                strokeWidth={1}
            />
        )
    }

    return (
        <Group>
            {name()}
            {geoCoords()}
            {dt()}
        </Group>
    )
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/