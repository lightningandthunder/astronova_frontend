import React, { useState } from "react";
import Popup from "reactjs-popup";

import "./modals.scss";

export default function NewsPopup(props) {
  const [isOpen, changeIsOpen] = useState(false);

  const seenNewsPopup = localStorage.getItem('seenNewsPopup');
  if (!seenNewsPopup) {
    setTimeout(() => changeIsOpen(true), 1000);
  }

  return (
    <Popup
      position="right center"
      modal
      open={isOpen}
      closeOnDocumentClick
      onClose={() => {
        changeIsOpen(false);
        localStorage.setItem('seenNewsPopup', 'true');
      }}
    >
      <div className="input-modal">
        <p>
          Nova is currently in <strong>beta</strong>.
        </p>
        <p>
          Please excuse things being a bit rough around the edges as it
          grows up.
        </p>
        <p>
          If you are able to support the Nova project, please consider <a
            href="https://ko-fi.com/lightningandthunder"
            target="blank"
          >donating</a> to support ongoing development.
        </p>
      </div>
    </Popup>
  );
}