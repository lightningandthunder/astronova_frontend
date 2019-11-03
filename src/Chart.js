import React from "react";
import UniwheelChart from "./UniwheelChart";

export default function Chart(props) {
    if (!props.chart) {
        throw new Error("Missing chart data!")
    }

    const coords = props.chart[props.view];
    let cusps; 
    let rotationalOffset;
    let rotateCusps;

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
            <UniwheelChart
                width={window.innerWidth}
                height={window.innerHeight}
                cusps={cusps}
                coords={coords}
                rotationalOffset={rotationalOffset}
                rotateCusps={rotateCusps}
            />
        </div>
    )
}