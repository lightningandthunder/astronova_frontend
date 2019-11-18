import React from "react";
import { Group, Text } from "react-konva";
import AspectManager from "../../managers/AspectManager";

export default function GridAspects(props) {
    const planets = [
        "Sun",
        "Moon",
        "Mercury",
        "Venus",
        "Mars",
        "Jupiter",
        "Saturn",
        "Uranus",
        "Neptune",
        "Pluto",
        "Asc",
        "MC",
        "Dsc",
        "IC"
    ];

    const getAspects = (chart) => {
        const manager = new AspectManager();
        let aspectList = [];
        let usedKeys = [];
        const epWp = ["EP", "WP"];

        // Need to clean this up and put into a dedicated function to determine
        // Chart points, for the grid cells as well as their contents.
        const chartPoints = chart;
        chartPoints["Asc"] = props.angles["Asc"];
        chartPoints["MC"] = props.angles["MC"];
        chartPoints["Dsc"] = props.angles["Dsc"];
        chartPoints["IC"] = props.angles["IC"];

        for (let planet1 of Object.keys(chartPoints)) {
            for (let planet2 of Object.keys(chartPoints)) {
                // Don't loop over the same planet again
                if (planet1 === planet2
                    || usedKeys.indexOf(planet2) >= 0
                    // These will eventually not be necessary, once the chart coordinate
                    // structure is fully hashed out
                    || epWp.indexOf(planet1) >= 0
                    || epWp.indexOf(planet2) >= 0)
                    continue;

                let aspect = manager.parseAspect(planet1,
                    chartPoints[planet1],
                    planet2,
                    chartPoints[planet2]);
                aspectList.push(aspect);
            }

            usedKeys.push(planet1);
        }
        console.log(aspectList)
        return aspectList;
    }

    const getAspectSymbols = (aspects) => {
        const cells = [];
        let accumulator = 0;
        for (let y = 1; y < planets.length; ++y) {
            const horizontalLimit = y;

            for (let x = 1; x <= horizontalLimit; ++x) {
                cells.push(<Text
                    key={`${y}-${x}`}
                    x={x * 50}
                    y={y * 50}
                    fontSize={12}
                    stroke={"black"}
                    text={aspects[accumulator].aspectType}
                    offsetX={-15}
                    offsetY={-15}
                    strokeWidth={1}
                />)
                ++accumulator;
            }
        }
        return cells;

    }
    return (
        <Group>
            {getAspectSymbols(getAspects(props.chart))}
        </Group>
    );
}