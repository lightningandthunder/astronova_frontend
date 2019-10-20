export default class Chartdata {
    constructor(data) {
        this.name = data.local_datetime  // default value
        this.ecliptical = data.ecliptical;
        this.mundane = data.mundane;
        this.right_ascension = data.right_ascension;
        this.angles = data.angles;
        this.cusps = data.cusps;
        this.julian_day = data.julian_day;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.obliquity = data.obliquity;
        this.lst = data.lst;
        this.ramc = data.ramc;
        this.svp = data.svp;
    }

    setName(name) {
        this.name = name;
    }

}
