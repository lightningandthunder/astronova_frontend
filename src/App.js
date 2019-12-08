import React from 'react';
import './styles/App.css';
import './styles/index.css';

import Chartlist from './views/chartlist';
// import RawChartData from './views/rawchartdata';
import ResetChartsButton from './views/ResetChartsButton';
import NewChartPopup from './views/modals/NewChartPopup';
import ReturnChartPopup from './views/modals/ReturnChartPopup';
import logIfDevelopment from './utils/logIfDevelopment';
import Chart from './views/Chart';
import ViewButtons from "./views/ViewButtons";
import ModeButtons from "./views/ModeButtons";
import { TITLE } from "./settings";

const defaultScaleFactor = Math.min(
    window.innerHeight / 675,  // If the window is wide
    window.innerWidth * 0.8 / 675 // If the window is narrow, leave room for controls
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: [],
            selectedChart: undefined,
            view: "ecliptical",
            mode: "chart"
        }

        this.addChartToState = this.saveChart.bind(this);
        this.onChangeSelectedChart = this.onChangeSelectedChart.bind(this);
        this.resetCharts = this.resetCharts.bind(this);
        this.saveChart = this.saveChart.bind(this);
        this.setSelectedChartToNewest = this.setSelectedChartToNewest.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.deleteChart = this.deleteChart.bind(this);
        this.splitCharts = this.splitCharts.bind(this);
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

    saveChart(...charts) {
        // Saves to both state and localStorage
        this.setState({ charts: [...this.state.charts, ...charts] },
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
            })
        if (allCharts.indexOf(currentSelectedChart) >= 0)
            this.onChangeSelectedChart(currentSelectedChart)
        else
            this.onChangeSelectedChart(allCharts[chartIndex - 1 >= 0 ? chartIndex - 1 : 0]);
    }

    splitCharts(chart) {
        if (chart.type !== "Uniwheel") {
            this.saveChart(chart.radix, chart.returnChart);
            this.onChangeSelectedChart(this.state.charts[this.state.charts.length - 1]);
        }

    }

    onChangeSelectedChart(chart) {
        let selection = chart;
        if (this.state.charts.indexOf(chart) < 0)
            return;

        // Saves to both state and localStorage
        this.setState({ selectedChart: selection },
            () => {
                localStorage.setItem('selectedChart', JSON.stringify(this.state.selectedChart));
            }
        );
    }

    setSelectedChartToNewest() {
        this.onChangeSelectedChart(this.state.charts[this.state.charts.length - 1]);
    }

    handleViewChange(e) {
        this.setState({ view: e.target.value });
    }

    handleModeChange(e) {
        this.setState({ mode: e.target.value });
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
                <div className="Chart">
                    {/* ======== Uniwheel Chart ======== */}
                    {
                        this.state.selectedChart &&
                        this.state.selectedChart.type === "Uniwheel" &&
                        <Chart
                            width={window.innerWidth * 0.8}
                            height={window.innerHeight}
                            chart={this.state.selectedChart}
                            view={this.state.view}
                            mode={this.state.mode}
                            scaleFactor={defaultScaleFactor}
                        />
                    }
                    {/* ======== Biwheel Chart ======== */}
                    {
                        this.state.selectedChart &&
                        this.state.selectedChart.type === "Biwheel" &&
                        <Chart
                            width={window.innerWidth * 0.8}
                            height={window.innerHeight}
                            chart={this.state.selectedChart}
                            view={this.state.view}
                            mode={this.state.mode}
                            scaleFactor={defaultScaleFactor}
                        />
                    }
                </div>
                <div className="ControlPanel">
                    <ViewButtons
                        view={this.state.view}
                        onChangeView={this.handleViewChange}
                    />
                    < ModeButtons
                        mode={this.state.mode}
                        onChangeMode={this.handleModeChange}
                    />
                    <NewChartPopup
                        saveChart={this.saveChart}
                        setSelectedChartToNewest={this.setSelectedChartToNewest}
                    />
                    {/* ======== Button for solunar return chart ======== */}

                    <ReturnChartPopup
                        saveChart={this.saveChart}
                        setSelectedChartToNewest={this.setSelectedChartToNewest}
                        selectedChart={this.state.selectedChart}
                        enabled={this.state.selectedChart
                            && this.state.selectedChart.type === "Uniwheel"}
                    />
                    <ResetChartsButton onClick={this.resetCharts} />
                    <Chartlist className="chartList"
                        charts={this.state.charts ? this.state.charts : []}
                        selectedChart={this.state.selectedChart}
                        onChangeSelectedChart={this.onChangeSelectedChart}
                        deleteChart={this.deleteChart}
                        splitCharts={this.splitCharts}
                    />
                </div>
            </div>
        );
    }
}

export default App;

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/