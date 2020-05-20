import React from "react";
import { Group } from "react-konva";

import { getRenderCoords } from "../../utils/geometry";
import PlanetCoords from "../../models/PlanetCoords";
import { PlanetDegrees } from "./planetComponents/PlanetDegrees";
import { PlanetMinutes } from "./planetComponents/PlanetMinutes";
import { PlanetSign } from "./planetComponents/PlanetSign";
import { PlanetSymbol } from "./planetComponents/PlanetSymbol";
import { PlanetLocationMarker } from "./planetComponents/PlanetLocationMarker";

export default function Planets(props) {
  let planetRadius = 280;
  let planetDegreeRadius = 255;
  let planetSignRadius = 235;
  let planetMinuteRadius = 210;
  let planetMarkerOutsideRadius = 175;
  let planetMarkerInsideRadius = 170;

  switch (props.ringLayer) {
    case "biwheel outer":
      planetRadius = 280;
      planetDegreeRadius = 255;
      planetSignRadius = 235;
      planetMinuteRadius = 220;
      planetMarkerOutsideRadius = 210;
      planetMarkerInsideRadius = 205;
      break;
    case "biwheel inner":
      planetRadius = 190;
      planetDegreeRadius = 165;
      planetSignRadius = 140;
      planetMinuteRadius = 120;
      planetMarkerOutsideRadius = 110;
      planetMarkerInsideRadius = 105;
      break;
    // default: Uniwheel, already initialized
  }
  const adjustedCoords = getRenderCoords(
    new PlanetCoords(props.coords),
    planetMinuteRadius  // Smallest radius on which elements need to be readable
  );

  return (
    <Group>
      {Object.keys(adjustedCoords).map((planet) => (
        <Group key={planet.name}>
          <PlanetSign
            origin={props.origin}
            radius={planetSignRadius}
            rotationalOffset={props.rotationalOffset}
            planet={planet}
            scaleFactor={props.scaleFactor}
            zodiacal={props.zodiacal}
          />
          <PlanetSymbol
            origin={props.origin}
            radius={planetRadius}
            rotationalOffset={props.rotationalOffset}
            planet={planet}
            scaleFactor={props.scaleFactor}
          />
          <PlanetDegrees
            origin={props.origin}
            radius={planetDegreeRadius}
            rotationalOffset={props.rotationalOffset}
            planet={planet}
            scaleFactor={props.scaleFactor}
          />
          <PlanetMinutes
            origin={props.origin}
            radius={planetMinuteRadius}
            rotationalOffset={props.rotationalOffset}
            planet={planet}
            scaleFactor={props.scaleFactor}
          />
          <PlanetLocationMarker
            origin={props.origin}
            coordinate={planet.rawCoord}
            outerRadius={planetMarkerOutsideRadius}
            innerRadius={planetMarkerInsideRadius}
            rotationalOffset={props.rotationalOffset}
          />
        </Group>
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