import React from 'react';
import { Stage, Layer, Ring, Line } from 'react-konva';

export default function UniwheelChart(props) {

    // Based off top left corner
    const offSetX = props.width / 4;
    const offSetY = props.height / 2;

    // Establish center of the ring
    const originX = (offSetX * 2) - offSetX;
    const originY = (offSetY * 2) - offSetY;

    // Set ring radii
    const signRingOuterRadius = 250;
    const signRingInnerRadius = 220;
    const houseRingOuterRadius = 140;
    const houseRingInnerRadius = 110;

    return (
        <Stage width={props.width} height={props.height}>
            <Layer>
                <Ring id="signRing"
                    x={offSetX}
                    y={offSetY}
                    outerRadius={signRingOuterRadius}
                    innerRadius={signRingInnerRadius}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={1}
                />
                <Ring id="houseRing"
                    x={offSetX}
                    y={offSetY}
                    outerRadius={houseRingOuterRadius}
                    innerRadius={houseRingInnerRadius}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={1}
                />
            </Layer>
            <Layer>
                <Line id="cuspOne"
                    points={[originX - houseRingInnerRadius, originY, originX - signRingInnerRadius, originY]}
                    stroke={'black'}
                    strokeWidth={1}
                    lineCap={'round'}
                    lineJoin={'round'}
                />
                <Line id="cuspFour"
                    points={[originX, originY + houseRingInnerRadius, originX, originY + signRingInnerRadius]}
                    stroke={'black'}
                    strokeWidth={1}
                    lineCap={'round'}
                    lineJoin={'round'}
                />
                <Line id="cuspSeven"
                    points={[originX + houseRingInnerRadius, originY, originX + signRingInnerRadius, originY]}
                    stroke={'black'}
                    strokeWidth={1}
                    lineCap={'round'}
                    lineJoin={'round'}
                />
                <Line id="cuspNine"
                    points={[originX, originY - houseRingInnerRadius, originX, originY - signRingInnerRadius]}
                    stroke={'black'}
                    strokeWidth={1}
                    lineCap={'round'}
                    lineJoin={'round'}
                />
            </Layer>
        </Stage>
    );
}
