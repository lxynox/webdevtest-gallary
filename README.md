# Asana WebDev Take-Home Exercise

### Preview

* local: `npm i && npm start` then `http://localhost:3000`
* live url: https://webdev-take-home-exercise-master-smysblljcx.now.sh

### Basic functionality

* client side routing
* "load more" pagination
* Pop overs for each pet

### Notes

* live url deployed via [now](https://zeit.co/now) aiming at dev only (may take a while to load)
* client-side navigations rely on browser support of history api, fallback to location not provided
* async calls are Promise based thus won't work in IE11 (polyfill required)
