export default class Scale {
    constructor(origin, outerRingRadius, wheelParams, dividerRadius, fontsAndOffsets) {
        // These initializations can be done in a few lines with for loops, 
        // but that's much less clear about what properties this model actually has.

        this.origin = origin;
        this.signRingOuterRadius = outerRingRadius.signRingOuterRadius;
        this.cuspSignRadius = outerRingRadius.cuspSignRadius;
        this.signRingInnerRadius = outerRingRadius.signRingInnerRadius;

        this.planetRadius = wheelParams.planetRadius;
        this.planetDegreeRadius = wheelParams.planetDegreeRadius;
        this.planetSignRadius = wheelParams.planetSignRadius;
        this.planetMinuteRadius = wheelParams.planetMinuteRadius;
        this.planetMarkerOutsideRadius = wheelParams.planetMarkerOutsideRadius;
        this.planetMarkerInsideRadius = wheelParams.planetMarkerInsideRadius;

        this.houseRingOuterRadius = wheelParams.houseRingOuterRadius;
        this.houseNumberRadius = wheelParams.houseNumberRadius;
        this.houseRingInnerRadius = wheelParams.houseRingInnerRadius;

        this.dividerRadiusBiwheel = dividerRadius.dividerRadiusBiwheel;
        this.dividerRadiusTriwheelOuter = dividerRadius.dividerRadiusTriwheelOuter;
        this.dividerRadiusTriwheelInner = dividerRadius.dividerRadiusTriwheelInner;

        this.planetFontSize = wheelParams.planetFontSize;
        this.epWPFontSize = wheelParams.epWPFontSize;
        this.planetOffsetX = wheelParams.planetOffsetX;
        this.planetOffsetY = wheelParams.planetOffsetY;

        this.planetSignFontSize = wheelParams.planetSignFontSize;
        this.planetSignOffsetX = wheelParams.planetSignOffsetX;
        this.planetSignOffsetY = wheelParams.planetSignOffsetY;

        this.planetDegreesFontSize = wheelParams.planetDegreesFontSize;
        this.planetDegreesOffsetX = wheelParams.planetDegreesOffsetX;
        this.planetDegreesOffsetY = wheelParams.planetDegreesOffsetY;

        this.planetMinutesFontSize = wheelParams.planetMinutesFontSize;
        this.planetMinutesOffsetX = wheelParams.planetMinutesOffsetX;
        this.planetMinutesOffsetY = wheelParams.planetMinutesOffsetY;

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

        this.houseNumberFontSize = wheelParams.houseNumberFontSize;
        this.houseNumberOffsetX = wheelParams.houseNumberOffsetX;
        this.houseNumberOffsetY = wheelParams.houseNumberOffsetY;
    }
}