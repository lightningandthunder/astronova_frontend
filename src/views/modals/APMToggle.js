import React from "react";

export default function APMToggle(props) {
    // Toggle switch that flips between AM/PM
    return (
        <button onClick={props.handleAPMChange}>{props.apm}</button>
    )
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/