import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import moment from "moment-timezone";

import { QUERY_HEADERS, API_ADDRESS } from "../../settings";
import { logIfDebug } from "../../utils/utils";
import Uniwheel from "../../models/Uniwheel";
import RadixQuery from "../../models/RadixQuery";
import { errorService } from "../../services/errorService";
import ErrorAlert from "../ErrorAlert";
import "../../styles/modals.scss";

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
    this.setState({ isOpen: true, err: undefined });
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

    const dt = moment(this.state.currentSelectedDatetime).utc(true).toISOString().slice(0, -1);
    const radixQuery = new RadixQuery(dt, locationQuery);

    logIfDebug("Radix query: ", radixQuery);
    const response = await axios.post(
      API_ADDRESS + "/radix",
      radixQuery,
      { headers: QUERY_HEADERS }
    );
    const data = JSON.parse(response.data);
    if (data.err) {
      this.closePopup();
      errorService.reportError(`API error: ${data.err}`);
      return;
    }

    try {
      const newChart = Uniwheel.fromJSON(data)
        .setName(this.state.nameInput);
      logIfDebug("New chart: ", newChart);
      this.props.saveChart(newChart);
      this.props.setSelectedChartToNewest();
      this.closePopup();
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
          position="right center"
          modal
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={this.closePopup}
        >
          <div className="input-modal">
            <div className="mb-3">
              <ErrorAlert
                err={this.state.err}
                resetError={() => this.setState({ err: undefined })}
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="nameInput">Name</label>
              <div className="col-sm-10">
                <input className="form-control" placeholder="Name" id="nameInput" onChange={this.handleNameChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="datetimeInput">Date</label>
              <div className="col-sm-10">
                <input className="form-control" type="datetime-local" id="datetimeInput"
                  onChange={this.handleDateTimeChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="locationInput">Location</label>
              <div className="col-sm-10">
                <input className="form-control" placeholder='Location' onChange={this.handleLocationChange} />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10">
                <button className="btn btn-primary" onClick={this.queryBackendForRadix}>Calculate</button>
              </div>
            </div>
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