import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";

import geosearch from "../../utils/geosearch";
import { QUERY_HEADERS, API_ADDRESS, WheelTypes } from "../../settings";
import LocationInput from "./LocationInput";
import { logIfDebug } from "../../utils/utils";
import { errorService } from "../../services/errorService";
import RelocationQuery from "../../models/RelocationQuery";
import Uniwheel from "../../models/Uniwheel";
import Biwheel from "../../models/Biwheel";
import ErrorAlert from "../ErrorAlert";


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

      const locationResults = await geosearch(locationQuery);
      if (!locationResults) {
        this.setState({ err: "No location found! Please try a different location." });
        return;
      }

      const relocateQuery = RelocationQuery
        .fromWheel(this.props.chart)
        .setLocation(locationResults);

      logIfDebug("Relocation query: ", relocateQuery);
      const response = await axios.post(
        API_ADDRESS + "/relocate",
        relocateQuery,
        { headers: QUERY_HEADERS }
      );

      const err = response.data.err;
      if (err)
        this.setState({ err: err });

      logIfDebug("Response: ", JSON.parse(response.data));

      const newChart = this.props.chart.type === WheelTypes.BIWHEEL
        ? Biwheel.fromJSON(response.data)
          .setName(`${this.props.chart.name} (Relocated)`)
          .setRadixName(`${this.props.chart.radix.name} Radix (Relocated)`)
          .setSolunarName(`${this.props.chart.solunar.name} Solunar (Relocated)`)
          .setPlaceName(locationResults.placeName)
          .setRadixPlaceName(locationResults.placeName)
          .setSolunarPlaceName(locationResults.placeName)
        : Uniwheel.fromJSON(response.data)
          .setName(`${this.props.chart.name} (Relocated)`)
          .setPlaceName(locationResults.placeName);

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
        <button
          className="RelocateChartButton"
          disabled={!this.props.enabled}
          onClick={this.openPopup}
        >
          Relocate
        </button>
        <Popup
          className="popup"
          position="right center"
          modal
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={this.closePopup}
        >
          <div className="RelocateChartDialog">
            <LocationInput updateLocation={this.handleLocationChange} />
            <div>
              <button onClick={this.queryBackendForRelocation}>Relocate</button>
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