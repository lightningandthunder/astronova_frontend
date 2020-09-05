import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Popup from "reactjs-popup";

import Faq from "./faqPage/Faq";
import "./NovaNavbar.scss";

export default function NovaNavbar(props) {
  const [faqIsOpen, openFaq] = useState(false);

  return (
    <Navbar id="navbar" expand="sm" className="navbar" bg="light" variant="primary">
      <div className="nova-logo">
        Logo
      </div>
      <div className="nav-icon-group">
        {
          props.panelState !== "control" &&
          <div className="nav-icon">
            <box-icon
              name="customize"
              type="solid"
              onClick={() => props.handleIconClick("control")}>
            </box-icon>
          </div>
        }
        {
          props.panelState !== "aspects" &&
          <div className="nav-icon">
            <box-icon
              name="shape-triangle"
              onClick={() => props.handleIconClick("aspects")}>
            </box-icon>
          </div>
        }
        {
          props.panelState !== "settings" &&
          <div className="nav-icon">
            <box-icon
              name="cog"
              type="solid"
              onClick={() => props.handleIconClick("settings")}>
            </box-icon>
          </div>
        }
        <div className="nav-icon">
          <box-icon
            name="help-circle"
            type="solid"
            onClick={() => openFaq(true)}>
          </box-icon>
        </div>
      </div>

      <Popup
        className="popup"
        position="right center"
        modal
        open={faqIsOpen}
        closeOnDocumentClick
        onClose={() => openFaq(false)}
      >
        <Faq></Faq>
      </Popup>
    </Navbar>
  );
}