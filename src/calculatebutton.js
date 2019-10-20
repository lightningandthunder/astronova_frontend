import React from 'react';

export default class CalcButton extends React.Component {

    render() {
        return (
            <div className='calcbutton'>
                <button onClick={this.props.onClick}>
                    Calculate
                </button>
            </div>
        );
    }
}