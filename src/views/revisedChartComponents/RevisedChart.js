import React from "react";
import { Stage, Layer, Group } from "react-konva";
import moment from "moment-timezone";

import HouseNumbers from "../chartComponents/houseNumbers";
import CuspCoords from "./CuspCoords";
import CuspLines from "./CuspLines";
import Planets from "./Planets";
import Rings from "./Rings";
import BiwheelDivider from "../chartComponents/BiwheelDivider"
import ChartInfo from "../chartComponents/ChartInfo";
import { rotateCoordinatesInRA } from "../utils/geometry";
import AspectManager from "../managers/AspectManager";
import AspectLines from "../chartComponents/AspectLines";
import UserConfig from "../../models/UserConfig";
import { RingLayerEnum, ChartViews } from "../../settings";

const DEFAULT_CUSPS = {
  "1": 0, "2": 30, "3": 60, "4": 90, "5": 120, "6": 150,
  "7": 180, "8": 210, "9": 240, "10": 270, "11": 300, "12": 330
};

export default function Chart(props) {
  /* Props:
  *
  * origin
  * scaleFactor
  * chartView
  * innerChart
  * middleChart
  * outerChart
  */

  const config = UserConfig.loadConfig();
  const chartPoints = config.getPointsForChartView(props.view);
  const isZodiacal = props.view === ChartViews.ECLIPTICAL;

  const cusps = isZodiacal
    ? this.outerChart && this.outerChart.cusps || this.innerChart.cusps
    : DEFAULT_CUSPS;

  // Lock Ascendant to left side of chart in zodiacal view
  const displayOffset = isZodiacal ? cusps["1"] : 0;

  const innerCoords = props.innerChart[props.view];
  const outerCoords = props.outerChart && props.outerChart[props.view];

  // Rotate to RAMC - 270
  if (props.view === ChartViews.RIGHT_ASCENSION) {
    innerCoords = rotateCoordinatesInRA({ ...innerCoords }, props.chart.ramc);
    if (outerCoords) {
      outerCoords = rotateCoordinatesInRA({ ...outerCoords }, props.chart.ramc);
    }
  }

  const getChartName = () => {
    return props.outerChart
      ? props.outerChart.name
      : props.innerChart.name
  };
  const getChartLocalDatetime = () => {
    return props.outerChart
      ? moment.tz(props.outerChart.local_datetime, props.outerChart.tz).toString()
      : moment.tz(props.innerChart.local_datetime, props.innerChart.tz).toString();
  };
  const getChartPlaceName = () => {
    return props.outerChart
      ? props.outerChart.placeName
      : props.innerChart.placeName
  };

  return (
    <Group>
      <ChartInfo
        name={getChartName()}
        longitude={props.innerChart.longitude}
        latitude={props.innerChart.latitude}
        localDatetime={getChartLocalDatetime()}
        placeName={getChartPlaceName()}
      />

      <Planets
        origin={props.origin}
        chartPoints={chartPoints}
        ringLayer={props.outerChart && RingLayerEnum.BIWHEEL_INNER || RingLayerEnum.UNIWHEEL}
        coords={innerCoords}
        rotationalOffset={displayOffset}
        zodiacal={isZodiacal}
      />
      {
        props.outerChart &&
        <Planets
          origin={props.origin}
          chartPoints={chartPoints}
          ringLayer={RingLayerEnum.BIWHEEL_OUTER}
          coords={outerCoords}
          rotationalOffset={displayOffset}
          zodiacal={isZodiacal}
        />
      }

      <Rings origin={props.origin} />
      <CuspLines origin={props.origin} cusps={cusps} cuspOffset={displayOffset} zodiacal={isZodiacal} />

      <CuspCoords origin={props.origin} cusps={cusps} cuspOffset={displayOffset} zodiacal={isZodiacal} />
      <HouseNumbers scale={scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
      <AspectLines scale={scale}
        aspects={new AspectManager().getAspectList(coords, coords, "Uniwheel")}
        coords={coords}
        rotationalOffset={displayOffset}
      />
    </Group>
  )

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
  }

  return (
    <div id="chart">
      <Stage width={props.width} height={props.height}>
        <Layer>
          <Group>
            <ChartInfo
              name={props.chart.name}
              longitude={props.chart.returnChart.longitude}
              latitude={props.chart.returnChart.latitude}
              local_datetime={moment.tz(props.chart.returnChart.local_datetime, props.chart.returnChart.tz).toString()}
              placeName={props.chart.placeName}
            />

            <Group>
              <Rings scale={scaleInner} />
              <CuspLines scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} zodiacal={props.view === "ecliptical"} />
              <CuspCoords scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} zodiacal={props.view === "ecliptical"} />
              <HouseNumbers scale={scaleInner} coords={coordsInner} cusps={cusps} cuspOffset={displayOffset} />
              <Planets scale={scaleInner} ringLayer={"inner"} coords={coordsInner} rotationalOffset={displayOffset} zodiacal={props.view === "ecliptical"} />
              {props.outerChart &&
                <Planets scale={scaleOuter} ringLayer={"outer"} coords={coordsOuter} rotationalOffset={displayOffset} zodiacal={props.view === "ecliptical"} />
                <BiwheelDivider scale={scaleOuter} />
              }
            </Group>
          </Group>
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