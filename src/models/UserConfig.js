import { logIfDebug } from "../utils/utils";
import { AspectEnum } from "../settings";

const PLANETARY_CHART_POINTS = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
]

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

export default class UserConfig {
  constructor() {
    this.storageString = "userConfig";
    this.config = {};
  }

  _load() {
    const storedConfig = JSON.parse(localStorage.getItem(this.storageString));
    this.config = storedConfig ? storedConfig : Object.assign({}, DEFAULT_CONFIG);
  }

  static loadConfig() {
    const uc = new UserConfig();
    uc._load();
    return uc;
  }

  saveConfig() {
    localStorage.setItem(this.storageString, JSON.stringify(this.config));
    logIfDebug("Saved user config: ", this.config);
  }

  getPointsForChartView(chartView) {
    this._load();
    return this.config.chartViews[chartView];
  }

  setPointsForChartView(chartView, pointsArray) {
    this._load();
    this.config[chartView] = pointsArray;
    this.saveConfig();
  }

  getOrb(aspectName) {
    this._load();
    return this.config.orbs[aspectName];
  }

  setOrbs(orbs) {
    this._load();
    this.config.orbs = orbs;
    this.saveConfig();
  }

  getShowChartMetadata() {
    this._load();
    return this.config.showChartMetadata;
  }

  setShowChartMetadata(bool) {
    this._load();
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