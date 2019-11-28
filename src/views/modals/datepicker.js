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

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/