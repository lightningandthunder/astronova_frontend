# Nova
Nova is a free tool for students of sidereal astrology that offers full natal and solunar return calculation, as well as mundane and right ascension analogue chart views and an aspect list. 

The core calculation routines are handled by the Swiss Ephemeris library and ephemeris files, and are supplemented by traditional sidereal calculations compiled by the community.

This project is open source under the GNU General Public License V3.

### Running this project
Make sure that the API is already running locally.
```js
npm i
npm start
```

### TODO list
[] Add Asc/MC/EP to aspect list
[] Include Eris, Sedna, and other bodies (dependency on API)
[] Enable control panel + user configuration
[] Use Propstyles (?)
[] Switch to Styledicons
[] Integrate Typescript
[] First-party implementation of modals
[] Chart metadata modal
[] Error toasts
[] RxJS instead of functions passed as props
[] Copy to clipboard
[] Export chart as text
[] Konva -> D3 for chart visuals?
[] Retrograde indicator in chart, aspect panel (dependency on API)
[] Transit calendar
[] Progressed charts
[] Kinetic charts (triwheels)
