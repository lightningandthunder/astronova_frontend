import React from "react";

export default function ChartItem(props) {
    return (
        <div className={props.selected ? "selectedChartItem" : "unselectedChartItem"}
            onClick={() => props.onChangeSelectedChart(props.chart)}>
            {props.chart.name}

            <button
                id={props.chart.name}
                className="ChartDeleteButton"
                onClick={() => props.deleteChart(props.chart)}
            >
                del
            </button>
        </div>
    );
}