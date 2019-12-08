import React from "react";
import { Stage, Layer, Group } from "react-konva";
import moment from "moment-timezone";

import HouseNumbers from "./chartComponents/houseNumbers";
import CuspCoords from "./chartComponents/cuspCoords";
import CuspLines from "./chartComponents/cuspLines";
import Planets from "./chartComponents/planets";
import Rings from "./chartComponents/rings";
import BiwheelDivider from "./chartComponents/BiwheelDivider"
import { ScaleManager } from "../managers/ScaleManager";
import ChartInfo from "./chartComponents/ChartInfo";
import { rotateCoordinatesInRA } from "../utils/geometry";
import Grid from "./aspectGridComponents/Grid";
import GridAspects from "./aspectGridComponents/GridAspects";
import PlanetLocationMarker from "./chartComponents/PlanetLocationMarker";
import AspectManager from "../managers/AspectManager";
import AspectLines from "./chartComponents/AspectLines";
import UserConfigManager from "../managers/UserConfigManager";

const defaultCusps = {
    "1": 0, "2": 30, "3": 60, "4": 90, "5": 120, "6": 150,
    "7": 180, "8": 210, "9": 240, "10": 270, "11": 300, "12": 330
};

export default function Chart(props) {
    if (!props.chart)
        throw new Error("Missing chart data!");

    const scaleManager = new ScaleManager();
    const configManager = new UserConfigManager();


    // ================== Chart display functions ==================

    const showUniwheel = () => {
        const scale = scaleManager.getChartScale(props.width, props.height, "Uniwheel", props.scaleFactor);
        let cusps;
        let displayOffset;
        let coords;
        let chartPoints;

        if (props.view === "ecliptical") {
            // Lock left side of chart to Ascendant
            cusps = props.chart.cusps;
            displayOffset = cusps["1"];
            coords = {
                ...props.chart[props.view],
                EP: props.chart.angles["Eq Asc"],
            };
            chartPoints = configManager.getChartPointsEcliptical();
        }
        else if (props.view === "mundane") {
            cusps = defaultCusps;
            displayOffset = 0;
            coords = props.chart[props.view];
            chartPoints = configManager.getChartPointsMundane();
        }
        else if (props.view === "right_ascension") {
            cusps = defaultCusps;
            displayOffset = 0;
            coords = props.chart[props.view];
            chartPoints = configManager.getChartPointsRightAscension();

            // Rotate to RAMC - 270
            coords = rotateCoordinatesInRA({ ...coords }, props.chart.ramc);
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
                    local_datetime={moment.tz(props.chart.local_datetime, props.chart.tz).toString()}
                    placeName={props.chart.placeName}
                />
                {/* =========== Chart View ========== */}
                {
                    props.mode === "chart" &&
                    <Group>
                        <Rings scale={scale} />
                        <CuspLines scale={scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
                        <CuspCoords scale={scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
                        <HouseNumbers scale={scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
                        <Planets scale={scale} ringLayer={"outer"} coords={coords} rotationalOffset={displayOffset} />
                        <PlanetLocationMarker scale={scale} ringLayer={"outer"} coords={coords} rotationalOffset={displayOffset} />
                        <AspectLines scale={scale}
                            aspects={new AspectManager().getAspectList(coords, coords, "Uniwheel")}
                            coords={coords}
                            rotationalOffset={displayOffset}
                        />
                    </Group>
                }

                {/* ======== Aspect Grid View ======== */}
                {
                    props.mode === "aspectGrid" &&
                    <Group>
                        <Grid scale={scale}
                            chart={coords}
                            chartPoints={chartPoints}
                            mode="Uniwheel"
                        />
                        <GridAspects scale={scale}
                            charts={[coords]}
                            chartPoints={chartPoints}
                            angles={[props.chart.angles]}
                            mode="Uniwheel"
                        />
                    </Group>
                }
            </Group>
        )
    }

    const showBiwheel = () => {
        let coordsInner;
        let coordsOuter;
        const scaleInner = scaleManager.getChartScale(props.width, props.height, "Biwheel Inner", props.scaleFactor);
        const scaleOuter = scaleManager.getChartScale(props.width, props.height, "Biwheel Outer", props.scaleFactor);

        let cusps;
        let displayOffset;
        let chartPoints;

        if (props.view === "ecliptical") {
            // Lock left side of chart to Ascendant
            cusps = props.chart.returnChart.cusps;
            displayOffset = cusps["1"];
            coordsOuter = {
                ...props.chart.returnChart[props.view],
                EP: props.chart.returnChart.angles["Eq Asc"],
            };
            coordsInner = {
                ...props.chart.radix[props.view],
                EP: props.chart.radix.angles["Eq Asc"],
            };
            chartPoints = configManager.getChartPointsEcliptical();
        }
        else if (props.view === "mundane") {
            cusps = defaultCusps;
            displayOffset = 0;
            coordsOuter = props.chart.returnChart[props.view];
            coordsInner = { ...props.chart.radix[props.view] };
            chartPoints = configManager.getChartPointsMundane();
        }
        else if (props.view === "right_ascension") {
            cusps = defaultCusps;
            displayOffset = 0;
            // Rotate to RAMC - 270
            coordsOuter = rotateCoordinatesInRA(
                { ...props.chart.returnChart[props.view] },
                props.chart.returnChart.ramc
            );
            coordsInner = rotateCoordinatesInRA(
                { ...props.chart.radix[props.view] },
                props.chart.returnChart.ramc
            );
            chartPoints = configManager.getChartPointsRightAscension();
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
                    local_datetime={moment.tz(props.chart.returnChart.local_datetime, props.chart.returnChart.tz).toString()}
                    placeName={props.chart.placeName}
                />
                {/* =========== Chart View ========== */}
                {
                    props.mode === "chart" &&
                    <Group>
                        <Rings scale={scaleInner} />
                        <CuspLines scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} />
                        <CuspCoords scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} />
                        <HouseNumbers scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} />
                        <Planets scale={scaleInner} ringLayer={"inner"} coords={coordsInner} rotationalOffset={displayOffset} />
                        <Planets scale={scaleOuter} ringLayer={"outer"} coords={coordsOuter} rotationalOffset={displayOffset} />
                        <BiwheelDivider scale={scaleOuter} />
                        <PlanetLocationMarker scale={scaleInner} ringLayer={"inner"} coords={coordsInner} rotationalOffset={displayOffset} />
                        <PlanetLocationMarker scale={scaleOuter} ringLayer={"outer"} coords={coordsOuter} rotationalOffset={displayOffset} />
                    </Group>
                }
                {/* ======== Aspect Grid View ======== */}
                {
                    props.mode === "aspectGrid" &&
                    <Group>
                        <Grid scale={scaleInner}
                            chart={coordsInner}
                            chartPoints={chartPoints}
                            mode="Biwheel"
                        />
                        <GridAspects scale={scaleInner}
                            charts={[coordsInner, coordsOuter]}
                            angles={[props.chart.radix.angles, props.chart.returnChart.angles]}
                            chartPoints={chartPoints}
                        />
                    </Group>
                }
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

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/