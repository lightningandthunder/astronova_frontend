import React from "react";

export default function ViewButtons(props) {
  return (
    <div className="view-buttons">
      <input type="radio"
        className="radio-input"
        id="ecliptical"
        value="ecliptical"
        checked={props.view === "ecliptical"}
        onChange={props.onChangeView}
      />
      <label htmlFor="ecliptical">Ecliptical</label>
      <input type="radio"
        className="radio-input"
        id="mundane"
        value="mundane"
        checked={props.view === "mundane"}
        onChange={props.onChangeView}
      />
      <label htmlFor="mundane">Mundane</label>
      <input type="radio"
        className="radio-input"
        id="right_ascension"
        value="right_ascension"
        checked={props.view === "right_ascension"}
        onChange={props.onChangeView}
      />
      <label htmlFor="right_ascension">RA</label>
    </div>
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/