import React from "react";
import { Line, Group } from "react-konva";
import { derivePoint } from "../../utils/geometry";

export default function PlanetLocationMarker(props) {
    const locationMarker = (planet) => {
        const pos = props.coords[planet]
        return (
            <Line key={`PlanetMarker-${planet}-${props.ringLayer}`}
                points={[...derivePoint(props.scale.origin, pos, props.scale.planetMarkerOutsideRadius, props.rotationalOffset),
                ...derivePoint(props.scale.origin, pos, props.scale.planetMarkerInsideRadius, props.rotationalOffset)]}
                stroke={"black"}
                strokeWidth={1}
            />
        )
    }

    return (
        <Group>
            {Object.keys(props.coords).map((coord) => (
                locationMarker(coord)
            ))}
        </Group>
    )
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/
