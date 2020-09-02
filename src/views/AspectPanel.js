import React from "react";
import { getSymbol } from "../utils/utils";
import { degToMin } from "../utils/geometry";
import "../styles/AspectPanel.scss";
import "../styles/ColorsAndFonts.scss";

import Kofi from "./ko-fi/Kofi";

export default function AspectPanel(props) {
  return (
    <>
      <div className="aspect-panel">
        <table>
          <thead>
            <tr>
              <th>T</th>
              <th>Asp</th>
              <th>R</th>
              <th>Orb</th>
            </tr>
          </thead>
          <tbody>
            {
              props.aspects.map(a => {
                if (a && a.aspectType) {

                  const orbDegrees = Math.trunc(a.orb) % 30;
                  const orbMins = degToMin(a.orb)
                    .toString()
                    .padStart(2, "0");

                  return (
                    <tr key={`aspect-${a.planet1}-${a.planet2}`}>
                      <td className={`symbol ${a.planet1}`}>
                        {`${getSymbol(a.planet1)} `}
                      </td>
                      <td className={`symbol ${a.aspectType}`}>
                        {`${getSymbol(a.aspectType)} `}
                      </td>
                      <td className={`symbol ${a.planet2}`}>
                        {`${getSymbol(a.planet2)} `}
                      </td>
                      <td>
                        {`${orbDegrees}\u00B0 ${orbMins}'`}
                      </td>
                    </tr>
                  )
                }
                return null;
              })
            }
          </tbody>
        </table>
      </div >
      <div className="aspect-panel-kofi">
        <Kofi></Kofi>
      </div>
    </>
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/