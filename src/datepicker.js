import React from 'react';
import Cleave from 'cleave.js/react';

export default class Datepicker extends React.Component {
    render() {
        return (
            <div>
                <Cleave
                className="datepicker"
                onChange={this.props.onChange}
                    placeholder="YYYY-mm-dd|hh:mm (please use 24h time)"
                    options={{
                        blocks: [4, 2, 2, 2, 2],
                        delimiters: ['-', '-', 'T', ':']
                    }}
                />
            </div>
        );
    }
}