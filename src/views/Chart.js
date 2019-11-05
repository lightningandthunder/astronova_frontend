import React from "react";
import { Stage, Layer } from "react-konva";

import HouseNumbers from "./chartComponents/houseNumbers";
import CuspCoords from "./chartComponents/cuspCoords";
import CuspLines from "./chartComponents/cuspLines";
import Planets from "./chartComponents/planets";
import Rings from "./chartComponents/rings";
import BiwheelDivider from "./chartComponents/BiwheelDivider"
import { ScaleManager } from "../managers/ScaleManager";


export default function Chart(props) {
    const manager = new ScaleManager();
    if (!props.chart)
        throw new Error("Missing cart data!")

    const showUniwheel = () => {
        const coords = props.chart[props.view];
        const scale = manager.getChartScale(props.width, props.height, "Uniwheel", props.scaleFactor);

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

    const showBiwheel = () => {
        const coordsInner = props.chart.returnChart[props.view];
        const coordsOuter = props.chart.radix[props.view];
        const scaleInner = manager.getChartScale(props.width, props.height, "Biwheel Inner", props.scaleFactor);
        const scaleOuter = manager.getChartScale(props.width, props.height, "Biwheel Outer", props.scaleFactor);

        let cusps;
        let rotationalOffset;
        let cuspOffset;

        if (props.view === "ecliptical") {
            // Lock left side of chart to Ascendant
            cusps = props.chart.returnChart.cusps;
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
            rotationalOffset = props.chart.returnChart.ramc - 270 >= 0 ? props.chart.returnChart.ramc - 270 : props.chart.returnChart.ramc + 90;
            cuspOffset = null;
        }
        else {
            throw new Error(`Invalid view selected: ${props.view}`)
        }
        return (
            <div id="chart">
                <Stage width={props.width} height={props.height}>
                    <Layer>
                        <Rings scale={scaleInner} />
                        <CuspLines scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={cuspOffset} />
                        <CuspCoords scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={cuspOffset} />
                        <HouseNumbers scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={cuspOffset} />
                        <Planets scale={scaleInner} coords={coordsInner} rotationalOffset={rotationalOffset} />
                        <Planets scale={scaleOuter} coords={coordsOuter} rotationalOffset={rotationalOffset} />
                        <BiwheelDivider scale={scaleOuter} />
                    </Layer>
                </Stage>
            </div>
        )
    }

    return (props.chart.type === "Uniwheel"
        ? showUniwheel()
        : showBiwheel()
    )
}