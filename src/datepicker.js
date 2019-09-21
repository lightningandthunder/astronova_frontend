import React from 'react';
import Cleave from 'cleave.js/react';

export default class Datepicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }

    render() {
        return (
            <div className="datepicker">
                <Cleave
                    placeholder="YYYY-mm-dd"
                    options={{
                        date: true,
                        datePattern: ['Y', 'm', 'd'],
                        delimiter: '-',
                    }}
                />
            </div>
        );
    }
}