import React from 'react';
import { Stage, Layer, Ring, Line, Text, Group } from 'react-konva';

import { toRads } from './utils/geometry';

export default function UniwheelChart(props) {
    if (!props.coords) {
        throw new Error("No coordinates given!");
    }

    // Establish center of the ring
    const originX = props.width / 4;
    const originY = props.height / 2;

    // Set ring radii
    const signRingOuterRadius = 300;
    const signRingInnerRadius = 270;
    const houseRingOuterRadius = 170;
    const houseRingInnerRadius = 140;

    // House positions
    const ONE = props.cusps ? props.cusps["1"] : 0
    const TWO = props.cusps ? props.cusps["2"] : 30
    const THREE = props.cusps ? props.cusps["3"] : 60
    const FOUR = props.cusps ? props.cusps["4"] : 90
    const FIVE = props.cusps ? props.cusps["5"] : 120
    const SIX = props.cusps ? props.cusps["6"] : 150
    const SEVEN = props.cusps ? props.cusps["7"] : 180
    const EIGHT = props.cusps ? props.cusps["8"] : 210
    const NINE = props.cusps ? props.cusps["9"] : 240
    const TEN = props.cusps ? props.cusps["10"] : 270
    const ELEVEN = props.cusps ? props.cusps["11"] : 300
    const TWELVE = props.cusps ? props.cusps["12"] : 330

    // Calculate any point on the circle with an angle ("position") and circle radius
    const point = (pos, radius, rotationalOffset = props.rotationalOffset) => {
        const angleRotated = pos - rotationalOffset;
        const angleNormalized = angleRotated >= 0 ? toRads(angleRotated) : toRads(angleRotated + 360);

        // Mirror across Y axis; 0 begins at left side for us, not right side.
        const x = originX + (-1 * radius * Math.cos(angleNormalized));
        const y = originY + (radius * Math.sin(angleNormalized));

        return [x, y];
    }

    /* ================= Chart points ================= */

    const cusp = (cuspNum, cuspId) => {
        const rotationalOffset = props.rotateCusps ? props.rotationalOffset : 0
        return (
            <Line id={cuspId}
                points={[...point(cuspNum, houseRingInnerRadius, rotationalOffset), ...point(cuspNum, signRingInnerRadius, rotationalOffset)]}
                stroke={'black'}
                strokeWidth={1}
                lineCap={'round'}
                lineJoin={'round'}
            />
        )
    }

    const planet = (p, coord) => {
        let color;
        if (p === 'Sun')
            color = 'yellow';
        else if (p === 'Moon')
            color = 'silver';
        else if (p === 'Mercury')
            color = 'orange';
        else if (p === 'Venus')
            color = 'green';
        else if (p === 'Mars')
            color = 'red';
        else if (p === 'Jupiter')
            color = 'purple';
        else if (p === 'Saturn')
            color = 'indigo';
        else if (p === 'Uranus')
            color = 'blue';
        else if (p === 'Neptune')
            color = 'cyan';
        else if (p === 'Pluto')
            color = 'black';

        return (
            <Group>
                <Ring
                    x={point(coord, signRingInnerRadius)[0]}
                    y={point(coord, signRingInnerRadius)[1]}
                    outerRadius={10}
                    innerRadius={5}
                    fill={'white'}
                    stroke={color}
                    strokeWidth={1}
                />
                <Text
                    x={point(coord, signRingInnerRadius)[0]}
                    y={point(coord, signRingInnerRadius)[1]}
                    text={p}
                />
            </Group>
        )
    }

    return (
        <Stage width={props.width} height={props.height}>
            <Layer>
                <Ring id="signRing"
                    x={originX}
                    y={originY}
                    outerRadius={signRingOuterRadius}
                    innerRadius={signRingInnerRadius}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={1}
                />
                <Ring id="houseRing"
                    x={originX}
                    y={originY}
                    outerRadius={houseRingOuterRadius}
                    innerRadius={houseRingInnerRadius}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={1}
                />
            </Layer>
            <Layer>
                {cusp(ONE, "cuspOne")}
                {cusp(TWO, "cuspTwo")}
                {cusp(THREE, "cuspThree")}
                {cusp(FOUR, "cuspFour")}
                {cusp(FIVE, "cuspFive")}
                {cusp(SIX, "cuspSix")}
                {cusp(SEVEN, "cuspSeven")}
                {cusp(EIGHT, "cuspEight")}
                {cusp(NINE, "cuspNine")}
                {cusp(TEN, "cuspTen")}
                {cusp(ELEVEN, "cuspEleven")}
                {cusp(TWELVE, "cuspTwelve")}
            </Layer>
            <Layer>
                {planet("Sun", props.coords["Sun"])}
                {planet("Moon", props.coords["Moon"])}
                {planet("Mercury", props.coords["Mercury"])}
                {planet("Venus", props.coords["Venus"])}
                {planet("Mars", props.coords["Mars"])}
                {planet("Jupiter", props.coords["Jupiter"])}
                {planet("Saturn", props.coords["Saturn"])}
                {planet("Uranus", props.coords["Uranus"])}
                {planet("Neptune", props.coords["Neptune"])}
                {planet("Pluto", props.coords["Pluto"])}
            </Layer>
        </Stage>
    );
}
