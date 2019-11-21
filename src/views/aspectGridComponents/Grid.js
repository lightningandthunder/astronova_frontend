import React from "react";
import { Group, Rect } from "react-konva";

export default function Grid(props) {
    const globalOffsetX = props.scale.origin.x / 2.2;
    const globalOffsetY = 40;
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
        "EP",
        "WP",
        "Asc",
        "MC",
        "Dsc",
        "IC"
    ];

    const getGridCells = (mode) => {
        const cells = [];
        for (let y = 1; y < planets.length; ++y) {
            // For uniwheel, cells per row = row number. For biwheel, made a square grid.
            const horizontalLimit = mode === "Uniwheel" ? y : planets.length;

            for (let x = 1; x <= horizontalLimit; ++x) {
                cells.push(<Rect
                    key={`${y}-${x}`}
                    x={globalOffsetX + (x * 50)}
                    y={globalOffsetY + (y * 50)}
                    height={50}
                    width={50}
                    stroke={"black"}
                    cornerRadius={1}
                />)
            }
        }
        return cells;
    }
    return (
        <Group>
            {getGridCells(props.mode)}
        </Group>
    );
}