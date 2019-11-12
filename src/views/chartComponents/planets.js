import React from "react";
import { Text, Group } from "react-konva";

import { derivePoint, parseSign, degToMin, fixOverlap } from "../../utils/geometry";
import { PLANET_COLORS, PLANET_UNICODE, SIGN_URIS } from "../../settings";
import PlanetCoords from "../../models/PlanetCoords";
import SignImage from "./SignImage";


export default function Planets(props) {
    const adjustedCoords = fixOverlap(new PlanetCoords(props.coords));

    const planetSymbol = (planetInfo) => {
        const [x, y] = derivePoint(props.scale.origin, planetInfo.renderCoord, props.scale.planetRadius, props.rotationalOffset)
        return (
            <Text key={`${planetInfo.name}-Symbol`}
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
        const [x, y] = derivePoint(props.scale.origin, planetInfo.renderCoord, props.scale.planetDegreeRadius, props.rotationalOffset);
        return (
            <Text key={`${planetInfo.name}-Degrees`}
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
        const [x, y] = derivePoint(props.scale.origin, planetInfo.renderCoord, props.scale.planetSignRadius, props.rotationalOffset);
        return (
            <SignImage
                key={`${planetInfo.name}-Sign`}
                image={signUri}
                x={x}
                y={y}
                width={20}
                height={20}
                stroke={"red"}
            />

        )
    }


    const planetMinutes = (planetInfo) => {
        const mins = degToMin(planetInfo.rawCoord)
        const [x, y] = derivePoint(props.scale.origin, planetInfo.renderCoord, props.scale.planetMinuteRadius, props.rotationalOffset);
        return (
            <Text key={`${planetInfo.name}-Minutes`}
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

    const planetAndCoords = (planetInfo) => {
        return (
            <Group key={planetInfo.name}>
                {planetSymbol(planetInfo)}
                {planetDegrees(planetInfo)}
                {planetSign(planetInfo)}
                {planetMinutes(planetInfo)}
            </Group>
        )
    }
    return (
        <Group>
            {Object.keys(props.coords).map((planet) => (
                planetAndCoords(adjustedCoords[planet])
            ))}
            {}
        </Group>
    )
}