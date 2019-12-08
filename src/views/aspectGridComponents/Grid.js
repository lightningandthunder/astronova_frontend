import React from "react";
import { Group, Rect } from "react-konva";

export default function Grid(props) {
    const baseCellEdgeSize = 48;

    const bottomRowLength = (props.chartPoints.length + 1) * baseCellEdgeSize;
    const allottedWidth = props.scale.signRingOuterRadius * 2;
    const gridAdjustFactor = bottomRowLength > allottedWidth
        ? bottomRowLength / allottedWidth
        : 1;

    const cellEdgeSize = baseCellEdgeSize / gridAdjustFactor;
    const globalOffsetX = 0;

    // Move everything down by aboutt 2 cells or to just underneath the chart info text,
    // whichever is greater
    const defaultYOffset = (cellEdgeSize * 2) + 10;
    const globalOffsetY = defaultYOffset >= 75 ? defaultYOffset : 75;

    const getGridCells = (mode) => {
        const cells = [];
        for (let y = 1; y <= props.chartPoints.length; ++y) {
            // For uniwheel, cells per row = row number. For biwheel, made a square grid.
            const horizontalLimit = mode === "Uniwheel"
                ? y
                : props.chartPoints.length;

            for (let x = 1; x <= horizontalLimit; ++x) {
                cells.push(<Rect
                    key={`Cell-${y}-${x}`}
                    x={globalOffsetX + (x * cellEdgeSize)}
                    y={globalOffsetY + (y * cellEdgeSize)}
                    height={cellEdgeSize}
                    width={cellEdgeSize}
                    stroke={"black"}

                    // Gray-out cells corresponding to same planet on X and Y
                    fill={mode === "Uniwheel" && x === y ? "silver" : "white"}
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

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/