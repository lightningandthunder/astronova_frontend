import React from "react";
import { Group } from "react-konva";

import { getRenderCoords } from "../../utils/geometry";
import CoordAdapter from "../../models/PlanetCoords";
import PlanetDegrees from "./planetComponents/PlanetDegrees";
import PlanetMinutes from "./planetComponents/PlanetMinutes";
import PlanetSign from "./planetComponents/PlanetSign";
import PlanetSymbol from "./planetComponents/PlanetSymbol";
import PlanetLocationMarker from "./planetComponents/PlanetLocationMarker";
import { RingLayerEnum } from "../../settings";

export default function Planets(props) {
  const radiusMap = {
    [RingLayerEnum.UNIWHEEL]: 210,
    [RingLayerEnum.BIWHEEL_INNER]: 120,
    [RingLayerEnum.BIWHEEL_OUTER]: 220,
  };

  // Smallest radius on which elements need to be readable
  const minradius = radiusMap[props.ringLayer] * props.scaleFactor;

  const adjustedCoords = getRenderCoords(new CoordAdapter(props.coords), props.cusps, minradius);
  const dataBundles = Object.keys(adjustedCoords).map(key => (
    {
      // These change per planet object from adjustedCoords
      planetName: adjustedCoords[key].name,
      rawCoordinate: adjustedCoords[key].rawCoord,
      renderCoordinate: adjustedCoords[key].renderCoord,

      // These do not change
      origin: props.origin,
      ringLayer: props.ringLayer,
      rotationalOffset: props.rotationalOffset,
      scaleFactor: props.scaleFactor,
      isZodiacal: props.isZodiacal,
    }
  ));

  return (
    <Group>
      {Object.keys(dataBundles).map((key) => (
        <Group key={dataBundles[key].planetName}>
          <PlanetSign {...dataBundles[key]} />
          <PlanetSymbol {...dataBundles[key]} />
          <PlanetDegrees {...dataBundles[key]} />
          <PlanetMinutes {...dataBundles[key]} />
          <PlanetLocationMarker {...dataBundles[key]} />
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