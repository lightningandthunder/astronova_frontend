export default class PlanetCoords {
    constructor(coords) {
        Object.keys(coords).forEach(key => {
            this[key] = {
                name: key,
                rawCoord: coords[key],
                renderCoord: coords[key]
            };
        })
    }
}