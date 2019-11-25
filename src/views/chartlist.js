import React from 'react';
import ChartItem from "./chartItem";

export default function ChartList(props) {
    return (
        <div className="chartList">
            {props.charts.map((item, index) => (
                <ChartItem
                    value={index}
                    key={index}
                    chart={item}
                    onChangeSelectedChart={props.onChangeSelectedChart}
                    deleteChart={props.deleteChart}
                    selected={item === props.selectedChart}
                    splitCharts={props.splitCharts}
                />
            ))}
        </div>

    )
}