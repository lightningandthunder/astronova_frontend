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

export default class NewChartPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            currentSelectedDatetime: undefined,
            locationInput: undefined
        }
        this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
        this.validateDateTime = this.validateDateTime.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.queryBackendForRadix = this.queryBackendForRadix.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.handleError = this.handleError.bind(this);
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
    handleDateTimeChange(event) {
        this.setState({ currentSelectedDatetime: event.target.value });
    }

    handleError(err) {
        //TODO: Eventually make this more robust
        alert(err.toString());
    }

    handleKeyDown(event) {
        // Recognize pressing return key
        if (event.keyCode === 13 && this.state.isOpen === true)
            this.queryBackendForRadix();
    }

    validateDateTime() {
        // YYYY-mm-ddThh:mm in military time
        const dtRegex = /^[1-3]\d{3}-[01]\d-[0-3]\dT[0-5]\d:[0-5]\d/;
        return dtRegex.exec(this.state.currentSelectedDatetime) ? true : false;
    }

    async queryBackendForRadix() {
        // Query back end for a single chart.

        if (!this.validateDateTime()) {
            this.handleError("Invalid datetime!");
            return;
        }
        const locationQuery = this.state.locationInput;
        if (!locationQuery || locationQuery.length === 0 || locationQuery.trim().length === 0) {
            this.handleError("Invalid location!");
            return;
        }

        const locationResults = await geosearch(locationQuery);
        if (!locationResults) {
            this.handleError("No location found! Please try a different location.");
            return;
        }

        const radixQuery = manager.createRadixQueryFromRaw(this.state.currentSelectedDatetime,
            locationResults.longitude,
            locationResults.latitude,
            locationResults.tz);

        logIfDevelopment("Radix query: ", radixQuery);
        const response = await axios.post(
            API_ADDRESS + "/radix",
            radixQuery,
            { headers: QUERY_HEADERS }
        );

        try {
            const newChart = manager.createUniwheel(response.data);
            logIfDevelopment("New chart: ", newChart);
            this.props.saveChart(newChart);
            this.props.setSelectedChartToNewest();
            this.closePopup();
        } catch (err) {
            this.handleError(err);
        }
    }


    render() {
        return (
            <div onKeyDown={this.handleKeyDown}>
                <button onClick={this.openPopup}>New Chart</button>
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
                        <div>
                            <button onClick={this.queryBackendForRadix}>Calculate</button>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }

}