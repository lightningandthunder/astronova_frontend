import React, { useState, useEffect } from "react";
import { Stage, Group, Layer } from "react-konva";
import moment from "moment-timezone";

import HouseNumbers from "./HouseNumbers";
import CuspCoords from "./CuspCoords";
import CuspLines from "./CuspLines";
import Planets from "./Planets";
import Rings from "./Rings";
import BiwheelDivider from "./BiwheelDivider"
import ChartInfo from "./ChartInfo";
import { rotateCoordinatesInRA } from "../../utils/geometry";
import AspectLines from "./AspectLines";
import { RingLayerEnum, ChartViews } from "../../settings";
import UserConfig from "../../models/UserConfig";
import AspectPanel from "../AspectPanel";

const DEFAULT_CUSPS = {
  "1": 0, "2": 30, "3": 60, "4": 90, "5": 120, "6": 150,
  "7": 180, "8": 210, "9": 240, "10": 270, "11": 300, "12": 330
};

export default function Chart(props) {
  // Use 80% of the window width if the window is wide enough to have a side panel
  const calcStageWidth = () => window.innerWidth < 992 ? window.innerWidth : window.innerWidth * 0.8;

  // Diameter of the chart, with padding
  const defaultScaleFactor = Math.min(window.innerHeight / 680, window.innerWidth / 680);

  const [scaleFactor, setScaleFactor] = useState(defaultScaleFactor)
  const [width, setWidth] = useState(calcStageWidth());
  const [height, setHeight] = useState(window.innerHeight);

  const setDimensions = () => {
    setWidth(calcStageWidth());
    setHeight(window.innerHeight);
    setScaleFactor(defaultScaleFactor);
  };

  useEffect(() => {
    window.addEventListener("resize", setDimensions);
    return () => window.removeEventListener("resize", setDimensions);
  });

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

  const origin = {
    x: width / 2,
    y: height / 2
  }

  const config = UserConfig.loadConfig();
  const chartPoints = config.getPointsForChartView(props.view);
  const isZodiacal = props.view === ChartViews.ECLIPTICAL;

  const cusps = isZodiacal
    ? (props.outerChart && props.outerChart.cusps) || props.innerChart.cusps
    : DEFAULT_CUSPS;

  // Lock Ascendant to left side of chart in zodiacal view
  const rotationalOffset = isZodiacal ? cusps["1"] : 0;

  let innerCoords = props.innerChart[props.view];
  let outerCoords = props.outerChart && props.outerChart[props.view];

  // Rotate to RAMC - 270
  if (props.view === ChartViews.RIGHT_ASCENSION) {
    innerCoords = rotateCoordinatesInRA({ ...innerCoords }, props.innerChart.ramc);
    if (outerCoords) {
      outerCoords = rotateCoordinatesInRA({ ...outerCoords }, props.outerChart.ramc);
    }
  }

  const propData = {
    origin: origin,
    rotationalOffset: rotationalOffset,
    isZodiacal: isZodiacal,
    scaleFactor: scaleFactor,
    chartPoints: chartPoints,
    cusps: cusps,
  };

  return (
    <div>
      <Stage width={width} height={height} className="chart">
        <Layer>
          <Group>
            {/* Uniwheel components */}
            <ChartInfo
              name={getChartName()}
              longitude={props.innerChart.longitude}
              latitude={props.innerChart.latitude}
              localDatetime={getChartLocalDatetime()}
              placeName={getChartPlaceName()}
              scaleFactor={scaleFactor}
            />
            <Rings
              ringLayer={props.outerChart ? RingLayerEnum.BIWHEEL_INNER : RingLayerEnum.UNIWHEEL}
              {...propData}
            />
            <Planets
              ringLayer={props.outerChart ? RingLayerEnum.BIWHEEL_INNER : RingLayerEnum.UNIWHEEL}
              coords={innerCoords}
              {...propData}
            />

            <CuspLines
              {...propData}
              ringLayer={props.outerChart ? RingLayerEnum.BIWHEEL_INNER : RingLayerEnum.UNIWHEEL}
            />
            <CuspCoords
              {...propData}
            />
            <HouseNumbers
              {...propData}
              ringLayer={props.outerChart ? RingLayerEnum.BIWHEEL_INNER : RingLayerEnum.UNIWHEEL}
            />

            {/* Only show aspect lines for uniwheels */}
            {
              !props.outerChart &&
              <AspectLines
                aspects={props.aspects}
                coords={innerCoords}
                {...propData}
              />
            }

            {/* Biwheel-specific components */}
            {
              props.outerChart &&
              <Group>
                <BiwheelDivider {...propData} />
                <Planets ringLayer={RingLayerEnum.BIWHEEL_OUTER} coords={outerCoords} {...propData} />
              </Group>
            }
          </Group>
        </Layer>
      </Stage>
    </div>
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019 Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/