import React from "react";

import ViewButtons from "./ViewButtons";
import NewChartPopup from "./modals/NewChartPopup";
import RelocatePopup from "./modals/RelocatePopup";
import ReturnChartPopup from "./modals/ReturnChartPopup";
import Chartlist from "./chartlist";
import Kofi from "./ko-fi/Kofi";
import { WheelTypes } from "../settings";
import "../styles/ControlPanel.scss";

export default function ControlPanel(props) {
  return (
    <div className="ControlPanel">
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
      <button
        className={"ResetChartsButton"}
        onClick={props.resetCharts}
      >
        Reset Charts
      </button>
      <Chartlist
        charts={props.charts ? props.charts : []}
        selectedChart={props.selectedChart}
        onChangeSelectedChart={props.onChangeSelectedChart}
        deleteChart={props.deleteChart}
        splitCharts={props.splitCharts}
        handleError={props.handleError}
      />
      <Kofi></Kofi>
    </div>
  );
}