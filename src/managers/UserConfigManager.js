import logIfDebug from "../utils/logIfDebug";
import UserConfig from "../models/UserConfig";


export default class UserConfigManager {
    constructor() {
        this.userConfig = this.loadUserConfig();
    }

    saveUserConfig() {
        localStorage.setItem("userConfig", JSON.stringify(this.userConfig));
        logIfDebug("Saved user config: ", this.userConfig);
    }

    // TODO: Save default config into LS to optimize loading via parsing JSON
    // rather than instantiating a new object over and over
    loadUserConfig() {
        const config = JSON.parse(localStorage.getItem('userConfig'));
        return config ? config : new UserConfig();
    }

    // Getters and setters 

    getChartPointsEcliptical() {
        return this.userConfig.chartPointsEcliptical;
    }

    setChartPointsEcliptical(chartPoints) {
        this.userConfig.chartPointsEcliptical = chartPoints;
        this.saveUserConfig();
    }

    getChartPointsMundane() {
        return this.userConfig.chartPointsMundane;
    }

    setChartPointsMundane(chartPoints) {
        this.userConfig.chartPointsMundane = chartPoints;
        this.saveUserConfig();
    }

    getChartPointsRightAscension() {
        return this.userConfig.chartPointsRightAscension;
    }

    setChartPointsRightAscension(chartPoints) {
        this.userConfig.chartPointsRightAscension = chartPoints;
        this.saveUserConfig();
    }

    getOrb(orbName) {
        if (Object.keys(this.userConfig.orbs).indexOf(orbName) < 0)
            throw new Error(`Invalid orb name: ${orbName}`)

        return this.userConfig.orbs[orbName];
    }

    setOrb(orbName, orbValue) {
        this.userConfig.orbs[orbName] = orbValue;
        this.saveUserConfig();
    }
}