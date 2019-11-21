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