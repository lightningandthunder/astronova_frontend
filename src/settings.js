const QUERY_HEADERS = { "Content-Type": "application/json" };
const API_ADDRESS = "http://localhost:5000";
const VERSION = "0.2.0a"
const TITLE = `Nova ${VERSION}`

const SIGNS = ["Ari", "Tau", "Gem", "Can", "Leo", "Vir", "Lib", "Sco", "Sag", "Cap", "Aqu", "Pis"];
const CUSPS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const WheelRingEnum = Object.freeze({
  UNIWHEEL: "Uniwheel",
  BIWHEEL_INNER: "Biwheel Inner",
  BIWHEEL_OUTER: "Biwheel Outer",
  TRIWHEEL_INNER: "Triwheel Inner",
  TRIWHEEL_MIDDLE: "Triwheel Middle",
  TRIWHEEL_OUTER: "Triwheel Outer",
});

const CHART_SCALE_DEFAULTS = {
  outerRingRadii: {
    signRingOuterRadius: 330,
    cuspSignRadius: 315,
    signRingInnerRadius: 300
  },
  uniwheelRadii: {
    planetRingRadii: {
      planetRadius: 280,
      planetDegreeRadius: 255,
      planetSignRadius: 235,
      planetMinuteRadius: 210,
      planetMarkerOutsideRadius: 175,
      planetMarkerInsideRadius: 170
    },
    houseRingRadii: {
      houseRingOuterRadius: 170,
      houseNumberRadius: 155,
      houseRingInnerRadius: 140,
    },
    fontsAndOffsets: {
      planetFontSize: 22,
      epWPFontSize: 14,
      planetOffsetX: 8,
      planetOffsetY: 8,

      planetSignFontSize: 14,
      planetSignOffsetX: 8,
      planetSignOffsetY: 12,

      planetDegreesFontSize: 14,
      planetDegreesOffsetX: 8,
      planetDegreesOffsetY: 8,

      planetMinutesFontSize: 12,
      planetMinutesOffsetX: 8,
      planetMinutesOffsetY: 8,

      houseNumberFontSize: 16,
      houseNumberOffsetX: 8,
      houseNumberOffsetY: 8,
    }
  },
  biWheelOuterRadii: {
    planetRingRadii: {
      planetRadius: 280,
      planetDegreeRadius: 255,
      planetSignRadius: 235,
      planetMinuteRadius: 220,
      planetMarkerOutsideRadius: 210,
      planetMarkerInsideRadius: 205
    },
    houseRingRadii: {
      houseRingOuterRadius: 105,
      houseNumberRadius: 90,
      houseRingInnerRadius: 75,
    },
    fontsAndOffsets: {
      planetFontSize: 22,
      epWPFontSize: 14,
      planetOffsetX: 8,
      planetOffsetY: 8,

      planetSignFontSize: 14,
      planetSignOffsetX: 8,
      planetSignOffsetY: 8,

      planetDegreesFontSize: 14,
      planetDegreesOffsetX: 8,
      planetDegreesOffsetY: 8,

      planetMinutesFontSize: 12,
      planetMinutesOffsetX: 8,
      planetMinutesOffsetY: 8,

      houseNumberFontSize: 16,
      houseNumberOffsetX: 8,
      houseNumberOffsetY: 8,
    }
  },
  biWheelInnerRadii: {
    planetRingRadii: {
      planetRadius: 190,
      planetDegreeRadius: 165,
      planetSignRadius: 140,
      planetMinuteRadius: 120,
      planetMarkerOutsideRadius: 110,
      planetMarkerInsideRadius: 105
    },
    houseRingRadii: {
      houseRingOuterRadius: 105,
      houseNumberRadius: 90,
      houseRingInnerRadius: 75,
    },
    fontsAndOffsets: {
      planetFontSize: 22,
      epWPFontSize: 14,
      planetOffsetX: 8,
      planetOffsetY: 8,

      planetSignFontSize: 14,
      planetSignOffsetX: 8,
      planetSignOffsetY: 8,

      planetDegreesFontSize: 14,
      planetDegreesOffsetX: 8,
      planetDegreesOffsetY: 8,

      planetMinutesFontSize: 12,
      planetMinutesOffsetX: 8,
      planetMinutesOffsetY: 8,

      houseNumberFontSize: 16,
      houseNumberOffsetX: 8,
      houseNumberOffsetY: 8,
    }
  },
  dividerRadii: {
    dividerRadiusBiwheel: 205,
    dividerRadiusTriwheelOuter: 7,
    dividerRadiusTriwheelInner: 4
  },
  cuspFontsAndOffsets: {
    cuspSignFontSize: 14,
    cuspSignOffsetX: 8,
    cuspSignOffsetY: 8,

    cuspDegreesFontSize: 14,
    cuspDegreesOffsetX: 8,
    cuspDegreesOffsetY: 8,
    cuspDegreesRotationalOffset: -4,
    cuspMinutesRotationalOffset: 4,

    cuspMinsFontSize: 14,
    cuspMinsOffsetX: 8,
    cuspMinsOffsetY: 8,
  }
}

const PLANET_UNICODE = {
  "Sun": "\u2609",
  "Moon": "\u263D",
  "Mercury": "\u263F",
  "Venus": "\u2640",
  "Mars": "\u2642",
  "Jupiter": "\u2643",
  "Saturn": "\u2644",
  "Uranus": "\u2645",
  "Neptune": "\u2646",
  "Pluto": "\u2647",
  "EP": "EP",
  "WP": "WP",
  "Asc": "Asc",
  "MC": "MC",
  "Dsc": "Dsc",
  "IC": "IC"
}

const PLANET_COLORS = {
  "Sun": "yellow",
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

const ASPECT_UNICODE = {
  //AstroDotBasic
  "Cnj": "m",
  "Opp": "n",
  "Sqr": "o",
  "Sms": "t",
  "Sqq": "u",
  "Tri": "p",
  "Sxt": "q"

  //EnigmaAstrology
  // "Cnj": "B",
  // "Opp": "C",
  // "Sqr": "E",
  // "Sms": "I",
  // "Sqq": "J",
  // "Tri": "D",
  // "Sxt": "F"
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

const SIGN_UNICODE = {
  // AstroDotBasic
  "Ari": "a",
  "Tau": "b",
  "Gem": "c",
  "Can": "d",
  "Leo": "e",
  "Vir": "f",
  "Lib": "g",
  "Sco": "h",
  "Sag": "i",
  "Cap": "j",
  "Aqu": "k",
  "Pis": "l"

  //EnigmaAstrology
  // "Ari": "1",
  // "Tau": "2",
  // "Gem": "3",
  // "Can": "4",
  // "Leo": "5",
  // "Vir": "6",
  // "Lib": "7",
  // "Sco": "8",
  // "Sag": "9",
  // "Cap": "0",
  // "Aqu": "-",
  // "Pis": "="
}


export {
  QUERY_HEADERS,
  API_ADDRESS,
  WheelRingEnum,
  PLANET_COLORS,
  PLANET_UNICODE,
  SIGN_COLORS,
  SIGN_UNICODE,
  SIGNS,
  CUSPS,
  CHART_SCALE_DEFAULTS,
  VERSION,
  TITLE,
  ASPECT_UNICODE,
  ASPECT_COLORS
};