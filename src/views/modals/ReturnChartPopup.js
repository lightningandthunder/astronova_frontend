import React from "react";
import Popup from "reactjs-popup";
import axios from 'axios';

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
  closePopup() { this.setState({ isOpen: false, err: null }) }
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

  /* ==================== Validation ================= */

  get formIsValid() {
    return this.state.quantityInput >= 1 && this.state.quantityInput <= 50;
  }

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

    const dt = moment(this.state.currentSelectedDatetime);
    const radixQuery = RadixQuery.fromUniwheel(inputRadix);
    const query = new SolunarQuery(radixQuery,
      {
        return_planet: planet,
        return_harmonic: harmonic,
        return_start_date: dt,
        return_location: locationQuery,
        return_quantity: quantity,
      });

    logIfDebug("Solunar return query: ", query);
    const response = await axios.post(
      API_ADDRESS + "/returns",
      query,
      { headers: QUERY_HEADERS }
    );

    const data = JSON.parse(response.data);
    if (data.err) {
      this.closePopup();
      errorService.reportError(`API error: ${data.err}`);
      return;
    }

    try {
      const chartArray = Biwheel.arrayFromJSON(data);

      for (let chart of chartArray) {
        chart.setName(`${inputRadix.name} Solunar Return`)
          .setPlaceName(chart.solunar.placeName)
          .setRadixName(`${inputRadix.name} (Precessed Radix)`)
          .setSolunarName(`${inputRadix.name} (Transiting Planets)`)
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
            <div className="mb-3">
              <ErrorAlert
                err={this.state.err}
                resetError={() => this.setState({ err: undefined })}
              />
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="datetimeInput">Date</label>
              <div className="col-sm-10">
                <input className="form-control" id="datetimeInput" type="date" onChange={this.handleDateTimeChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="locationInput">Location</label>
              <div className="col-sm-10">
                <input className="form-control" id="locationInput" placeholder='Location' onChange={this.handleLocationChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="planetInput">Planet</label>
              <div className="col-sm-10">
                <select className="form-control" id="planetInput" onChange={this.handlePlanetChange}>
                  <option value="Sun" key="Sun">Sun</option>
                  <option value="Moon" key="Moon">Moon</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="harmonicInut">Harmonic</label>
              <div className="col-sm-10">
                <select className="form-control" id="harmonicInput" onChange={this.handleHarmonicChange}>
                  {this.state.planetInput === "Sun"
                    ? [1, 2, 4, 9, 36].map((item) => (
                      <option value={item} key={item}>{item}</option>
                    ))
                    : [1, 2, 4].map((item) => (
                      <option value={item} key={item}>{item}</option>
                    ))}
                </select>
                <small className="form-text text-muted">
                  Select a harmonic: 1 for standard return, 2 for demi, 4 for quarti, etc.
                </small>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="quantityInput" className="col-sm-2 col-form-label">Quantity</label>
              <div className="col-sm-10">
                <input type="number" min="1" max="50" defaultValue="1" id="quantityInput" className="form-control" onChange={this.handleQuantityChange} />
              </div>
              {
                (this.state.quantityInput > 50 || this.state.quantityInput < 1) &&
                <small className="ml-3 form-text text-danger">
                  Please enter a quantity from 1-50
                </small>
              }
            </div>
            <div className="col-sm-10">
              <button className="btn btn-primary" disabled={!this.formIsValid} onClick={this.queryBackendForReturn}>Calculate</button>
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