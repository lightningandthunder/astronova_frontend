import React from "react";
import { Stage, Layer, Group } from "react-konva";

import HouseNumbers from "./chartComponents/houseNumbers";
import CuspCoords from "./chartComponents/cuspCoords";
import CuspLines from "./chartComponents/cuspLines";
import Planets from "./chartComponents/planets";
import Rings from "./chartComponents/rings";
import BiwheelDivider from "./chartComponents/BiwheelDivider"
import { ScaleManager } from "../managers/ScaleManager";
import ChartInfo from "./chartComponents/ChartInfo";

const defaultCusps = {
    "1": 0, "2": 30, "3": 60, "4": 90, "5": 120, "6": 150,
    "7": 180, "8": 210, "9": 240, "10": 270, "11": 300, "12": 330
};

export default function Chart(props) {
    if (!props.chart)
        throw new Error("Missing cart data!")

    const manager = new ScaleManager();

    const rotateCoordinatesInRA = (coords, ramc) => {
        Object.keys(coords).forEach(k => {
            let rotated = coords[k] - (ramc - 270);
            coords[k] = rotated >= 0 ? rotated : rotated + 360;
        })
    }

    // ================== Chart display functions ==================

    const showUniwheel = () => {
        const scale = manager.getChartScale(props.width, props.height, "Uniwheel", props.scaleFactor);

        let cusps;
        let displayOffset;
        let coords = {
            ...props.chart[props.view],
            EP: props.chart.angles["Eq Asc"],
            WP: props.chart.angles["Eq Dsc"]
        };

        if (props.view === "ecliptical") {
            // Lock left side of chart to Ascendant
            cusps = props.chart.cusps;
            displayOffset = cusps["1"];
        }
        else if (props.view === "mundane") {
            cusps = defaultCusps;
            displayOffset = 0;
        }
        else if (props.view === "right_ascension") {
            cusps = defaultCusps;
            displayOffset = 0;
            rotateCoordinatesInRA(coords, props.chart.ramc); // Rotate to RAMC - 270
        }
        else {
            throw new Error(`Invalid view selected: ${props.view}`)
        }
        return (
            <Group>
                <ChartInfo
                    name={props.chart.name}
                    longitude={props.chart.longitude}
                    latitude={props.chart.latitude}
                    local_datetime={new Date(props.chart.local_datetime).toString()}
                />
                <Rings scale={scale} />
                <CuspLines scale={scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
                <CuspCoords scale={scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
                <HouseNumbers scale={scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
                <Planets scale={scale} coords={coords} rotationalOffset={displayOffset} />
            </Group>
        )
    }

    const showBiwheel = () => {
        const coordsInner = {
            ...props.chart.returnChart[props.view],
            EP: props.chart.returnChart.angles["Eq Asc"],
            WP: props.chart.returnChart.angles["Eq Dsc"]
        }
        const coordsOuter = { ...props.chart.radix[props.view] }
        const scaleInner = manager.getChartScale(props.width, props.height, "Biwheel Inner", props.scaleFactor);
        const scaleOuter = manager.getChartScale(props.width, props.height, "Biwheel Outer", props.scaleFactor);

        let cusps;
        let displayOffset;

        if (props.view === "ecliptical") {
            // Lock left side of chart to Ascendant
            cusps = props.chart.returnChart.cusps;
            displayOffset = cusps["1"];
        }
        else if (props.view === "mundane") {
            cusps = defaultCusps;
            displayOffset = 0;
        }
        else if (props.view === "right_ascension") {
            cusps = defaultCusps;
            displayOffset = 0;
            // Rotate to RAMC - 270
            rotateCoordinatesInRA(coordsInner, props.chart.returnChart.ramc);
            rotateCoordinatesInRA(coordsOuter, props.chart.returnChart.ramc);
        }
        else {
            throw new Error(`Invalid view selected: ${props.view}`)
        }
        return (
            <Group>
                <ChartInfo
                    name={props.chart.name}
                    longitude={props.chart.returnChart.longitude}
                    latitude={props.chart.returnChart.latitude}
                    local_datetime={new Date(props.chart.returnChart.local_datetime).toString()}
                />
                <Rings scale={scaleInner} />
                <CuspLines scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} />
                <CuspCoords scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} />
                <HouseNumbers scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} />
                <Planets scale={scaleInner} coords={coordsInner} rotationalOffset={displayOffset} />
                <Planets scale={scaleOuter} coords={coordsOuter} rotationalOffset={displayOffset} />
                <BiwheelDivider scale={scaleOuter} />
            </Group>
        )
    }

    return (
        <div id="chart">
            <Stage width={props.width} height={props.height}>
                <Layer>
                    {props.chart.type === "Uniwheel"
                        ? showUniwheel()
                        : showBiwheel()}
                </Layer>
            </Stage>
        </div>
    )
}