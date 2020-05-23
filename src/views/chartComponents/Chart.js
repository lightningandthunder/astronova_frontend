import React from "react";
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
import AspectsLister from "../../managers/AspectManager";
import AspectLines from "./AspectLines";
import UserConfigLoader from "../../models/UserConfigLoader";
import { RingLayerEnum, ChartViews } from "../../settings";

const DEFAULT_CUSPS = {
  "1": 0, "2": 30, "3": 60, "4": 90, "5": 120, "6": 150,
  "7": 180, "8": 210, "9": 240, "10": 270, "11": 300, "12": 330
};

export default function Chart(props) {
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
    x: props.width / 2,
    y: props.height / 2
  }

  const config = new UserConfigLoader().load();
  const chartPoints = config.getPointsForChartView(props.chartView);
  const isZodiacal = props.chartView === ChartViews.ECLIPTICAL;

  const cusps = isZodiacal
    ? (props.outerChart && props.outerChart.cusps) || props.innerChart.cusps
    : DEFAULT_CUSPS;

  // Lock Ascendant to left side of chart in zodiacal view
  const rotationalOffset = isZodiacal ? cusps["1"] : 0;

  let innerCoords = props.innerChart[props.chartView];
  let outerCoords = props.outerChart && props.outerChart[props.chartView];

  // Rotate to RAMC - 270
  if (props.chartView === ChartViews.RIGHT_ASCENSION) {
    innerCoords = rotateCoordinatesInRA({ ...innerCoords }, props.innerChart.ramc);
    if (outerCoords) {
      outerCoords = rotateCoordinatesInRA({ ...outerCoords }, props.outerChart.ramc);
    }
  }

  const propData = {
    origin: origin,
    rotationalOffset: rotationalOffset,
    isZodiacal: isZodiacal,
    scaleFactor: props.scaleFactor,
    chartPoints: chartPoints,
    cusps: cusps,
  }
  const aspectLister = new AspectsLister(config, innerCoords, outerCoords);
  const aspects = aspectLister.getAspects();

  return (
    <Stage width={props.width} height={props.height}>
      <Layer>
        <Group>
          {/* Uniwheel components */}
          <ChartInfo
            name={getChartName()}
            longitude={props.innerChart.longitude}
            latitude={props.innerChart.latitude}
            localDatetime={getChartLocalDatetime()}
            placeName={getChartPlaceName()}
            scaleFactor={props.scaleFactor}
          />

          <Planets
            ringLayer={props.outerChart ? RingLayerEnum.BIWHEEL_INNER : RingLayerEnum.UNIWHEEL}
            coords={innerCoords}
            {...propData}
          />
          <Rings
            ringLayer={props.outerChart ? RingLayerEnum.BIWHEEL_INNER : RingLayerEnum.UNIWHEEL}
            {...propData}
          />

          <CuspLines
            {...propData}
            ringLayer={props.outerChart ? RingLayerEnum.BIWHEEL_INNER : RingLayerEnum.UNIWHEEL}
          />
          <CuspCoords {...propData} />
          <HouseNumbers
            {...propData}
            ringLayer={props.outerChart ? RingLayerEnum.BIWHEEL_INNER : RingLayerEnum.UNIWHEEL}
          />

          {/* Only show aspect lines for uniwheels */}
          {
            !props.outerChart &&
            <AspectLines
              aspects={aspects}
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
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/