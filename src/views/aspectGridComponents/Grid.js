import React from "react";
import { Group, Rect } from "react-konva";

export default function Grid(props) {
    const globalOffsetX = props.scale.origin.x / 2.3;
    const globalOffsetY = -30;
    const cellEdgeSize = 48;

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