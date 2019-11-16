import React from "react";
import { Group, Rect } from "react-konva";
import AspectManager from "../../managers/AspectManager";

export default function Grid(props) {
    const manager = new AspectManager();
    let aspectList = [];
    let usedKeys = [];
    const epWp = ["EP", "WP"];

    for (let planet1 of Object.keys(props.chart)) {
        for (let planet2 of Object.keys(props.chart)) {
            // Don't loop over the same planet again
            if (planet1 === planet2
                || usedKeys.indexOf(planet2) >= 0
                // These will eventually not be necessary, once the chart coordinate
                // structure is fully hashed out
                || epWp.indexOf(planet1) >= 0
                || epWp.indexOf(planet2) >= 0)
                continue;

            let aspect = manager.parseAspect(planet1,
                props.chart[planet1],
                planet2,
                props.chart[planet2]);
            aspectList.push(aspect);
        }

        usedKeys.push(planet1);
    }
    return (
        <Group>
            {aspectList.map((aspect) => (
                console.log(aspect)
            ))}
        </Group>
    );
}