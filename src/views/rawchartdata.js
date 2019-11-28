import React from 'react';

// This is a temporary component used only for debugging during development.
export default function RawChartData(props) {
    return (
        <textarea
            style={{ height: '500px', width: '500px', float: "left" }}
            readOnly={true}
            value={props.chart ? JSON.stringify(props.chart) : "Nothing"}
        />
    )
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/