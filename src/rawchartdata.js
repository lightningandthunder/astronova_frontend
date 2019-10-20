import React from 'react';

export default function RawChartData(props) {
    return(
        <textarea style={{height: '500px', width: '500px'}} readOnly={true} value={props.chart ? JSON.stringify(props.chart) : "Nothing"} />
    )
}