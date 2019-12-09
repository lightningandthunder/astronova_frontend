import React from "react";
import { Group, Text } from "react-konva";
import AspectManager from "../../managers/AspectManager";
import {
    PLANET_UNICODE,
    PLANET_COLORS,
    ASPECT_UNICODE,
    ASPECT_COLORS
} from "../../settings";
import "../../styles/index.css";
import logIfDebug from "../../utils/logIfDebug";

export default function GridAspects(props) {
    // Note that this component, along with the Grid component, are
    // written in the original style I was using: simply multiplying values
    // by the scale factor in-place, rather than calculating them ahead of time.
    // I'm not sure what makes more sense.

    const baseCellEdgeSize = 48;

    const bottomRowLength = (props.chartPoints.length + 1) * baseCellEdgeSize;
    const allottedWidth = props.scale.signRingOuterRadius * 2;
    const gridAdjustFactor = bottomRowLength > allottedWidth
        ? bottomRowLength / allottedWidth
        : 1;

    const cellEdgeSize = baseCellEdgeSize / gridAdjustFactor;

    const globalOffsetX = 0;
    // Move everything down by about 2 cells or to just underneath the chart info text,
    // whichever is greater
    const defaultYOffset = cellEdgeSize * 2 + 10;
    const globalOffsetY = defaultYOffset >= 75 ? defaultYOffset : 75;


    const planets = props.chartPoints;

    const getAspects = () => {
        return new AspectManager()
            .getAspectsFromCoords(props.charts, props.angles, props.mode);
    }

    const getAspectSymbols = (aspects) => {
        const cells = [];
        let accumulator = 0;

        for (let x = 1; x <= planets.length; ++x) {
            for (let y = 1; y <= planets.length; ++y) {
                const aspect = aspects[accumulator] && aspects[accumulator].aspectType;
                cells.push(<Text
                    key={`${y}-${x}`}
                    x={globalOffsetX + (x * cellEdgeSize)}
                    y={globalOffsetY + (y * cellEdgeSize)}
                    fontFamily={"AstroDotBasic"}
                    fontSize={20 * props.scale.scaleFactor}
                    stroke={ASPECT_COLORS[aspect]}
                    text={aspect ? ASPECT_UNICODE[aspect] : null}
                    offsetY={(cellEdgeSize / -16)}
                    // Not quite half a cell to the right
                    offsetX={cellEdgeSize / -2.8}
                    strokeWidth={1 * props.scale.scaleFactor}
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
                        fontSize={11 * props.scale.scaleFactor}
                        stroke={"black"}
                        text={`${degrees}\u00B0 ${minutes}'`}
                        offsetX={(cellEdgeSize / -6)}
                        offsetY={cellEdgeSize / -1.5}
                        strokeWidth={1 * props.scale.scaleFactor}
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
                fontSize={14 * props.scale.scaleFactor}
                stroke={PLANET_COLORS[planets[y]]}
                text={`${PLANET_UNICODE[planets[y]]}`}
                offsetX={(cellEdgeSize / -6) * props.scale.scaleFactor}
                offsetY={(cellEdgeSize / -4) * props.scale.scaleFactor}
                strokeWidth={1 * props.scale.scaleFactor}
            />);
        }
        return cells;
    }

    const getHorizontalPlanetSymbols = () => {
        const cells = [];

        for (let x = 0; x < props.chartPoints.length; ++x) {
            cells.push(<Text
                key={`${x}-horizontalPlanetSymbol`}
                x={(globalOffsetX + (x + 1) * cellEdgeSize)}
                y={globalOffsetY}
                fontSize={14 * props.scale.scaleFactor}
                stroke={PLANET_COLORS[planets[x]]}
                text={`${PLANET_UNICODE[planets[x]]}`}
                offsetX={(cellEdgeSize / -4) * props.scale.scaleFactor}
                offsetY={(cellEdgeSize / -6) * props.scale.scaleFactor}
                strokeWidth={1 * props.scale.scaleFactor}
            />);
        }
        return cells;
    }

    const aspects = getAspects();
    logIfDebug("Aspects: ", aspects);
    return (
        <Group>
            {getAspectSymbols(aspects)}
            {getAspectOrbs(aspects)}
            {getVerticalPlanetSymbols()}
            {getHorizontalPlanetSymbols()}
        </Group>
    );
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/