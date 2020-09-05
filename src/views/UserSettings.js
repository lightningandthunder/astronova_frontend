import React from "react";
import "./UserSettings.scss";

import Kofi from "./ko-fi/Kofi";

export default function UserSettings(props) {
  return (
    <div className="user-settings-container">
      <div className="user-settings">
        <p>
          User settings panel coming soon!
      </p>
        <p>
          Please check back later for configuration settings including
          chart points, aspect orbs, and more!
      </p>
      </div>
      <Kofi></Kofi>
    </div>
  );
}