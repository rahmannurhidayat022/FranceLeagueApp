var serviceWorkerOption = {
  "assets": [
    "/fonts/MaterialIcons-Regular.woff2",
    "/main.bundle.js",
    "/service-worker.js",
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
        
        !function(e){var n={};function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(i,o,function(n){return e[n]}.bind(null,o));return i},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n){var t=["./","./manifest.json","./service-worker.js","./main.bundle.js","./index.html","./nav.html","./home.html","./saved.html","./standings.html","./images/ballLogo.png","./images/H01.webp","./images/H02.webp","./images/H03.webp","./images/icons/icon-72x72.png","./images/icons/icon-96x96.png","./images/icons/icon-128x128.png","./images/icons/icon-144x144.png","./images/icons/icon-152x152.png","./images/icons/icon-192x192.png","./images/icons/icon-384x384.png","./images/icons/icon-512x512.png","./fonts/MaterialIcons-Regular.woff2","https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"];self.addEventListener("install",(function(e){e.waitUntil(caches.open("FL1 App").then((function(e){return e.addAll(t)})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if("FL1 App"!=e)return console.log("ServiceWorker: cache "+e+" dihapus"),caches.delete(e)})))})))})),self.addEventListener("fetch",(function(e){e.request.url.indexOf("https://api.football-data.org/v2/")>-1?e.respondWith(caches.open("FL1 App").then((function(n){return fetch(e.request).then((function(t){return n.put(e.request.url,t.clone()),t}))}))):e.respondWith(caches.match(e.request,{ignoreSearch:!0}).then((function(n){return n||fetch(e.request)})))})),self.addEventListener("push",(function(e){var n={body:e.data?e.data.text():"Matches is Updated,Lets open App!",icon:"./images/ballLogo.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1}};e.waitUntil(self.registration.showNotification("Push Notification",n))}))}]);