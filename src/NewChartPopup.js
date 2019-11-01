import React from "react";
import Popup from "reactjs-popup";

export default class NewChartPopup extends React.Component {
    constructor() {
        super();
    };


    render() {
        return (
            <Popup
                className="popup"
                trigger={<button>Trigger!</button>}
                position="right center"
                modal
            >
                <div className="header">
                    This is a header!
                </div>
                <div className="actions">
                    <Popup
                        trigger={<button className="button"> Open Thing </button>}
                        position="top center"
                        closeOnDocumentClick
                    >
                        Thing!!!
                    </Popup>
                </div>
            </Popup>
        );
    }

}