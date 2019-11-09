import React from "react";

export default function ChartItem(props) {
    return (
        <div className={props.selected ? "selectedChartItem" : ""}
            onClick={() => props.onChangeSelectedChart(props.chart)}>
            {props.chart.name}
        </div>
    );
}