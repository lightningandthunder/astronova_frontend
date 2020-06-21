const QUERY_HEADERS = { "Content-Type": "application/json" };
const API_ADDRESS = "http://localhost:5000";
const VERSION = "0.2.0a"
const TITLE = `Nova ${VERSION}`

const SIGNS = ["Ari", "Tau", "Gem", "Can", "Leo", "Vir", "Lib", "Sco", "Sag", "Cap", "Aqu", "Pis"];
const CUSPS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const RingLayerEnum = Object.freeze({
  UNIWHEEL: "Uniwheel",
  BIWHEEL_INNER: "Biwheel Inner",
  BIWHEEL_OUTER: "Biwheel Outer",
  TRIWHEEL_INNER: "Triwheel Inner",
  TRIWHEEL_MIDDLE: "Triwheel Middle",
  TRIWHEEL_OUTER: "Triwheel Outer",
});

const ChartViews = Object.freeze({
  ECLIPTICAL: "ecliptical",
  MUNDANE: "mundane",
  RIGHT_ASCENSION: "right_ascension",
});

const AspectEnum = Object.freeze({
  CONJUNCTION: "Cnj",
  OPPOSITION: "Opp",
  SQUARE: "Sqr",
  SEMISQUARE: "Sms",
  SESQUISQUARE: "Sqq",
  TRINE: "Tri",
  SEXTILE: "Sxt",
});

const WheelTypes = Object.freeze({
  UNIWHEEL: "Uniwheel",
  BIWHEEL: "Biwheel",
  TRIWHEEL: "Triwheel",
})

const PLANET_COLORS = {
  "Sun": "gold",
  "Moon": "gray",
  "Mercury": "orange",
  "Venus": "green",
  "Mars": "red",
  "Jupiter": "purple",
  "Saturn": "indigo",
  "Uranus": "blue",
  "Neptune": "cyan",
  "Pluto": "crimson"
}

const ASPECT_COLORS = {
  "Cnj": "black",
  "Opp": "red",
  "Sqr": "blue",
  "Sms": "purple",
  "Sqq": "purple",
  "Tri": "green",
  "Sxt": "green"
}

const SIGN_COLORS = {
  "Ari": "red",
  "Tau": "green",
  "Gem": "cyan",
  "Can": "blue",
  "Leo": "red",
  "Vir": "green",
  "Lib": "cyan",
  "Sco": "blue",
  "Sag": "red",
  "Cap": "green",
  "Aqu": "cyan",
  "Pis": "blue"
}

export {
  TITLE,
  VERSION,
  QUERY_HEADERS,
  API_ADDRESS,
  CUSPS,
  SIGNS,
  RingLayerEnum,
  PLANET_COLORS,
  SIGN_COLORS,
  ASPECT_COLORS,
  ChartViews,
  AspectEnum,
  WheelTypes,
};