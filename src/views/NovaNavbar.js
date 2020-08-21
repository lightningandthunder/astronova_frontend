import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../styles/NovaNavbar.css";

export default function NovaNavbar(props) {

  return (
    <Navbar expand="sm" className="navbar" bg="light" variant="primary">
      {
        props.panelState === "aspects" &&
        <box-icon
          id="nav-icon"
          name="customize"
          onClick={props.handleSettingsClick}>
        </box-icon>
      }
      {
        props.panelState === "control" &&
        <box-icon
          id="nav-icon"
          name="shape-triangle"
          onClick={props.handleSettingsClick}>
        </box-icon>
      }
    </Navbar>
  );
}