import logIfDebug from "../utils/utils";
import { PLANETARY_CHART_POINTS, AspectEnum } from "../settings";

const DEFAULT_CONFIG = {
  chartViews: {
    ecliptical: [...PLANETARY_CHART_POINTS, "Asc", "MC", "EP"],
    mundane: [...PLANETARY_CHART_POINTS, "Asc", "MC"],
    right_ascension: [...PLANETARY_CHART_POINTS, "EP"],
  },
  orbs: {
    [AspectEnum.CONJUNCTION]: 10,
    [AspectEnum.OPPOSITION]: 10,
    [AspectEnum.SQUARE]: 7.5,
    [AspectEnum.SEMISQUARE]: 2,
    [AspectEnum.SESQUISQUARE]: 2,
    [AspectEnum.TRINE]: 6,
    [AspectEnum.SEXTILE]: 6,
  },
  showChartMetadata: false,
};

export default class UserConfigLoader {
  constructor() {
    this.storageString = "userConfig";
    this.config = {};
  }

  load() {
    const storedConfig = JSON.parse(localStorage.getItem(this.storageString));
    this.config = storedConfig ? storedConfig : Object.assign({}, DEFAULT_CONFIG);
    return this;
  }

  saveConfig() {
    localStorage.setItem(this.storageString, JSON.stringify(this.config));
    logIfDebug("Saved user config: ", this.config);
  }

  getPointsForChartView(chartView) {
    return this.config.chartViews[chartView];
  }

  setPointsForChartView(chartView, pointsArray) {
    this.config[chartView] = pointsArray;
    this.saveConfig();
  }

  getOrb(aspectName) {
    return this.config.orbs[aspectName];
  }

  setOrbs(orbs) {
    this.config.orbs = orbs;
    this.saveConfig();
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