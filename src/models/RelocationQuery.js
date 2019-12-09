export default class RelocationQuery {
    constructor(longitude, latitude, tz, placeName, radix, returnChart = undefined) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.tz = tz;
        this.placeName = placeName;
        this.radix = radix;
        this.returnChart = returnChart;
    }
}