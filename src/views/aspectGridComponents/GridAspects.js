import React from "react";
import { Group, Text } from "react-konva";
import AspectManager from "../../managers/AspectManager";
import {
    PLANET_UNICODE,
    PLANET_COLORS,
    ASPECT_UNICODE,
    ASPECT_COLORS
} from "../../settings";

export default function GridAspects(props) {
    const globalOffsetX = props.scale.origin.x / 2.3;
    const globalOffsetY = -20;
    const planets = props.chartPoints;
    const cellEdgeSize = 48;


    const getAspects = () => {
        return new AspectManager()
            .getAspectsFromCoords(props.charts, props.angles, props.mode);
    }

    const getAspectSymbols = (aspects) => {
        const cells = [];
        let accumulator = 0;

        for (let x = 1; x <= planets.length; ++x) {
            for (let y = 1; y <= planets.length; ++y) {
                const aspect = aspects[accumulator]
                    ? aspects[accumulator].aspectType
                    : null
                cells.push(<Text
                    key={`${y}-${x}`}
                    x={globalOffsetX + (x * cellEdgeSize)}
                    y={globalOffsetY + (y * cellEdgeSize)}
                    fontSize={20}
                    stroke={ASPECT_COLORS[aspect]}
                    text={aspect ? ASPECT_UNICODE[aspect] : null}
                    offsetX={-15}
                    offsetY={2}
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

        for (let x = 1; x <= planets.length; ++x) {
            for (let y = 1; y <= planets.length; ++y) {

                // Only populate if aspectType is not null
                if (aspects[accumulator] && aspects[accumulator].aspectType) {
                    const degrees = Math.trunc(aspects[accumulator].orb);
                    let minutes = Math.trunc((aspects[accumulator].orb - degrees) * 60);

                    // Prepend 0 if minutes < 10
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    cells.push(<Text
                        key={`${y}-${x}`}
                        x={globalOffsetX + (x * cellEdgeSize)}
                        y={globalOffsetY + (y * cellEdgeSize)}
                        fontSize={13}
                        stroke={"black"}
                        text={`${degrees}\u00B0 ${minutes}'`}
                        offsetX={-8}
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

        for (let y = 0; y < planets.length; ++y) {
            cells.push(<Text
                key={`${y}-verticalPlanetSymbol`}
                x={globalOffsetX}
                y={globalOffsetY + ((y + 1) * cellEdgeSize)}
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

        for (let x = 0; x < props.chartPoints.length; ++x) {
            cells.push(<Text
                key={`${x}-horizontalPlanetSymbol`}
                x={((x + 1) * cellEdgeSize) + globalOffsetX}
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
    return (
        <Group>
            {getAspectSymbols(aspects)}
            {getAspectOrbs(aspects)}
            {getVerticalPlanetSymbols()}
            {getHorizontalPlanetSymbols()}
        </Group>
    );
}