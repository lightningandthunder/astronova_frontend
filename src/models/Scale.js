export default class Scale {
    constructor(origin, outerRingRadius, wheelRadius, dividerRadius, fontsAndOffsets) {
        // These initializations can be done in a few lines with for loops, 
        // but that's much less clear about what properties this model actually has.

        this.origin = origin;
        this.signRingOuterRadius = outerRingRadius.signRingOuterRadius;
        this.cuspSignRadius = outerRingRadius.cuspSignRadius;
        this.signRingInnerRadius = outerRingRadius.signRingInnerRadius;

        this.planetRadius = wheelRadius.planetRadius;
        this.planetDegreeRadius = wheelRadius.planetDegreeRadius;
        this.planetSignRadius = wheelRadius.planetSignRadius;
        this.planetMinuteRadius = wheelRadius.planetMinuteRadius;

        this.houseRingOuterRadius = wheelRadius.houseRingOuterRadius;
        this.houseNumberRadius = wheelRadius.houseNumberRadius;
        this.houseRingInnerRadius = wheelRadius.houseRingInnerRadius;

        this.dividerRadiusBiwheel = dividerRadius.dividerRadiusBiwheel;
        this.dividerRadiusTriwheelOuter = dividerRadius.dividerRadiusTriwheelOuter;
        this.dividerRadiusTriwheelInner = dividerRadius.dividerRadiusTriwheelInner;

        this.planetFontSize = fontsAndOffsets.planetFontSize;
        this.planetOffsetX = fontsAndOffsets.planetOffsetX;
        this.planetOffsetY = fontsAndOffsets.planetOffsetY;

        this.planetSignFontSize = fontsAndOffsets.planetSignFontSize;
        this.planetSignOffsetX = fontsAndOffsets.planetSignOffsetX;
        this.planetSignOffsetY = fontsAndOffsets.planetSignOffsetY;

        this.planetDegreesFontSize = fontsAndOffsets.planetDegreesFontSize;
        this.planetDegreesOffsetX = fontsAndOffsets.planetDegreesOffsetX;
        this.planetDegreesOffsetY = fontsAndOffsets.planetDegreesOffsetY;

        this.planetMinutesFontSize = fontsAndOffsets.planetMinutesFontSize;
        this.planetMinutesOffsetX = fontsAndOffsets.planetMinutesOffsetX;
        this.planetMinutesOffsetY = fontsAndOffsets.planetMinutesOffsetY;

        this.cuspSignFontSize = fontsAndOffsets.cuspSignFontSize;
        this.cuspSignOffsetX = fontsAndOffsets.cuspSignOffsetX;
        this.cuspSignOffsetY = fontsAndOffsets.cuspSignOffsetY;

        this.cuspDegreesFontSize = fontsAndOffsets.cuspDegreesFontSize;
        this.cuspDegreesOffsetX = fontsAndOffsets.cuspDegreesOffsetX;
        this.cuspDegreesOffsetY = fontsAndOffsets.cuspDegreesOffsetY;
        this.cuspDegreesRotationalOffset = fontsAndOffsets.cuspDegreesRotationalOffset;
        this.cuspMinutesRotationalOffset = fontsAndOffsets.cuspMinutesRotationalOffset;

        this.cuspMinsFontSize = fontsAndOffsets.cuspMinsFontSize;
        this.cuspMinsOffsetX = fontsAndOffsets.cuspMinsOffsetX;
        this.cuspMinsOffsetY = fontsAndOffsets.cuspMinsOffsetY;

        this.houseNumberFontSize = fontsAndOffsets.houseNumberFontSize;
        this.houseNumberOffsetX = fontsAndOffsets.houseNumberOffsetX;
        this.houseNumberOffsetY = fontsAndOffsets.houseNumberOffsetY;
    }
}