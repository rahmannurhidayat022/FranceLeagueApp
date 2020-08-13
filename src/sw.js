const { assets } = serviceWorkerOption;

const CACHE_NAME = "FL1 App V4";
let urlsToCache = [...assets, "./",];

urlsToCache = urlsToCache.map(path => {
  return new URL(path, global.location).toString()
})

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('message', event => {
  switch (event.data.action) {
    case 'skipWaiting':
      if (self.skipWaiting) {
        self.skipWaiting()
        self.clients.claim()
      }
      break
    default:
      break
  }
})

self.addEventListener("fetch", function (event) {
  const BASE_URL = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(BASE_URL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});

self.addEventListener('push', function (event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Matches is Updated,Lets open App!';
  }
  const options = {
    body: body,
    icon: './images/ballLogo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});