import { Group, Text } from "react-konva";
import React from "react";
import { derivePoint, parseSign, degToMin } from "../../utils/geometry";
import SignImage from "./SignImage";
import { SIGN_URIS } from "../../settings";

export default function EclipticalUniwheel(props) {
    const boldCusps = [1, 4, 7, 10];
    const cusps = props.chart.cusps;
    const displayOffset = cusps["1"];
    const coords = { ...props.chart["ecliptical"] };

    if (props.chartPoints.indexOf("EP") >= 0) {
        coords["EP"] = props.chart.angles["Eq Asc"];
        coords["WP"] = props.chart.angles["Eq Dsc"];
    }


    // ================ houses and cusps ==================

    const cuspSign = (cusp, coord) => {
        const sign = parseSign(coord);
        const signUri = SIGN_URIS[sign];
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <SignImage
                key={`${cusp}-Sign`}
                image={signUri}
                coord={coord}
                x={x}
                y={y}
                width={20}
                height={20}
                stroke={"red"}
                offsetX={props.scale.cuspSignOffsetX}
                offsetY={props.scale.cuspSignOffsetY}
            />
        )
    }

    const cuspDegrees = (cusp, coord) => {
        // Cusps 7-12 need to have degrees and minutes in opposite places for readability
        const offset = cusp <= 6
            ? props.scale.cuspDegreesRotationalOffset
            : props.scale.cuspMinutesRotationalOffset
        const adjustedCoordPos = Math.trunc(coord + offset);
        const [x, y] = derivePoint(props.scale.origin, adjustedCoordPos, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${cusp}-Degrees`}
                x={x}
                y={y}
                text={`${Math.trunc(coord % 30)}\u00B0`}
                fontSize={props.scale.cuspDegreesFontSize}
                strokeWidth={1}
                offsetX={props.scale.cuspDegreesOffsetX}
                offsetY={props.scale.cuspDegreesOffsetY}
            />
        )
    }

    const cuspMins = (cusp, coord) => {
        // Cusps 7-12 need to have degrees and minutes in opposite places for readability
        const offset = cusp <= 6
            ? props.scale.cuspMinutesRotationalOffset
            : props.scale.cuspDegreesRotationalOffset
        const adjustedCoordPos = Math.trunc(coord + offset);
        const mins = degToMin(coord);
        const [x, y] = derivePoint(props.scale.origin, adjustedCoordPos, props.scale.cuspSignRadius, props.cuspOffset);
        return (
            <Text key={`${cusp}-Minutes`}
                x={x}
                y={y}
                text={`${mins}'`}
                fontSize={props.scale.cuspMinsFontSize}
                strokeWidth={1}
                offsetX={props.scale.cuspMinsOffsetX}
                offsetY={props.scale.cuspMinsOffsetY}
            />
        )
    }


    const cuspLine = (pos, cuspId) => {
        return (
            cuspId === 10
                ? <Arrow key={`${cuspId}-Line`}
                    points={[...derivePoint(props.scale.origin, pos, props.scale.houseRingInnerRadius, props.cuspOffset),
                    ...derivePoint(props.scale.origin, pos, props.scale.signRingInnerRadius, props.cuspOffset)]}
                    stroke={"black"}
                    strokeWidth={2}
                    fill={"black"} />

                : <Line key={cuspId}
                    points={[...derivePoint(props.scale.origin, pos, props.scale.houseRingInnerRadius, props.cuspOffset),
                    ...derivePoint(props.scale.origin, pos, props.scale.signRingInnerRadius, props.cuspOffset)]}
                    stroke={"black"}
                    strokeWidth={boldCusps.indexOf(cuspId) >= 0 ? 2 : 1}
                />
        )
    }

    const houseNumber = (num, coord) => {
        const [x, y] = derivePoint(props.scale.origin, coord, props.scale.houseNumberRadius, props.cuspOffset)
        return (
            <Text key={`${num}-HouseNumber`}
                x={x}
                y={y}
                text={num}
                fontSize={props.scale.houseNumberFontSize}
                strokeWidth={1}
                offsetX={props.scale.houseNumberOffsetX}
                offsetY={props.scale.houseNumberOffsetY}
            />
        )
    }

    const drawHousesAndCusps = () => {
        return (
            <Group>
                {Object.keys(props.cusps).map((cusp, index) => (
                    [cuspSign(cusp, props.cusps[index + 1]),
                    cuspDegrees(cusp, props.cusps[index + 1]),
                    cuspMins(cusp, props.cusps[index + 1])],
                    cuspLine(props.cusps[index + 1], index + 1),

                    // 1-index and wrap 13 back around to 1, i.e. 2,1; 3,2... 12,11; 1,12.
                    houseNumber(index + 1,
                        avgCoords(props.cusps[((index + 1) % 12) + 1], props.cusps[index + 1])
                    )
                ))}
            </Group>
        )
    }

    // ================ planets ==================


    const planetSymbol = (planetInfo) => {
        const [x, y] = derivePoint(props.scale.origin,
            planetInfo.renderCoord,
            props.scale.planetRadius,
            props.rotationalOffset);
        return (
            <Text key={`${planetInfo.name}-${props.ringLayer}-Symbol`}
                x={x}
                y={y}
                text={PLANET_UNICODE[planetInfo.name]}
                fontSize={
                    planetInfo.name === "EP" || planetInfo.name === "WP"
                        ? props.scale.epWPFontSize
                        : props.scale.planetFontSize
                }
                stroke={PLANET_COLORS[planetInfo.name]}
                strokeWidth={1}
                offsetX={props.scale.planetOffsetX}
                offsetY={props.scale.planetOffsetY}
            />
        )
    }

    const planetDegrees = (planetInfo) => {
        const [x, y] = derivePoint(props.scale.origin,
            planetInfo.renderCoord,
            props.scale.planetDegreeRadius,
            props.rotationalOffset);
        return (
            <Text key={`${planetInfo.name}-${props.ringLayer}-Degrees`}
                x={x}
                y={y}
                text={`${Math.trunc(planetInfo.rawCoord) % 30}\u00B0`}
                fontSize={props.scale.planetDegreesFontSize}
                strokeWidth={1}
                offsetX={props.scale.planetDegreesOffsetX}
                offsetY={props.scale.planetDegreesOffsetY}
            />
        )
    }

    const planetSign = (planetInfo) => {
        const sign = parseSign(planetInfo.rawCoord);
        const signUri = SIGN_URIS[sign];
        const [x, y] = derivePoint(props.scale.origin,
            planetInfo.renderCoord,
            props.scale.planetSignRadius,
            props.rotationalOffset);
        return (
            <SignImage
                key={`${planetInfo.name}-${props.ringLayer}-Sign`}
                coord={planetInfo.rawCoord}
                image={signUri}
                x={x}
                y={y}
                width={20}
                height={20}
            />
        )
    }


    const planetMinutes = (planetInfo) => {
        const mins = degToMin(planetInfo.rawCoord)
        const [x, y] = derivePoint(props.scale.origin,
            planetInfo.renderCoord,
            props.scale.planetMinuteRadius,
            props.rotationalOffset);
        return (
            <Text key={`${planetInfo.name}-${props.ringLayer}-Minutes`}
                x={x}
                y={y}
                text={`${mins}'`}
                fontSize={props.scale.planetMinutesFontSize}
                strokeWidth={1}
                offsetX={props.scale.planetMinutesOffsetX}
                offsetY={props.scale.planetMinutesOffsetY}
            />
        )
    }

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

    const drawPlanets = () => {
        return (
            <Group>
                {Object.keys(props.coords).map((planet) => (
                    planetSymbol(planet),
                    planetDegrees(planet),
                    planetSign(planet),
                    planetMinutes(planet),
                    locationMarker(planet)
                ))}
            </Group>
        )
    }

    const drawRings = () => {
        return (
            <Group>
                <Ring id="signRing"
                    x={props.scale.origin.x}
                    y={props.scale.origin.y}
                    outerRadius={props.scale.signRingOuterRadius}
                    innerRadius={props.scale.signRingInnerRadius}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={1}
                />
                <Ring id="houseRing"
                    x={props.scale.origin.x}
                    y={props.scale.origin.y}
                    outerRadius={props.scale.houseRingOuterRadius}
                    innerRadius={props.scale.houseRingInnerRadius}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={1}
                />
            </Group>
        )
    }


    return (
        <Group>
            <Rings scale={props.scale} />
            <CuspLines scale={props.scale} coords={props.coords} cusps={cusps} cuspOffset={displayOffset} />
            <CuspCoords scale={props.scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
            <HouseNumbers scale={props.scale} coords={coords} cusps={cusps} cuspOffset={displayOffset} />
            <Planets scale={props.scale} ringLayer={"outer"} coords={coords} rotationalOffset={displayOffset} />
            <PlanetLocationMarker scale={props.scale} ringLayer={"outer"} coords={coords} rotationalOffset={displayOffset} />
            <AspectLines scale={props.scale}
                aspects={new AspectManager().getAspectList(coords, coords, "Uniwheel")}
                coords={coords}
                rotationalOffset={displayOffset}
            />
        </Group>
    )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/