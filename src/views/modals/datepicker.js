import React from 'react';
import Cleave from 'cleave.js/react';

export default function Datepicker(props) {
    return (
        <div>
            <Cleave
                className="datepicker"
                onChange={props.onChange}
                placeholder={props.hourAndMinute ? "YYYY-mm-dd|hh:mm" : "YYYY-mm-dd"}
                options={{
                    blocks: props.hourAndMinute ? [4, 2, 2, 2, 2] : [4, 2, 2],
                    delimiters: props.hourAndMinute ? ['-', '-', 'T', ':'] : ['-', '-']
                }}
            />
        </div>
    );
}