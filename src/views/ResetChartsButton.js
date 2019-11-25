import React from 'react';

export default function ResetChartsButton(props) {
    return (
        <button className={"ResetChartsButton"}
            onClick={props.onClick}>
            Reset Charts
            </button>
    )
}