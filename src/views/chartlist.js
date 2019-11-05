import React from 'react';

export default function ChartList(props) {
    return (
        <select onChange={props.onChange}>
            {props.charts.map( (item, index) => (
                <option value={index} key={index}>{item.name}</option>
            ))}
        </select>
    )
}