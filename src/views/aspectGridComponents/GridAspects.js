import React from "react";
import { Group, Text } from "react-konva";
import AspectManager from "../../managers/AspectManager";
import { PLANET_UNICODE, PLANET_COLORS } from "../../settings";

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
        return aspectList;
    }

    const getAspectSymbols = (aspects) => {
        const cells = [];
        let accumulator = 0;

        for (let x = 1; x < planets.length; ++x) {
            for (let y = x; y < planets.length; ++y) {
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

    const getAspectOrbs = (aspects) => {
        const cells = [];
        let accumulator = 0;

        for (let x = 1; x < planets.length; ++x) {
            for (let y = x; y < planets.length; ++y) {
                if (aspects[accumulator] && aspects[accumulator].aspectType) {
                    const degrees = Math.trunc(aspects[accumulator].orb);
                    const minutes = Math.trunc((aspects[accumulator].orb - degrees) * 60)
                    cells.push(<Text
                        key={`${y}-${x}`}
                        x={x * 50}
                        y={y * 50}
                        fontSize={9}
                        stroke={"black"}
                        text={`${degrees}\u00B0 ${minutes}'`}
                        offsetX={-13}
                        offsetY={-30}
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
        for (let y = 1; y < planets.length; ++y) {
            // TODO: y = uniwheel ? x : 0; step over and down each iteration on uniwheel
            cells.push(<Text
                key={`${y}`}
                x={0}
                y={y * 50}
                fontSize={14}
                stroke={PLANET_COLORS[planets[y]]}
                text={`${PLANET_UNICODE[planets[y]]}`}
                offsetX={-20}
                offsetY={-20}
                strokeWidth={1}
            />);
        }
        return cells;
    }

    const getHorizontalPlanetSymbols = () => {
        const cells = [];
        for (let x = 0; x < planets.length; ++x) {
            // TODO: y = uniwheel ? x : 0; step over and down each iteration on uniwheel
            cells.push(<Text
                key={`${x}`}
                x={(x + 1) * 50}
                y={0}
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

    const aspects = getAspects(props.chart);
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