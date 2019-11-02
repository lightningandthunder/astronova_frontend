import React from 'react';
// import Chart from './chart';
import './styles/App.css';
import Chartlist from './chartlist';
import RawChartData from './rawchartdata';
import RemoveButton from './removeButton';
import NewChartPopup from './NewChartPopup';
import ReturnChartPopup from './ReturnChartPopup';
import logIfDevelopment from './utils/logIfDevelopment';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charts: [],
            selectedChart: undefined,
        }

        this.addChartToState = this.saveChart.bind(this);
        this.onChangeSelectedChart = this.onChangeSelectedChart.bind(this);
        this.resetCharts = this.resetCharts.bind(this);
        this.saveChart = this.saveChart.bind(this);
        this.setSelectedChartToNewest = this.setSelectedChartToNewest.bind(this);
    }

    /* ================ Lifecycle hooks ================ */

    componentDidMount() {
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

    onChangeSelectedChart(e) {
        // Saves to both state and localStorage
        this.setState({ selectedChart: this.state.charts[e.target.value] },
            () => {
                localStorage.setItem('selectedChart', JSON.stringify(this.state.selectedChart));
                logIfDevelopment("Saved current selection to LS: " + this.state.selectedChart.name);
            }
        );
    }

    setSelectedChartToNewest() {
        // Select the new chart. Need to figure out an alternate way eventually.
        this.onChangeSelectedChart({ target: { value: this.state.charts.length - 1 } });
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
                <div>
                    <RawChartData className="rawchartdata" chart={this.state.selectedChart} />
                </div>

                <Chartlist charts={this.state.charts ? this.state.charts : []} onChange={this.onChangeSelectedChart} />
                <NewChartPopup
                    saveChart={this.saveChart}
                    setSelectedChartToNewest={this.setSelectedChartToNewest}
                />
                { this.state.selectedChart 
                ?
                    <ReturnChartPopup
                        saveChart={this.saveChart}
                        setSelectedChartToNewest={this.setSelectedChartToNewest}
                        selectedChart={this.state.selectedChart}
                    />
                    : <div></div>
                }
                <RemoveButton onClick={this.resetCharts} />
            </div>
        );
    }
}

export default App;
