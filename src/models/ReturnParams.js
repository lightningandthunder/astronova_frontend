export default class ReturnParams {
    constructor(return_planet, return_harmonic, return_longitude,
        return_latitude, return_start_date, tz, return_quantity) {
        this.return_planet = return_planet;
        this.return_harmonic = return_harmonic;
        this.return_longitude = return_longitude;
        this.return_latitude = return_latitude;
        this.return_start_date = return_start_date;
        this.tz = tz;
        this.return_quantity = return_quantity;
    }
}