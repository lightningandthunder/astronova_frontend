import logIfDebug from "../utils/logIfDebug";
import UserConfig from "./UserConfig";
import { PLANETARY_CHART_POINTS } from "../settings";

DEFAULT_CONFIG = {
  chartViews: {
    ecliptical: [...PLANETARY_CHART_POINTS, "Asc", "MC", "EP"],
    mundane: [...PLANETARY_CHART_POINTS, "Asc", "MC"],
    right_ascension: [...PLANETARY_CHART_POINTS, "EP"],
  },
  orbs: {
    Cnj: 10,
    Opp: 10,
    Sqr: 7.5,
    Sms: 2,
    Sqq: 2,
    Tri: 6,
    Sxt: 6,
  },
  showChartMetadata: false,
};

export default class UserConfig {
  constructor() {
    this.storageString = "userConfig";
    this.config = {};
  }

  static loadConfig() {
    const storedConfig = JSON.parse(localStorage.getItem(this.storageString));
    this.config = storedConfig ? storedConfig : Object.assign({}, DEFAULT_CONFIG);
    return this;
  }

  saveConfig() {
    localStorage.setItem(this.storageString, JSON.stringify(this.config));
    logIfDebug("Saved user config: ", this.userConfig);
  }

  getPointsForChartView(chartView) {
    return this.config.chartViews[chartView];
  }

  setPointsForChartView(chartView, pointsArray) {
    this.config[chartView] = pointsArray;
    this.saveConfig();
  }

  getOrbs() {
    return this.config.orbs;
  }

  setOrbs(orbs) {
    this.config.orbs = orbs;
    this.saveConfig;
  }

  getShowChartMetadata() {
    return this.config.showChartMetadata;
  }

  setShowChartMetadata(bool) {
    this.config.showChartMetadata = bool;
    this.saveConfig();
  }
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/