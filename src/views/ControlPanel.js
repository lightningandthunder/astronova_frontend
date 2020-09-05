import React from "react";

import ViewButtons from "./ViewButtons";
import NewChartPopup from "./modals/NewChartPopup";
import RelocatePopup from "./modals/RelocatePopup";
import ReturnChartPopup from "./modals/ReturnChartPopup";
import ChartList from "./ChartList";
import Kofi from "./ko-fi/Kofi";
import { WheelTypes } from "../settings";
import "./ControlPanel.scss";

export default function ControlPanel(props) {
  return (
    <div className="control-panel-container">
      <div className="control-panel-buttons">
        <ViewButtons
          view={props.view}
          onChangeView={props.onChangeView}
        />
        <NewChartPopup
          saveChart={props.saveChart}
          setSelectedChartToNewest={props.setSelectedChartToNewest}
        />
        <RelocatePopup
          chart={props.selectedChart}
          saveChart={props.saveChart}
          setSelectedChartToNewest={props.setSelectedChartToNewest}
          enabled={props.selectedChart}
        />
        <ReturnChartPopup
          saveChart={props.saveChart}
          setSelectedChartToNewest={props.setSelectedChartToNewest}
          selectedChart={props.selectedChart}
          enabled={props.selectedChart
            && props.selectedChart.type === WheelTypes.UNIWHEEL}
        />
        <button className="btn btn-red" onClick={props.resetCharts}>
          Reset Charts
        </button>
      </div>
      <div className="chartlist-container">
        <ChartList
          charts={props.charts ? props.charts : []}
          selectedChart={props.selectedChart}
          onChangeSelectedChart={props.onChangeSelectedChart}
          deleteChart={props.deleteChart}
          splitCharts={props.splitCharts}
          handleError={props.handleError}
        />
      </div>
      <Kofi></Kofi>
    </div>
  );
}