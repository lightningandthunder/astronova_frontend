import React from "react";

import { Stage, Layer } from "react-konva";

import HouseNumbers from "./views/chartComponents/houseNumbers";
import CuspCoords from "./views/chartComponents/cuspCoords";
import CuspLines from "./views/chartComponents/cuspLines";
import Planets from "./views/chartComponents/planets";
import Rings from "./views/chartComponents/rings";

export default function Chart(props) {
    if (!props.chart) {
        throw new Error("Missing chart data!")
    }
    const origin = { x: props.width / 2, y: props.height / 2 }
    const coords = props.chart[props.view];
    const scaleFactor = props.scaleFactor;

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

    return (
        <div id="chart">
            <Stage width={props.width} height={props.height}>
                <Layer>
                    <Rings scaleFactor={scaleFactor} origin={origin} />
                    <CuspLines scaleFactor={scaleFactor} origin={origin} coords={coords} cusps={cusps} cuspOffset={cuspOffset} />
                    <CuspCoords scaleFactor={scaleFactor} origin={origin} coords={coords} cusps={cusps} cuspOffset={cuspOffset} />
                    <HouseNumbers scaleFactor={scaleFactor} origin={origin} coords={coords} cusps={cusps} cuspOffset={cuspOffset} />
                    <Planets scaleFactor={scaleFactor} origin={origin} coords={coords} rotationalOffset={rotationalOffset} />
                </Layer>
            </Stage>
        </div>
    )
}