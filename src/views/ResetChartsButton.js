import React from 'react';
import "../styles/ControlPanel.scss"

export default function ResetChartsButton(props) {
    return (
        <button className="btn btn-red"
            onClick={props.onClick}>
            Reset Charts
            </button>
    )
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/