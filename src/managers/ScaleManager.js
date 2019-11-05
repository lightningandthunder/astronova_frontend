import { CHART_SCALE_DEFAULTS } from "../settings";
import Scale from "../models/Scale";

export class ScaleManager {

    getChartScale(windowX, windowY, chartType, scaleFactor) {
        const origin = {x: windowX / 2, y: windowY / 2};

        if (!["Uniwheel", "Biwheel"].includes(chartType))
            throw new Error(`Invalid chart type: ${chartType}`);

        // Scale radii and fonts that are agnostic to chart-type
        let outerRing = {};
        for (let attr in CHART_SCALE_DEFAULTS.outerRingRadii)
            outerRing[attr] = CHART_SCALE_DEFAULTS.outerRingRadii[attr] * scaleFactor;

        let dividers = {};
        for (let attr in CHART_SCALE_DEFAULTS.dividerRadii)
            dividers[attr] = CHART_SCALE_DEFAULTS.dividerRadii[attr] * scaleFactor;

        let fonts = {};
        for (let attr in CHART_SCALE_DEFAULTS.fontsAndOffsets)
            fonts[attr] = CHART_SCALE_DEFAULTS.fontsAndOffsets[attr] * scaleFactor;

        // Set up the appropriate group of radii for the chart
        let chartRadii;
        switch (chartType) {
            case "Uniwheel": {
                chartRadii = CHART_SCALE_DEFAULTS.uniwheelRadii;
                break;
            }
            case "Biwheel Outer": {
                chartRadii = CHART_SCALE_DEFAULTS.biWheelOuterRadii;
                break;
            }
            case "Biwheel Inner": {
                chartRadii = CHART_SCALE_DEFAULTS.biWheelInnerRadii;
                break;
            }
            default: {
                throw new Error(`Invalid chart type: ${chartType}`);
            }
        }
        let wheelRadius = {};
        // Flatten out nested object structure
        for (let radiusGroup in chartRadii)
            for (let attr in chartRadii[radiusGroup])
                wheelRadius[attr] = chartRadii[radiusGroup][attr] * scaleFactor;

        return new Scale(origin, outerRing, wheelRadius, dividers, fonts);
    }
}



