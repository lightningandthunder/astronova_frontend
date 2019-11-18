import React from "react";
import { Group, Rect } from "react-konva";

export default function Grid(props) {
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
    const getPlanetPermutations = (mode) => {
        let combinations = [];
        let usedKeys = [];
        for (let planetIndex1 in planets) {
            for (let planetIndex2 in planets) {
                if (mode === "Uniwheel" &&
                    (planetIndex1 === planetIndex2 || usedKeys.indexOf(planetIndex2) >= 0))
                    // Don't repeat planet combinations for Uniwheel
                    continue;

                combinations.push(`${planets[planetIndex1]}-${planets[planetIndex2]}`);
            }

            usedKeys.push(planetIndex1);
        }
        return combinations;
    }

    const getGridCells = (mode) => {
        const cells = [];
        for (let y = 1; y < planets.length; ++y) {
            // For uniwheel, cells per row = row number. For biwheel, made a square grid.
            const horizontalLimit = mode === "Uniwheel" ? y : planets.length;

            for (let x = 1; x <= horizontalLimit; ++x) {
                cells.push(<Rect
                    key={`${y}-${x}`}
                    x={x * 50}
                    y={y * 50}
                    height={50}
                    width={50}
                    stroke={"black"}
                    cornerRadius={1}
                />)
            }
        }
        return cells;
    }

    const uniwheelGrid = () => {
        const permutations = getPlanetPermutations("Uniwheel");
        return (
            <Group>
                {getGridCells("Uniwheel")}
            </Group>
        )
    }

    return (
        <Group>
            {uniwheelGrid()}
        </Group>
    );
}