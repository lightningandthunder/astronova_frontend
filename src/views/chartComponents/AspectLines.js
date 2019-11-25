import React from "react";
import { Line, Group } from "react-konva";
import { derivePoint } from "../../utils/geometry";
import { ASPECT_COLORS } from "../../settings";

export default function AspectLines(props) {
    const aspects = props.aspects;
    const dashedAspects = ["Tri", "Sxt"];

    const aspectLine = (aspect) => {
        if (aspect && aspect.aspectType && aspect.aspectType !== "Cnj") {
            const pos1 = props.coords[aspect.planet1];
            const pos2 = props.coords[aspect.planet2];
            console.log(aspect.planet1, aspect.aspectType, aspect.planet2)

            return (<Line key={`AspectLine-${aspect.planet1}-${aspect.planet2}`}
                points={[...derivePoint(props.scale.origin, pos1, props.scale.houseRingInnerRadius, props.rotationalOffset),
                ...derivePoint(props.scale.origin, pos2, props.scale.houseRingInnerRadius, props.rotationalOffset)]}
                stroke={ASPECT_COLORS[aspect.aspectType]}
                strokeWidth={(11 - aspect.orb) / 10}
                dash={[10, 7]}
                dashEnabled={dashedAspects.indexOf(aspect.aspectType) >= 0 ? true : false}
            />)
        }
    }


    return (
        <Group>
            {aspects.map(aspect => (
                aspectLine(aspect)
            ))}
        </Group>
    )
}