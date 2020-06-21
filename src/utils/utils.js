export function logIfDebug(...data) {
  if (!process.env.NODE_ENV
    || process.env.NODE_ENV === "development"
    || window.novaDebugMode)
    console.log(...data);
}

export function getSymbol(name) {
  // Get unicode or font-specific character from the name of a planet, sign, or aspect.

  const mapping = {
    // Planets
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
    "IC": "IC",

    // Aspects - AstroDotBasic
    "Cnj": "m",
    "Opp": "n",
    "Sqr": "o",
    "Sms": "t",
    "Sqq": "u",
    "Tri": "p",
    "Sxt": "q",

    // Signs - AstroDotBasic
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
    "Pis": "l",
  };

  const convertedValue = mapping[name];
  if (!convertedValue)
    logIfDebug(`Unable to find unicode or letter for ${name}`);

  return convertedValue;
}

/*
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/