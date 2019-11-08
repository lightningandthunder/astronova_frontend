import React from "react";

export default function APMToggle(props) {
    // Toggle switch that flips between AM/PM
    return (
        <button onClick={props.handleAPMChange}>{props.apm}</button>
    )
}