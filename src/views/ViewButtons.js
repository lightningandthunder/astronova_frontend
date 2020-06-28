import React from "react";

export default function ViewButtons(props) {
  return (
    <div className="viewButtons">
      <input type="radio"
        id="ecliptical"
        value="ecliptical"
        checked={props.view === "ecliptical"}
        onChange={props.onChangeView}
      />
      <label>Ecliptical</label>
      <input type="radio"
        id="mundane"
        value="mundane"
        checked={props.view === "mundane"}
        onChange={props.onChangeView}
      />
      <label>Mundane</label>
      <input type="radio"
        id="right_ascension"
        value="right_ascension"
        checked={props.view === "right_ascension"}
        onChange={props.onChangeView}
      />
      <label>RA</label>
    </div>
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/