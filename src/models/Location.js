export default class Location {
    constructor(geo) {
        this.longitude = geo.data.lon;
        this.latitude = geo.data.lat;
        this.tz = geo.tz;
    }
}