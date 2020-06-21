import React from "react";

export default function PanelToggle(props) {
  
  return (
    <div className="ModeButtons">
      <input type="radio"
        id="controlPanel"
        value="controlPanel"
        checked={props.panelToggle === "controlPanel"}
        onChange={props.onToggleControlPanel}
      />
      <label>Control Panel</label>
      <input type="radio"
        id="aspectList"
        value="aspectList"
        checked={props.panelToggle === "aspectList"}
        onChange={props.onToggleControlPanel}
      />
      <label>Aspect List</label>
    </div>
  )
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/