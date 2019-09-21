import React from 'react';
import Cleave from 'cleave.js/react';

export default class Timepicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: ''}
    }

    onChange(event) {
        this.setState({time: event.value})
    }


    render() {
        return (
            <div className="timepicker">
                <Cleave
                    placeholder="hh-mm-ss"
                    options={{
                        time: true,
                        timePattern: ['h', 'm', 's'],
                        delimiter: '-',
                    }}
                    onChange={this.onChange.bind(this)}
                />
            </div>
        );
    }
}