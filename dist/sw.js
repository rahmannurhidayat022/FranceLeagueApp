var serviceWorkerOption = {
  "assets": [
    "/fonts/MaterialIcons-Regular.woff2",
    "/main.bundle.js",
    "/manifest.json",
    "/images/H01.webp",
    "/images/H02.webp",
    "/images/H03.webp",
    "/images/ballLogo.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
    "/index.html",
    "/home.html",
    "/standings.html",
    "/saved.html",
    "/nav.html"
  ]
};
        
        !function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){(function(t){function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var n,r=serviceWorkerOption.assets,o=[].concat(function(t){if(Array.isArray(t))return e(t)}(n=r)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(n)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),["./"]);o=o.map((function(e){return new URL(e,t.location).toString()})),self.addEventListener("install",(function(t){t.waitUntil(caches.open("FL1 App V4").then((function(t){return t.addAll(o)})))})),self.addEventListener("activate",(function(t){t.waitUntil(caches.keys().then((function(t){return Promise.all(t.map((function(t){if("FL1 App V4"!=t)return console.log("ServiceWorker: cache "+t+" dihapus"),caches.delete(t)})))})))})),self.addEventListener("message",(function(t){switch(t.data.action){case"skipWaiting":self.skipWaiting&&(self.skipWaiting(),self.clients.claim())}})),self.addEventListener("fetch",(function(t){t.request.url.indexOf("https://api.football-data.org/v2/")>-1?t.respondWith(caches.open("FL1 App V4").then((function(e){return fetch(t.request).then((function(n){return e.put(t.request.url,n.clone()),n}))}))):t.respondWith(caches.match(t.request,{ignoreSearch:!0}).then((function(e){return e||fetch(t.request)})))})),self.addEventListener("push",(function(t){var e={body:t.data?t.data.text():"Matches is Updated,Lets open App!",icon:"./images/ballLogo.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1}};t.waitUntil(self.registration.showNotification("Push Notification",e))}))}).call(this,n(1))},function(t,e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"===("undefined"==typeof window?"undefined":n(window))&&(r=window)}t.exports=r}]);