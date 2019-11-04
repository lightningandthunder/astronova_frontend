import React from "react";

import { Stage, Layer } from "react-konva";

import Houses from "./views/chartComponents/houses";
import Planets from "./views/chartComponents/planets";
import Rings from "./views/chartComponents/rings";

export default function Chart(props) {
    if (!props.chart) {
        throw new Error("Missing chart data!")
    }
    const coords = props.chart[props.view];
    let cusps;
    let rotationalOffset;
    let rotateCusps;
    const origin = { x: props.width / 2, y: props.height / 2 }


    if (props.view === "ecliptical") {
        // Lock left side of chart to Ascendant
        cusps = props.chart.cusps;
        rotationalOffset = cusps["1"];
        rotateCusps = true;
    }
    else if (props.view === "mundane") {
        cusps = null;
        rotationalOffset = 0;
        rotateCusps = false;
    }
    else if (props.view === "right_ascension") {
        cusps = null;
        // Lock left side of chart to 90º west of RAMC, rotating planets relative to that
        rotationalOffset = props.chart.ramc - 270 >= 0 ? props.chart.ramc - 270 : props.chart.ramc + 90;
        rotateCusps = false;
    }
    else {
        throw new Error(`Invalid view selected: ${props.view}`)
    }

    return (
        <div id="chart">
            <Stage width={props.width} height={props.height}>
                <Layer>
                    <Rings origin={origin} />
                    <Houses origin={origin} coords={coords} cusps={cusps} rotateCusps={rotateCusps} rotationalOffset={rotationalOffset} />
                    <Planets origin={origin} coords={coords} rotationalOffset={rotationalOffset} />
                </Layer>
            </Stage>
        </div>
    )
}