import React from 'react';

export default function LocationInput(props) {
    return(
        <input placeholder='Location' onChange={props.updateLocation}>
            </input>
    )
}