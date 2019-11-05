import React from "react";
import { Stage, Layer } from "react-konva";

import HouseNumbers from "./chartComponents/houseNumbers";
import CuspCoords from "./chartComponents/cuspCoords";
import CuspLines from "./chartComponents/cuspLines";
import Planets from "./chartComponents/planets";
import Rings from "./chartComponents/rings";
import { ScaleManager } from "../managers/ScaleManager";


export default function Chart(props) {

    if (!props.chart) {
        throw new Error("Missing chart data!")
    }

    const coords = props.chart[props.view];

    let cusps;
    let rotationalOffset;
    let cuspOffset;

    if (props.view === "ecliptical") {
        // Lock left side of chart to Ascendant
        cusps = props.chart.cusps;
        rotationalOffset = cusps["1"];
        cuspOffset = cusps["1"];
    }
    else if (props.view === "mundane") {
        cusps = {
            "1": 0, "2": 30, "3": 60, "4": 90, "5": 120, "6": 150,
            "7": 180, "8": 210, "9": 240, "10": 270, "11": 300, "12": 330
        };
        rotationalOffset = 0;
        cuspOffset = null;
    }
    else if (props.view === "right_ascension") {
        cusps = {
            "1": 0, "2": 30, "3": 60, "4": 90, "5": 120, "6": 150,
            "7": 180, "8": 210, "9": 240, "10": 270, "11": 300, "12": 330
        };
        // Lock left side of chart to 90º west of RAMC, rotating planets relative to that
        rotationalOffset = props.chart.ramc - 270 >= 0 ? props.chart.ramc - 270 : props.chart.ramc + 90;
        cuspOffset = null;
    }
    else {
        throw new Error(`Invalid view selected: ${props.view}`)
    }

    const manager = new ScaleManager();
    const scale = manager.getChartScale(props.width, props.height, "Uniwheel", props.scaleFactor);
    return (
        <div id="chart">
            <Stage width={props.width} height={props.height}>
                <Layer>
                    <Rings scale={scale} />
                    <CuspLines scale={scale} coords={coords} cusps={cusps} cuspOffset={cuspOffset} />
                    <CuspCoords scale={scale} coords={coords} cusps={cusps} cuspOffset={cuspOffset} />
                    <HouseNumbers scale={scale} coords={coords} cusps={cusps} cuspOffset={cuspOffset} />
                    <Planets scale={scale} coords={coords} rotationalOffset={rotationalOffset} />
                </Layer>
            </Stage>
        </div>
    )
}