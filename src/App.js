import React from 'react';
// import Chart from './chart';
import Datepicker from './datepicker';
import './App.css';
import axios from 'axios';
import CalcButton from './calculatebutton';
import Chartdata from './models/ChartData';
import Chartlist from './chartlist';
import RawChartData from './rawchartdata';
import geosearch from './utils/geosearch';
import RadixQuery from './models/RadixQuery';
import RemoveButton from './removeButton';
import { QUERY_HEADERS, API_ADDRESS } from './settings';
import LocationInput from './LocationInput';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: [],
            selectedChart: undefined,
            currentSelectedDatetime: undefined,
            locationInput: undefined
        }

        this.queryBackendForRadix = this.queryBackendForRadix.bind(this);
        this.addChartToState = this.saveChart.bind(this);
        this.onChangeSelectedChart = this.onChangeSelectedChart.bind(this);
        this.onDateTimeChange = this.onDateTimeChange.bind(this);
        this.resetCharts = this.resetCharts.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
    }

    componentDidMount() {
        const chartsArray = JSON.parse(localStorage.getItem('charts'));
        if (chartsArray)
            this.setState({ charts: [...chartsArray] });
        else
            console.log("Found no charts in LS to load");

        const selectedChartFromLS = JSON.parse(localStorage.getItem('selectedChart'));
        if (selectedChartFromLS) {
            this.setState({ selectedChart: selectedChartFromLS });
            console.log("Loaded selected chart from LS: " + selectedChartFromLS.name)
        }
        else
            console.log("Found no selected chart in LS");
    }

    componentWillUnmount() {
    }


    saveChart(chart) {
        // Saves to both state and localStorage
        this.setState({ charts: [...this.state.charts, chart] },
            () => {
                localStorage.setItem('charts', JSON.stringify(this.state.charts));
                console.log("Saved charts to LS: " + this.state.charts.length);
            }
        );
    }

    onChangeSelectedChart(e) {
        // Saves to both state and localStorage
        this.setState({ selectedChart: this.state.charts[e.target.value] },
            () => {
                localStorage.setItem('selectedChart', JSON.stringify(this.state.selectedChart));
                console.log("Saved current selection to LS: " + this.state.selectedChart.name);
            }
        );
    }

    onChangeLocation(e) {
        this.setState({ locationInput: e.target.value });
    }

    resetCharts() {
        localStorage.removeItem('charts');
        localStorage.removeItem('selectedChart')
        this.setState({ charts: [] });
        this.setState({ selectedChart: undefined })
    }

    onDateTimeChange(e) {
        // YYYY-mm-ddThh:mm in military time
        const input = e.target.value;
        const dtRegex = /^[1-3]\d{3}-[01]\d-[0-3]\dT[0-5]\d:[0-5]\d/;
        const dt = dtRegex.exec(input);
        this.setState({ currentSelectedDatetime: dt ? new Date(dt) : undefined });
    }

    async queryBackendForRadix() {
        // Query back end for a single chart.

        if (!this.state.currentSelectedDatetime) {
            alert("Invalid datetime!");
            return;
        }
        const query = this.state.locationInput;
        const locationResults = await geosearch(query);
        if (!locationResults) {
            alert("No location found!");
            return;
        }

        console.log(locationResults);

        const response = await axios.post(
            API_ADDRESS + "/radix",
            new RadixQuery(this.state.currentSelectedDatetime, locationResults.longitude, locationResults.latitude, locationResults.tz),
            { headers: QUERY_HEADERS }
        );

        try {
            const newChart = new Chartdata(response.data);
            // newChart.setName(name);
            this.saveChart(newChart);

            // Select the new chart. Need to figure out an alternate way eventually.
            this.onChangeSelectedChart({ target: { value: this.state.charts.length - 1 } })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="App">
                <RawChartData chart={this.state.selectedChart} />
                <Datepicker onChange={this.onDateTimeChange} />
                <LocationInput updateLocation={this.onChangeLocation} />
                <CalcButton onClick={this.queryBackendForRadix} />
                <Chartlist charts={this.state.charts ? this.state.charts : []} onChange={this.onChangeSelectedChart} />
                <RemoveButton onClick={this.resetCharts} />
            </div>
        );
    }
}

export default App;
