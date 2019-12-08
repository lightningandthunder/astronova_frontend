import logIfDevelopment from "../utils/logIfDevelopment";
import UserConfig from "../models/UserConfig";


export default class UserConfigManager {
    constructor() {
        this.userConfig = this.loadUserConfig();
    }

    saveUserConfig() {
        localStorage.setItem("userConfig", JSON.stringify(this.userConfig));
        logIfDevelopment("Saved user config: ", this.userConfig);
    }

    loadUserConfig() {
        let config = JSON.parse(localStorage.getItem('userConfig'));
        if (config) {
            logIfDevelopment("Loaded user config: ", config);
        } else {
            logIfDevelopment("No user config found in LS; using default config");
            config = new UserConfig();
        }
        return config;
    }

    /* 
    ** Getters and setters 
    */

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