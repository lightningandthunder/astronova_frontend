import React from 'react';
// import Chart from './chart';
import Datepicker from './datepicker';
import './App.css';
import axios from 'axios';
import CalcButton from './calculatebutton';
import Chartdata from './models/chartdata';
import Chartlist from './chartlist';
import RawChartData from './rawchartdata';
import geosearch from './utils/geosearch';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: [],
            currentSelection: undefined,
            currentSelectedDatetime: undefined 
        }

        this.postToRestApi = this.postToRestApi.bind(this);
        this.addChartToState = this.addChartToState.bind(this);
        this.onChangeSelectedChart = this.onChangeSelectedChart.bind(this);
        this.onDateTimeChange = this.onDateTimeChange.bind(this);

    }

    componentDidMount() {
        const chartsArray = JSON.parse(localStorage.getItem('Charts'));
        if (chartsArray){
            this.setState({charts: chartsArray});
        }
    }

    componentWillUnmount() {
        localStorage.setItem('Charts', JSON.stringify(this.state.charts));
    }

    addChartToState(chart) {
        this.setState({ charts: [...this.state.charts, chart] });
    }

    onChangeSelectedChart(e) {
        this.setState({ currentSelection: this.state.charts[e.target.value] })
    }

    onDateTimeChange(e) {
        // YYYY-mm-ddThh:mm in military time
        const input = e.target.value;
        const dtRegex = /^[1-3]\d{3}-[01]\d-[0-3]\dT[0-5]\d:[0-5]\d/;
        const dt = dtRegex.exec(input);
        this.setState({currentSelectedDatetime: dt ? new Date(dt) : undefined});
    }

    async postToRestApi() {
        if (!this.state.currentSelectedDatetime){
            alert("Invalid datetime!");
            return;
        }

        const dt = new Date(this.state.currentSelectedDatetime);
        console.log(dt);

        const response = await axios.post(
            "http://localhost:5000/radix",
            {
                local_datetime: dt,
                longitude: "-74.0356",
                latitude: "40.889",
                tz: "America/New_York"
            },
            { headers: { "Content-Type": "application/json" } }
        );

        try {
            const newChart = new Chartdata(response.data);
            // newChart.setName(name);
            this.addChartToState(newChart);
            if (this.state.charts.length === 1)
                this.onChangeSelectedChart({ target: { value: 0 } }) // Need to figure out an alternate way eventually
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="App">
                <button onClick={geosearch}>Geosearch</button>
                <RawChartData chart={this.state.currentSelection} />
                <Datepicker onChange={this.onDateTimeChange}/>
                <CalcButton onClick={this.postToRestApi} />
                <Chartlist charts={this.state.charts ? this.state.charts : []} onChange={this.onChangeSelectedChart} />
            </div>
        );
    }
}

export default App;
