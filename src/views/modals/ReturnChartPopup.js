import React from "react";
import Popup from "reactjs-popup";
import axios from 'axios';

import geosearch from '../../utils/geosearch';
import { QUERY_HEADERS, API_ADDRESS } from '../../settings';
import { logIfDebug } from "../../utils/utils";
import moment from "moment-timezone";
import RadixQuery from "../../models/RadixQuery";
import SolunarQuery from "../../models/SolunarQuery";
import Biwheel from "../../models/Biwheel";
import ErrorAlert from "../ErrorAlert";
import { errorService } from "../../services/errorService";

export default class ReturnChartPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currentSelectedDatetime: undefined,
      locationInput: undefined,
      planetInput: "Sun",
      harmonicInput: 1,
      quantityInput: 1,
      err: undefined,
    };

    this.queryBackendForReturn = this.queryBackendForReturn.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleHarmonicChange = this.handleHarmonicChange.bind(this);
    this.handlePlanetChange = this.handlePlanetChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.createQuantityRange = this.createQuantityRange.bind(this);
  }

  /* ============= Popup handlers ============= */

  openPopup() {
    this.setState({ isOpen: true })
  }
  closePopup() { this.setState({ isOpen: false }) }
  handleKeyDown(event) {
    // Recognize pressing return key
    if (event.keyCode === 13 && this.state.isOpen === true)
      this.queryBackendForReturn();
  }

  /* ============ onChange handlers ============ */

  handleLocationChange(event) { this.setState({ locationInput: event.target.value }); }
  handleDateTimeChange(event) { this.setState({ currentSelectedDatetime: event.target.value }); }
  handlePlanetChange(event) { this.setState({ planetInput: event.target.value }); }
  handleHarmonicChange(event) { this.setState({ harmonicInput: event.target.value }); }
  handleQuantityChange(event) { this.setState({ quantityInput: event.target.value }); }

  /* ==================== Query ================= */

  createQuantityRange() {
    // [1, 2, 3, ... 60]
    let arr = [];
    for (let c = 1; c < 61; c++)
      arr.push(c);

    return arr;
  }

  async queryBackendForReturn() {
    this.setState({ err: undefined });

    const inputRadix = this.props.selectedChart;
    const harmonic = this.state.harmonicInput;
    const planet = this.state.planetInput;
    const quantity = this.state.quantityInput;
    const locationQuery = this.state.locationInput;

    // Validations
    if (!inputRadix) {
      this.setState({ err: "No base chart selected!" });
      return;
    }

    if (!locationQuery || locationQuery.length === 0 || locationQuery.trim().length === 0) {
      this.setState({ err: "Invalid location!" });
      return;
    }

    // Setup and make query
    const locationResults = await geosearch(locationQuery);
    if (!locationResults) {
      this.setState({ err: "No location found! Please try a different location." });
      return;
    }

    const dt = moment.tz(this.state.currentSelectedDatetime, locationResults.tz);
    const radixQuery = RadixQuery.fromUniwheel(inputRadix);
    const query = new SolunarQuery(radixQuery,
      {
        return_planet: planet,
        return_harmonic: harmonic,
        return_longitude: locationResults.longitude,
        return_latitude: locationResults.latitude,
        return_start_date: dt,
        tz: locationResults.tz,
        return_quantity: quantity,
      });

    logIfDebug("Solunar return query: ", query);
    const response = await axios.post(
      API_ADDRESS + "/returns",
      query,
      { headers: QUERY_HEADERS }
    );

    if (response.data.err) {
      this.setState({ err: response.data.err });
      return;
    }

    try {
      const chartArray = Biwheel.arrayFromJSON(response.data);

      for (let chart of chartArray) {
        chart.setName(`${inputRadix.name} Solunar Return`)
          .setPlaceName(locationResults.placeName)
          .setRadixName(`${inputRadix.name} (Precessed Radix)`)
          .setRadixPlaceName(locationResults.placeName)
          .setSolunarName(`${inputRadix.name} (Transiting Planets)`)
          .setSolunarPlaceName(locationResults.placeName);
        this.props.saveChart(chart);
      }

      logIfDebug("Radix & return charts: ", chartArray);
      this.props.setSelectedChartToNewest();
      this.closePopup();
    } catch (err) {
      logIfDebug(err);
      if (this.state.isOpen)
        this.setState({ err: err })
      else
        errorService.reportError(err);
    }
  }

  render() {
    return (
      <div onKeyDown={this.handleKeyDown}>
        <button
          className="btn btn-blue"
          disabled={!this.props.enabled}
          onClick={this.openPopup}>
          New Solunar Return
                </button>
        <Popup
          position="right center"
          modal
          open={this.state.isOpen}
          closeOnDocumentClick
          onClose={this.closePopup}
        >
          <div className="return-chart-dialog">
            <div>
              <input type="datetime-local" onChange={this.handleDateTimeChange} />
            </div>
            <div>
              <input placeholder='Location' onChange={this.handleLocationChange} />
            </div>
            <select onChange={this.handlePlanetChange}>
              <option value="Sun" key="Sun">Sun</option>
              <option value="Moon" key="Moon">Moon</option>
            </select>
            <select label="Harmonic" onChange={this.handleHarmonicChange}>
              {this.state.planetInput === "Sun"
                ? [1, 2, 4, 9, 36].map((item) => (
                  <option value={item} key={item}>{item}</option>
                ))
                : [1, 2, 4].map((item) => (
                  <option value={item} key={item}>{item}</option>
                ))}
            </select>
            <select onChange={this.handleQuantityChange}>
              {this.createQuantityRange().map((item) => (
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
            <div>
              <button onClick={this.queryBackendForReturn}>Calculate</button>
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