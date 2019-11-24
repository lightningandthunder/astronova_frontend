import React from "react";
import { Group, Text } from "react-konva";
import AspectManager from "../../managers/AspectManager";
import { PLANET_UNICODE, PLANET_COLORS } from "../../settings";

export default function GridAspects(props) {
    const globalOffsetX = props.scale.origin.x / 2.2;
    const globalOffsetY = 10;
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

    const getAspects = () => {
        const manager = new AspectManager();
        let aspectList = [];
        let usedKeys = [];

        const planetRowVertical = props.charts[0];
        let planetRowHorizontal = null;

        // Need to clean this up and put into a dedicated function to determine
        // Chart points, for the grid cells as well as their contents.
        planetRowVertical["Asc"] = props.angles["Asc"];
        planetRowVertical["MC"] = props.angles["MC"];
        planetRowVertical["Dsc"] = props.angles["Dsc"];
        planetRowVertical["IC"] = props.angles["IC"];

        if (props.charts.length > 1 && props.angles.length > 1) {
            planetRowHorizontal = props.charts[1];
            planetRowHorizontal["Asc"] = props.angles[1]["Asc"];
            planetRowHorizontal["MC"] = props.angles[1]["MC"];
            planetRowHorizontal["Dsc"] = props.angles[1]["Dsc"];
            planetRowHorizontal["IC"] = props.angles[1]["IC"];
        } else {
            planetRowHorizontal = planetRowVertical;
        }

        for (let planet1 of Object.keys(planetRowHorizontal)) {
            for (let planet2 of Object.keys(planetRowVertical)) {
                // Don't loop over the same planet again
                if (props.charts.length === 1)
                    if (planet1 === planet2 || usedKeys.indexOf(planet2) >= 0)
                        continue;

                let aspect = manager.parseAspect(planet1,
                    planetRowHorizontal[planet1],
                    planet2,
                    planetRowVertical[planet2]);

                aspectList.push(aspect);
            }
            usedKeys.push(planet1);
        }
        return aspectList;
    }

    const getAspectSymbols = (aspects) => {
        const cells = [];
        let accumulator = 0;

        for (let x = 1; x < planets.length; ++x) {
            for (let y = x; y < planets.length; ++y) {
                cells.push(<Text
                    key={`${y}-${x}`}
                    x={globalOffsetX + (x * 50)}
                    y={globalOffsetY + (y * 50)}
                    fontSize={12}
                    stroke={"black"}
                    text={aspects[accumulator] ? aspects[accumulator].aspectType : null}
                    offsetX={-12}
                    offsetY={0}
                    strokeWidth={1}
                />)
                ++accumulator;
            }
        }

        return cells;
    }

    const getAspectOrbs = (aspects) => {
        const cells = [];
        let accumulator = 0;

        for (let x = 1; x < planets.length; ++x) {
            for (let y = x; y < planets.length; ++y) {

                // Only populate if aspectType is not null
                if (aspects[accumulator].aspectType) {
                    const degrees = Math.trunc(aspects[accumulator].orb);
                    let minutes = Math.trunc((aspects[accumulator].orb - degrees) * 60);

                    // Prepend 0 if minutes < 10
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    cells.push(<Text
                        key={`${y}-${x}`}
                        x={globalOffsetX + (x * 50)}
                        y={globalOffsetY + (y * 50)}
                        fontSize={9}
                        stroke={"black"}
                        text={`${degrees}\u00B0 ${minutes}'`}
                        offsetX={-10}
                        offsetY={-20}
                        strokeWidth={1}
                    />)
                }
                ++accumulator;
            }
        }
        return cells;
    }

    const getVerticalPlanetSymbols = () => {
        const cells = [];
        // For biwheels, slide symbols down by 1, due to starting index in for loop
        const cellOffset = props.mode === "Uniwheel?" ? 0 : 1;

        for (let y = props.mode === "Uniwheel" ? 1 : 0; y < planets.length; ++y) {
            cells.push(<Text
                key={`${y}-verticalPlanetSymbol`}
                x={globalOffsetX}
                y={globalOffsetY + ((y + cellOffset) * 50)}
                fontSize={14}
                stroke={PLANET_COLORS[planets[y]]}
                text={`${PLANET_UNICODE[planets[y]]}`}
                offsetX={-20}
                offsetY={-10}
                strokeWidth={1}
            />);
        }
        return cells;
    }

    const getHorizontalPlanetSymbols = () => {
        const cells = [];
        for (let x = 0; x < planets.length; ++x) {
            cells.push(<Text
                key={`${x}-horizontalPlanetSymbol`}
                x={((x + 1) * 50) + globalOffsetX}
                y={globalOffsetY}
                fontSize={14}
                stroke={PLANET_COLORS[planets[x]]}
                text={`${PLANET_UNICODE[planets[x]]}`}
                offsetX={-20}
                offsetY={-20}
                strokeWidth={1}
            />);
        }
        return cells;
    }
    const aspects = getAspects();
    const symbols = getAspectSymbols(aspects);
    const orbs = getAspectOrbs(aspects);
    const verticalSymbols = getVerticalPlanetSymbols();
    const horizontalSymbols = getHorizontalPlanetSymbols();

    return (
        <Group>
            {symbols}
            {orbs}
            {verticalSymbols}
            {horizontalSymbols}
        </Group>
    );
}