import React from "react";

export default function ModeButtons(props) {
    return (
        <div className="ModeButtons">
            <input type="radio"
                id="chart"
                value="chart"
                checked={props.mode === "chart"}
                onChange={props.onChangeMode}
            />
            <label>Chart</label>
            <input type="radio"
                id="aspectGrid"
                value="aspectGrid"
                checked={props.mode === "aspectGrid"}
                onChange={props.onChangeMode}
            />
            <label>Aspect Grid</label>
        </div>
    )
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/