import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";

import ChartManager from "../../managers/ChartDataManager";
import geosearch from "../../utils/geosearch";
import { QUERY_HEADERS, API_ADDRESS } from "../../settings";
import LocationInput from "./LocationInput";
import logIfDebug from "../../utils/logIfDebug";
import { objectTypeAnnotation } from "@babel/types";

const manager = new ChartManager();

export default class relocatePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            locationInput: undefined
        }
        this.queryBackendForRelocation = this.queryBackendForRelocation.bind(this);
        this.openPopup = this.openPopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
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

    handleError(err) {
        //TODO: Eventually make this more robust
        alert(err.toString());
    }

    handleKeyDown(event) {
        // Recognize pressing return key
        if (event.keyCode === 13 && this.state.isOpen === true)
            this.queryBackendForRelocation();
    }

    async queryBackendForRelocation() {
        // Query back end for relocation.

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
        const relocateQuery = manager.createRelocationQuery(locationResults, this.props.chart);

        logIfDebug("Relocation query: ", relocateQuery);
        const response = await axios.post(
            API_ADDRESS + "/relocate",
            relocateQuery,
            { headers: QUERY_HEADERS }
        );
        const err = response.data.err;
        if (err) {
            this.handleError(err);
            return;
        }
        try {
            let newChart;
            if ("return_chart" in response.data) {
                newChart = manager.createBiwheel(
                    response.data,
                    locationResults,
                    this.props.chart.name + " " + locationResults.placeName.split(",")[0]
                );
            } else {
                newChart = manager.createUniwheel(
                    response.data,
                    locationResults,
                    this.props.chart.name + " " + locationResults.placeName.split(",")[0]
                );
            }


            logIfDebug("New chart: ", newChart);
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
                <button className="RelocateChartButton"
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