import React from "react";
import "../styles/UserSettings.scss";
import "../styles/Kofi.scss";

import Kofi from "./ko-fi/Kofi";

export default function UserSettings(props) {
  return (
    <>
      <div className="user-settings">
        <p>
          User settings panel coming soon!
      </p>
        <p>
          Please check back later for configuration settings including
          color theme, chart points, aspect orbs, and more!
      </p>
      </div>
      <Kofi></Kofi>
    </>
  );
}