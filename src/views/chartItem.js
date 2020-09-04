import React from "react";
import { WheelTypes } from "../settings";

export default function ChartItem(props) {
  return (
    <div className={`chart-item ${props.selected ? "selected" : ""}`}
      onClick={() => props.onChangeSelectedChart(props.chart)}>
      <span className="chart-name">
        {props.chart.name}
      </span>

      <div className="action-icons">
        {
          props.chart.type !== WheelTypes.UNIWHEEL &&
          <div className="icon">
            <box-icon
              name="collection"
              size="sm"
              color="white"
              onClick={() => props.splitCharts(props.chart)}>
            </box-icon>
          </div>
        }

        <div className="icon">
          <box-icon
            name="x-circle"
            size="sm"
            color="white"
            onClick={() => props.deleteChart(props.chart)}>
          </box-icon>
        </div>
      </div>
    </div>
  );
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/