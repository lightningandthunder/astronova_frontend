export default function logIfDevelopment(...data) {
    if (!process.env.NODE_ENV 
        || process.env.NODE_ENV === "development"
        || window.novaDebugMode)
        console.log(...data);
}

/* 
* Nova, a free sidereal astrological tool.
* Copyright (C) 2019  Mike Verducci
* This project is under the GNU General Public License V3.
* The full license may be found in src/LICENSE.txt
*/