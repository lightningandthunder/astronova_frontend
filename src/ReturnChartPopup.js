import React from "react";
import Popup from "reactjs-popup";
import ChartManager from './managers/ChartDataManager';
import geosearch from './utils/geosearch';
import { QUERY_HEADERS, API_ADDRESS } from './settings';
import LocationInput from './LocationInput';
import Datepicker from './datepicker';
import axios from 'axios';
import logIfDevelopment from "./utils/logIfDevelopment";

const manager = new ChartManager();

export default class ReturnChartPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            currentSelectedDatetime: undefined,
            locationInput: undefined,
            planetInput: "Sun",
            harmonicInput: 1,
            quantityInput: 1
        };

        this.queryBackendForReturn = this.queryBackendForReturn.bind(this);
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.validateDateTime = this.validateDateTime.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleHarmonicChange = this.handleHarmonicChange.bind(this);
        this.handlePlanetChange = this.handlePlanetChange.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.validateHarmonic = this.validateHarmonic.bind(this);
        this.createQuantityRange = this.createQuantityRange.bind(this);
    }

    /* ============= Popup handlers ============= */

    openPopup() { this.setState({ isOpen: true }) }
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

    /* ======== Validation & error handling ======= */

    handleError(err) {
        //TODO: Eventually make this more robust
        alert(err.toString());
    }
    validateDateTime() {
        // YYYY-mm-ddThh:mm in military time
        const dtRegex = /^[1-3]\d{3}-[01]\d-[0-3]\dT[0-5]\d:[0-5]\d/;
        return dtRegex.exec(this.state.currentSelectedDatetime) ? true : false;
    }

    validatePlanet() {
        if (this.state.planetInput === "Sun" || this.state.planetInput === "Moon")
            return true;

        return false;
    }

    validateHarmonic() {
        const planet = this.state.planetInput;
        const harmonic = this.state.harmonicInput;

        if (planet === "Sun") {
            if (1 <= harmonic <= 2 || harmonic === 4 || harmonic === 9 || harmonic === 18 || harmonic === 36)
                return true;
        }
        else if (planet === "Moon") {
            if (1 <= harmonic <= 2 || harmonic === 4)
                return true;
        }

        return false;
    }

    /* ==================== Query ================= */

    createQuantityRange() {
        // [1, 2, 3, ... 20]
        let arr = [];
        for (let c = 1; c < 21; c++)
            arr.push(c);

        return arr;
    }

    async queryBackendForReturn() {
        const inputRadix = this.props.selectedChart;
        const harmonic = this.state.harmonicInput;
        const planet = this.state.planetInput;
        const quantity = this.state.quantityInput;
        const locationQuery = this.state.locationInput;

        // Validations

        if (!inputRadix) {
            this.handleError("No base chart selected!");
            return;
        }

        if (!this.validateHarmonic()) {
            this.handleError("Invalid harmonic selected: " + harmonic);
            return;
        }

        if (!this.validatePlanet()) {
            this.handleError("Invalid planet selected: " + planet);
            return;
        }

        if (!(1 <= quantity <= 20)) {
            this.handleError("Invalid quantity selected: " + quantity);
            return;
        }

        if (!this.validateDateTime()) {
            this.handleError("Invalid datetime!");
            return;
        }

        if (!locationQuery || locationQuery.length === 0 || locationQuery.trim().length === 0) {
            this.handleError("Invalid location!");
            return;
        }

        // Setup and make query

        const locationResults = await geosearch(locationQuery);
        if (!locationResults) {
            this.handleError("No location found! Please try a different location.");
            return;
        }

        const query = manager.createReturnQuery(inputRadix, planet, harmonic, locationResults.longitude,
            locationResults.latitude, this.state.currentSelectedDatetime, locationResults.tz, quantity)

        logIfDevelopment("Return query: ", query);
        const response = await axios.post(
            API_ADDRESS + "/returns",
            query,
            { headers: QUERY_HEADERS }
        );

        // Handle response
        const err = response.data.err;
        if (err) {
            this.handleError(err);
            return;
        }
        let charts = response.data;
        try {
            if (charts.length === 0) {
                alert("No charts to create!");
                return;
            }
            logIfDevelopment("Radix & return charts: ", charts);
            for (let c = 0; c < charts.length; c++) {
                const newChart = manager.createBiwheel(charts[c]);
                this.props.saveChart(newChart);
            }

            this.props.setSelectedChartToNewest();
            this.closePopup();
        } catch (err) {
            logIfDevelopment(err)
        }
    }

    render() {
        return (
            <div onKeyDown={this.handleKeyDown}>
                <button onClick={this.openPopup}>New Solunar Return</button>
                <Popup
                    className="popup"
                    position="right center"
                    modal
                    open={this.state.isOpen}
                    closeOnDocumentClick
                    onClose={this.closePopup}
                >
                    <div className="actions">
                        <Datepicker onChange={this.handleDateTimeChange} />
                        <LocationInput updateLocation={this.handleLocationChange} />
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
                    </div>
                </Popup>
            </div>
        );
    }
}