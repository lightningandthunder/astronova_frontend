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
                text={props.local_datetime}
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