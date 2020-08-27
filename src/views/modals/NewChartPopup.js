import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import moment from "moment-timezone";

import geosearch from "../../utils/geosearch";
import { QUERY_HEADERS, API_ADDRESS } from "../../settings";
import { logIfDebug } from "../../utils/utils";
import Uniwheel from "../../models/Uniwheel";
import RadixQuery from "../../models/RadixQuery";
import { errorService } from "../../services/errorService";
import ErrorAlert from "../ErrorAlert";

export default class NewChartPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      nameInput: undefined,
      currentSelectedDatetime: undefined,
      apm: "AM",
      locationInput: undefined,
      err: undefined,
    }
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.queryBackendForRadix = this.queryBackendForRadix.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  };

  openPopup() {
    this.setState({ isOpen: true, err: undefined })
  }
  closePopup() {
    this.setState({ isOpen: false })
  }
  handleNameChange(event) {
    this.setState({ nameInput: event.target.value });
  }
  handleLocationChange(event) {
    this.setState({ locationInput: event.target.value });
  }
  handleDateTimeChange(event) {
    this.setState({ currentSelectedDatetime: event.target.value });
  }

  handleKeyDown(event) {
    // Recognize pressing return key
    if (event.keyCode === 13 && this.state.isOpen === true) {

      // Debug powers!
      if (this.state.nameInput === "debug") {
        window.novaDebugMode = true;
        logIfDebug("Wizard mode activated");
        this.closePopup();
      } else {
        // Normal functionality
        this.queryBackendForRadix();
      }
    }
  }

  async queryBackendForRadix() {
    // Query back end for a single chart.

    this.setState({ err: undefined });

    const locationQuery = this.state.locationInput;
    if (!locationQuery || locationQuery.trim().length === 0) {
      this.setState({ err: "Invalid location!" });
      return;
    }

    const locationResults = await geosearch(locationQuery);
    if (!locationResults) {
      this.setState({ err: "No location found! Please try a different location." });
      return;
    }

    const dt = moment.tz(this.state.currentSelectedDatetime, locationResults.tz)
    const radixQuery = new RadixQuery(dt, locationResults);

    logIfDebug("Radix query: ", radixQuery);
    const response = await axios.post(
      API_ADDRESS + "/radix",
      radixQuery,
      { headers: QUERY_HEADERS }
    );

    if (response.data.err) {
      this.setState({ err: response.data.err });
      return;
    }

    try {
      const newChart = Uniwheel.fromJSON(response.data)
        .setName(this.state.nameInput)
        .setPlaceName(locationResults.placeName);
      logIfDebug("New chart: ", newChart);
      this.props.saveChart(newChart);
      this.props.setSelectedChartToNewest();
      this.closePopup();
      this.setState({ apm: "AM" })
    } catch (err) {
      if (this.state.open)
        this.setState({ err: err });
      else
        errorService.reportError(err);
    }
  }

  render() {
    return (
      <div onKeyDown={this.handleKeyDown}>
        <button className="btn btn-blue" onClick={this.openPopup}>
          New Chart
                </button>
        <Popup
          className="popup"
          position="right center"
          modal
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={this.closePopup}
        >
          <div className="new-chart-dialogue">
            <div>
              <input placeholder='Name' onChange={this.handleNameChange}>
              </input>
            </div>
            <div>
              <input type="datetime-local" onChange={this.handleDateTimeChange} />
            </div>
            <div>
              <input placeholder='Location' onChange={this.handleLocationChange} />
            </div>
            <div>
              <button onClick={this.queryBackendForRadix}>Calculate</button>
            </div>
            <ErrorAlert
              err={this.state.err}
              resetError={() => this.setState({ err: undefined })}
            />
          </div>
        </Popup>
      </div>
    );
  }

}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/