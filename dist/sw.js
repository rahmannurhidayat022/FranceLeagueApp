var serviceWorkerOption = {
  "assets": [
    "/fonts/MaterialIcons-Regular.woff2",
    "/main.bundle.js",
    "/images/H01.webp",
    "/images/H02.webp",
    "/images/H03.webp",
    "/images/No-Image.webp",
    "/images/ballLogo.png",
    "/images/card-image.webp",
    "/index.html",
    "/home.html",
    "/standings.html",
    "/saved.html",
    "/nav.html"
  ]
};
        
        !function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=0)}([function(e,r){function n(e,r){(null==r||r>e.length)&&(r=e.length);for(var n=0,t=new Array(r);n<r;n++)t[n]=e[n];return t}importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");var t,o=serviceWorkerOption.assets;workbox.precaching.precacheAndRoute([].concat(function(e){if(Array.isArray(e))return n(e)}(t=o)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(t)||function(e,r){if(e){if("string"==typeof e)return n(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?n(e,r):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[{url:"./",revision:null},{url:"./manifest.json",revision:null},{url:"./icon_72x72.png",revision:null},{url:"./icon_96x96.png",revision:null},{url:"./icon_128x128.png",revision:null},{url:"./icon_144x144.png",revision:null},{url:"./icon_152x152.png",revision:null},{url:"./icon_192x192.png",revision:null},{url:"./icon_384x384.png",revision:null},{url:"./icon_512x512.png",revision:null}]),{ignoreURLParametersMatching:[/.*/]}),workbox.routing.registerRoute((function(e){return"https://api.football-data.org"===e.url.origin}),new workbox.strategies.CacheFirst({cacheName:"football-data",plugins:[new workbox.cacheableResponse.CacheableResponse({statuses:[0,200,404],headers:{"Access-Control-Expose-Headers":"X-Is-Cacheable","X-Is-Cacheable":"yes"}})]})),self.addEventListener("push",(function(e){var r={body:e.data?e.data.text():"Matches is Updated,Lets open App!",icon:"./images/ballLogo.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1}};e.waitUntil(self.registration.showNotification("Push Notification",r))}))}]);