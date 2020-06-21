import React from 'react';
import './styles/App.css';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Chartlist from './views/chartlist';
import ResetChartsButton from './views/ResetChartsButton';
import NewChartPopup from './views/modals/NewChartPopup';
import ReturnChartPopup from './views/modals/ReturnChartPopup';
import RelocatePopup from "./views/modals/RelocatePopup"
import { logIfDebug } from './utils/utils';
import Chart from './views/chartComponents/Chart';
import ViewButtons from "./views/ViewButtons";
import PanelToggle from "./views/PanelToggle";
import { TITLE, WheelTypes } from "./settings";
import Kofi from "./views/ko-fi/Kofi";
import { errorService } from "./services/errorService";
import ErrorAlert from "./views/ErrorAlert";
import FontFaceObserver from "fontfaceobserver";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      charts: [],
      selectedChart: null,
      view: "ecliptical",
      panelToggle: "controlPanel",
      error: null,
    }

    this.addChartToState = this.saveChart.bind(this);
    this.onChangeSelectedChart = this.onChangeSelectedChart.bind(this);
    this.resetCharts = this.resetCharts.bind(this);
    this.saveChart = this.saveChart.bind(this);
    this.setSelectedChartToNewest = this.setSelectedChartToNewest.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.deleteChart = this.deleteChart.bind(this);
    this.splitCharts = this.splitCharts.bind(this);
    this.handleError = this.handleError.bind(this);
    this.onToggleControlPanel = this.onToggleControlPanel.bind(this);

    this.errorSubscription = errorService.onError().subscribe(err => this.setState({ error: err }));
  }

  /* ================ Lifecycle hooks ================ */

  componentDidMount() {
    document.title = TITLE;

    // Load fonts
    new FontFaceObserver("AstroDotBasic")
      .load()
      .then(
        // resolve
        () => this.setState({ fontsLoaded: true }),
        // reject
        () => this.setState({ err: "Unable to load fonts" })
      );

    const chartsArrayFromLS = JSON.parse(localStorage.getItem('charts'));
    if (chartsArrayFromLS)
      this.setState({ charts: [...chartsArrayFromLS] });
    else
      logIfDebug("Found no charts in LS to load");

    const selectedChartFromLS = JSON.parse(localStorage.getItem('selectedChart'));
    if (selectedChartFromLS)
      this.setState({ selectedChart: selectedChartFromLS });
    else
      logIfDebug("Found no selected chart in LS");
  }

  componentWillUnmount() {
    this.errorSubscription.unsubscribe();
  }

  /* ================ onChange methods ================ */

  saveChart(...charts) {
    // Saves to both state and localStorage
    this.setState({ charts: [...this.state.charts, ...charts] },
      () => {
        localStorage.setItem('charts', JSON.stringify(this.state.charts));
        logIfDebug("Saved charts to LS: " + this.state.charts.length);
      }
    );
  }

  deleteChart(chart) {
    const currentSelectedChart = this.state.selectedChart;
    const allCharts = this.state.charts;
    const chartIndex = allCharts.indexOf(chart);

    if (chartIndex < -1) {
      logIfDebug("Unable to remove chart; not found in chart list");
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
    if (chart.type !== WheelTypes.UNIWHEEL) {
      this.saveChart(chart.radix, chart.solunar);
      this.onChangeSelectedChart(this.state.charts[this.state.charts.length - 1]);
    }
  }

  onChangeSelectedChart(chart) {
    let selection = chart;
    if (this.state.charts.indexOf(chart) < 0)
      return;

    this.setState({ selectedChart: selection },
      () => localStorage.setItem('selectedChart', JSON.stringify(this.state.selectedChart))
    );
  }

  setSelectedChartToNewest() {
    this.onChangeSelectedChart(this.state.charts[this.state.charts.length - 1]);
  }

  handleViewChange(e) {
    this.setState({ view: e.target.value });
  }

  onToggleControlPanel(e) {
    this.setState({ panelToggle: e.target.value });
  }

  handleError(err) {
    this.setState({ error: err });
  }

  resetCharts() {
    localStorage.removeItem('charts');
    localStorage.removeItem('selectedChart')
    this.setState({ charts: [] });
    this.setState({ selectedChart: undefined })
  }

  render() {
    return (
      <div className="app">
        <ErrorAlert
          err={this.state.error}
          resetError={() => errorService.clearErrors()}
        />
        {
          this.state.fontsLoaded &&
          <div className="chart-container">
            {
              this.state.selectedChart &&
              <Chart
                width={window.innerWidth * 0.8}
                height={window.innerHeight}
                innerChart={
                  this.state.selectedChart && this.state.selectedChart.radix
                    ? this.state.selectedChart.radix
                    : this.state.selectedChart
                }
                outerChart={
                  this.state.selectedChart && this.state.selectedChart.solunar
                    ? this.state.selectedChart.solunar
                    : null
                }
                middleChart={null}
                view={this.state.view}
                handleError={this.handleError}
                mode={this.state.mode}
              />
            }
            <PanelToggle
              panelToggle={this.state.panelToggle}
              onToggleControlPanel={this.onToggleControlPanel}
            />
            {
              this.state.panelToggle === "controlPanel" &&

              <div className="ControlPanel">
                <ViewButtons
                  view={this.state.view}
                  onChangeView={this.handleViewChange}
                />
                <NewChartPopup
                  saveChart={this.saveChart}
                  setSelectedChartToNewest={this.setSelectedChartToNewest}
                />
                <RelocatePopup
                  chart={this.state.selectedChart}
                  saveChart={this.saveChart}
                  setSelectedChartToNewest={this.setSelectedChartToNewest}
                  enabled={this.state.selectedChart}
                />

                <ReturnChartPopup
                  saveChart={this.saveChart}
                  setSelectedChartToNewest={this.setSelectedChartToNewest}
                  selectedChart={this.state.selectedChart}
                  enabled={this.state.selectedChart
                    && this.state.selectedChart.type === WheelTypes.UNIWHEEL}
                />
                <ResetChartsButton
                  onClick={this.resetCharts}
                />
                <Chartlist
                  charts={this.state.charts ? this.state.charts : []}
                  selectedChart={this.state.selectedChart}
                  onChangeSelectedChart={this.onChangeSelectedChart}
                  deleteChart={this.deleteChart}
                  splitCharts={this.splitCharts}
                  handleError={this.handleError}
                />
                <Kofi></Kofi>
              </div>
            }
          </div>
        }
      </div >
    );
  }
}

export default App;

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019 Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/