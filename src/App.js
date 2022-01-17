import React from 'react';
import FontFaceObserver from "fontfaceobserver";
import "boxicons";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { DEFAULT_CHARTS } from './defaultCharts'
import { logIfDebug } from './utils/utils';
import Chart from './views/chartComponents/Chart';
import { TITLE, WheelTypes } from "./settings";
import { errorService } from "./services/errorService";
import ErrorAlert from "./views/ErrorAlert";
import AspectLister from "./models/AspectLister";
import UserConfig from "./models/UserConfig";
import AspectPanel from "./views/AspectPanel";
import ControlPanel from "./views/ControlPanel";
import NovaNavbar from "./views/NovaNavbar";
import UserSettings from "./views/UserSettings";
import NewsPopup from "./views/modals/NewsPopup";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      charts: [],
      selectedChart: null,
      selectedChartAspects: null,
      view: "ecliptical",
      panelState: "control",
      error: null,
    }

    this.addChartToState = this.saveChart.bind(this);
    this.onChangeSelectedChart = this.onChangeSelectedChart.bind(this);
    this.resetCharts = this.resetCharts.bind(this);
    this.saveChart = this.saveChart.bind(this);
    this.setSelectedChartToNewest = this.setSelectedChartToNewest.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.deleteChart = this.deleteChart.bind(this);
    this.splitCharts = this.splitCharts.bind(this);
    this.handleError = this.handleError.bind(this);
    this.onChangeView = this.onChangeView.bind(this);
    this.setAspectsForSelectedChart = this.setAspectsForSelectedChart.bind(this);
    this.loadRandomChart = this.loadRandomChart.bind(this);

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
    if (selectedChartFromLS) {
      this.setState({ selectedChart: selectedChartFromLS },
        () => this.setAspectsForSelectedChart(this.state.selectedChart));

    } else {
      logIfDebug("Found no selected chart in LS");
      this.loadRandomChart()
    }
  }

  componentWillUnmount() {
    this.errorSubscription.unsubscribe();
  }

  /* ============== Chart CRUD Methods =============== */

  saveChart(...charts) {
    // Saves to both state and localStorage
    this.setState({ charts: [...this.state.charts, ...charts] },
      () => localStorage.setItem('charts', JSON.stringify(this.state.charts))
    );
  }

  deleteChart(chart) {
    const currentSelectedChart = this.state.selectedChart;
    const allCharts = this.state.charts;
    const chartIndex = allCharts.indexOf(chart);

    if (chartIndex < -1)
      return;

    allCharts.splice(chartIndex, 1);
    this.setState(
      { charts: [...allCharts] },
      () => { localStorage.setItem('charts', JSON.stringify(this.state.charts)) }
    )
    if (allCharts.indexOf(currentSelectedChart) >= 0)
      this.onChangeSelectedChart(currentSelectedChart)
    else
      this.onChangeSelectedChart(allCharts[chartIndex - 1 >= 0 ? chartIndex - 1 : 0]);

    if (!this.state.charts.length || !this.state.selectedChart)
      this.loadRandomChart();
  }

  splitCharts(chart) {
    if (chart.type !== WheelTypes.UNIWHEEL) {
      this.saveChart(chart.radix, chart.solunar);
      this.onChangeSelectedChart(this.state.charts[this.state.charts.length - 1]);
    }
  }

  unsplitCharts(chart) { }

  resetCharts() {
    localStorage.removeItem('charts');
    localStorage.removeItem('selectedChart')
    this.setState({ charts: [] });
    this.loadRandomChart();
  }

  setAspectsForSelectedChart(chart) {
    const radixChart = chart && chart.radix ? chart.radix : chart;
    const transitingChart = chart && chart.solunar ? chart.solunar : null;

    const radixCoords = radixChart[this.state.view];
    const transitingCoords = transitingChart && transitingChart[this.state.view];

    const config = UserConfig.loadConfig();
    const aspectLister = new AspectLister(config, radixCoords, transitingCoords);
    const aspectList = aspectLister.getAspects();
    this.setState({ selectedChartAspects: aspectList });
  }

  loadRandomChart() {
    const keys = Object.keys(DEFAULT_CHARTS);
    const randomChart = DEFAULT_CHARTS[keys[keys.length * Math.random() << 0]];
    this.setAspectsForSelectedChart(randomChart);
    this.setState({ selectedChart: randomChart });
  }

  /* ================= Event handlers ================= */


  onChangeSelectedChart(chart) {
    let selection = chart;
    if (this.state.charts.indexOf(chart) < 0)
      return;

    this.setState({ selectedChart: selection },
      () => {
        localStorage.setItem('selectedChart', JSON.stringify(this.state.selectedChart));
        this.setAspectsForSelectedChart(chart);
      }
    );
  }

  onChangeView(e) {
    this.setState(
      { view: e.target.value },
      () => this.setAspectsForSelectedChart(this.state.selectedChart)
    );
  }

  setSelectedChartToNewest() {
    this.onChangeSelectedChart(this.state.charts[this.state.charts.length - 1]);
  }

  handleIconClick(event) {
    this.setState({ panelState: event });
  }

  handleError(err) {
    this.setState({ error: err });
  }

  render() {
    return (
      <div className="app">
        <NovaNavbar
          handleIconClick={this.handleIconClick}
          panelState={this.state.panelState}
        />
        <ErrorAlert
          err={this.state.error}
          resetError={() => errorService.clearErrors()}
        />
        <NewsPopup />
        {
          this.state.fontsLoaded &&
          <div className="chart-container">
            {
              this.state.selectedChart &&
              <Chart
                name={this.state.selectedChart.name}
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
                aspects={this.state.selectedChartAspects}
              />
            }
            {
              this.state.panelState === "control" &&
              <ControlPanel
                enabled={this.state.panelState === "control"}
                view={this.state.view}
                charts={this.state.charts}
                selectedChart={this.state.selectedChart}
                onChangeView={this.onChangeView}
                saveChart={this.saveChart}
                setSelectedChartToNewest={this.setSelectedChartToNewest}
                resetCharts={this.resetCharts}
                deleteChart={this.deleteChart}
                splitCharts={this.splitCharts}
                handleError={this.handleError}
                onChangeSelectedChart={this.onChangeSelectedChart}
              />
            }
            {
              this.state.panelState === "aspects" &&
              <AspectPanel aspects={this.state.selectedChartAspects} />
            }
            {
              this.state.panelState === "settings" &&
              <UserSettings />
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