import React from 'react';

export default class CalcButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='calcbutton'>
                <button onClick={this.props.onclick}>
                    Calculate
                </button>
            </div>
        );
    }
}