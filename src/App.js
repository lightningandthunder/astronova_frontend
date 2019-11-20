import React from 'react';
import './styles/App.css';

import Chartlist from './views/chartlist';
// import RawChartData from './views/rawchartdata';
import RemoveButton from './views/removeButton';
import NewChartPopup from './views/modals/NewChartPopup';
import ReturnChartPopup from './views/modals/ReturnChartPopup';
import logIfDevelopment from './utils/logIfDevelopment';
import Chart from './views/Chart';
import ViewButtons from "./views/ViewButtons";
import { TITLE } from "./settings";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: [],
            selectedChart: undefined,
            view: "ecliptical"
        }

        this.addChartToState = this.saveChart.bind(this);
        this.onChangeSelectedChart = this.onChangeSelectedChart.bind(this);
        this.resetCharts = this.resetCharts.bind(this);
        this.saveChart = this.saveChart.bind(this);
        this.setSelectedChartToNewest = this.setSelectedChartToNewest.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.deleteChart = this.deleteChart.bind(this);
    }

    /* ================ Lifecycle hooks ================ */

    componentDidMount() {
        document.title = TITLE;
        window.novaDebugMode = false;
        const chartsArray = JSON.parse(localStorage.getItem('charts'));
        if (chartsArray)
            this.setState({ charts: [...chartsArray] });
        else
            logIfDevelopment("Found no charts in LS to load");

        const selectedChartFromLS = JSON.parse(localStorage.getItem('selectedChart'));
        if (selectedChartFromLS) {
            this.setState({ selectedChart: selectedChartFromLS });
            logIfDevelopment("Loaded selected chart from LS: " + selectedChartFromLS.name);
        }
        else
            logIfDevelopment("Found no selected chart in LS");
    }

    /* ================ onChange methods ================ */

    saveChart(chart) {
        // Saves to both state and localStorage
        this.setState({ charts: [...this.state.charts, chart] },
            () => {
                localStorage.setItem('charts', JSON.stringify(this.state.charts));
                logIfDevelopment("Saved charts to LS: " + this.state.charts.length);
            }
        );
    }

    deleteChart(chart) {
        const currentSelectedChart = this.state.selectedChart;
        const allCharts = this.state.charts;
        const chartIndex = allCharts.indexOf(chart);

        if (chartIndex < -1) {
            logIfDevelopment("Unable to remove chart; not found in chart list");
            return;
        }
        allCharts.splice(chartIndex, 1);
        this.setState({ charts: [...allCharts] },
            () => {
                localStorage.setItem('charts', JSON.stringify(this.state.charts));
                logIfDevelopment(`Deleted ${chart.name}; saved remaining charts to LS.`);
            })
        if (allCharts.indexOf(currentSelectedChart) >= 0)
            this.onChangeSelectedChart(currentSelectedChart)
        else
            this.onChangeSelectedChart(allCharts[chartIndex - 1 >= 0 ? chartIndex - 1 : 0]);
    }

    onChangeSelectedChart(chart) {
        let selection = chart;
        if (this.state.charts.indexOf(chart) < 0)
            return;

        // Saves to both state and localStorage
        this.setState({ selectedChart: selection },
            () => {
                localStorage.setItem('selectedChart', JSON.stringify(this.state.selectedChart));
                logIfDevelopment("Saved current selection to LS: " + this.state.selectedChart.name);
            }
        );
    }

    setSelectedChartToNewest() {
        this.onChangeSelectedChart(this.state.charts[this.state.charts.length - 1]);
    }

    handleViewChange(e) {
        this.setState({ view: e.target.value });
    }

    // This should be in another section; will eventually reorganize
    resetCharts() {
        localStorage.removeItem('charts');
        localStorage.removeItem('selectedChart')
        this.setState({ charts: [] });
        this.setState({ selectedChart: undefined })
    }

    render() {
        return (
            <div className="App">
                {/* ======== Uniwheel ======== */}
                {
                    this.state.selectedChart &&
                    this.state.selectedChart.type === "Uniwheel" &&
                    <Chart
                        width={window.innerWidth}
                        height={window.innerHeight}
                        chart={this.state.selectedChart}
                        view={this.state.view}
                        scaleFactor={1.2}
                    />
                }

                {/* ======== Biwheel ======== */}
                {
                    this.state.selectedChart &&
                    this.state.selectedChart.type === "Biwheel" &&
                    <Chart
                        width={window.innerWidth}
                        height={window.innerHeight}
                        chart={this.state.selectedChart}
                        view={this.state.view}
                        scaleFactor={1.2}
                    />
                }
                <ViewButtons
                    view={this.state.view}
                    onChangeView={this.handleViewChange}
                />
                <Chartlist className="chartList"
                    charts={this.state.charts ? this.state.charts : []}
                    selectedChart={this.state.selectedChart}
                    onChangeSelectedChart={this.onChangeSelectedChart}
                    deleteChart={this.deleteChart}
                />
                <NewChartPopup
                    saveChart={this.saveChart}
                    setSelectedChartToNewest={this.setSelectedChartToNewest}
                />

                {/* ======== Button for solunar return chart ======== */}
                {
                    this.state.selectedChart
                        ? <ReturnChartPopup
                            saveChart={this.saveChart}
                            setSelectedChartToNewest={this.setSelectedChartToNewest}
                            selectedChart={this.state.selectedChart}
                        />
                        : <div></div>
                }
                <RemoveButton onClick={this.resetCharts} />
            </div >
        );
    }
}

export default App;
