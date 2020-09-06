import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";

import { QUERY_HEADERS, API_ADDRESS, WheelTypes } from "../../settings";
import { logIfDebug } from "../../utils/utils";
import { errorService } from "../../services/errorService";
import RelocationQuery from "../../models/RelocationQuery";
import Uniwheel from "../../models/Uniwheel";
import Biwheel from "../../models/Biwheel";
import ErrorAlert from "../ErrorAlert";
import "./modals.scss";


export default class RelocatePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      locationInput: undefined,
      err: undefined,
    }
    this.queryBackendForRelocation = this.queryBackendForRelocation.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  };

  openPopup() {
    this.setState({ isOpen: true })
  }
  closePopup() {
    this.setState({ isOpen: false })
  }

  handleLocationChange(event) {
    this.setState({ locationInput: event.target.value });
  }

  handleKeyDown(event) {
    // Recognize pressing return key
    if (event.keyCode === 13 && this.state.isOpen === true)
      this.queryBackendForRelocation();
  }

  async queryBackendForRelocation() {
    this.setState({ err: null });
    try {
      const locationQuery = this.state.locationInput;
      if (!locationQuery || locationQuery.length === 0 || locationQuery.trim().length === 0) {
        this.setState({ err: "Invalid location!" });
        return;
      }

      const relocateQuery = RelocationQuery
        .fromWheel(this.props.chart)
        .setLocation(locationQuery);

      logIfDebug("Relocation query: ", relocateQuery);
      const response = await axios.post(
        API_ADDRESS + "/relocate",
        relocateQuery,
        { headers: QUERY_HEADERS }
      );

      const data = JSON.parse(response.data);
      if (data.err) {
        this.closePopup();
        errorService.reportError(`API error: ${data.err}`);
        return;
      }

      logIfDebug("Response: ", JSON.parse(response.data));

      const newChart = this.props.chart.type === WheelTypes.BIWHEEL
        ? Biwheel.fromJSON(data)
          .setName(`${this.props.chart.name} (Relocated)`)
          .setRadixName(`${this.props.chart.radix.name} Radix (Relocated)`)
          .setSolunarName(`${this.props.chart.solunar.name} Solunar (Relocated)`)
        : Uniwheel.fromJSON(data)
          .setName(`${this.props.chart.name} (Relocated)`)

      logIfDebug("New chart: ", newChart);
      this.props.saveChart(newChart);
      this.props.setSelectedChartToNewest();
      this.closePopup();

    } catch (err) {
      if (this.state.isOpen)
        this.setState({ err: err });
      else
        errorService.reportError(err);
    }
  }


  render() {
    return (
      <div onKeyDown={this.handleKeyDown}>
        <div
          className="btn btn-blue"
          disabled={!this.props.enabled}
          onClick={this.openPopup}
          role="button"
          aria-label="relocate selected chart"
        >
          Relocate
        </div>
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
              <label htmlFor="locationInput" className="col-sm-2 col-form-label">Location</label>
              <div className="col-sm-10">
                <input className="form-control" id="locationInput" placeholder='Location' onChange={this.handleLocationChange} />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10">
                <button className="btn btn-primary" onClick={this.queryBackendForRelocation}>Relocate</button>
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