import React from 'react';

import ChartItem from "./ChartItem";
import './ChartList.scss';


export default function ChartList(props) {
    return (
        <div className="chart-list">
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

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/