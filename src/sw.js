importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

const { assets } = serviceWorkerOption;

workbox.precaching.precacheAndRoute([
  ...assets,
  { url: './', revision: null },
  { url: './manifest.json', revision: null },
  { url: './icon_72x72.png', revision: null },
  { url: './icon_96x96.png', revision: null },
  { url: './icon_128x128.png', revision: null },
  { url: './icon_144x144.png', revision: null },
  { url: './icon_152x152.png', revision: null },
  { url: './icon_192x192.png', revision: null },
  { url: './icon_384x384.png', revision: null },
  { url: './icon_512x512.png', revision: null },
], { ignoreURLParametersMatching: [/.*/] });

workbox.routing.registerRoute(
  ({ url }) => url.origin === 'https://api.football-data.org',
  new workbox.strategies.CacheFirst({
    cacheName: 'football-data',
    plugins: [
      new workbox.cacheableResponse.CacheableResponse(({
        statuses: [0, 200, 404],
        headers: {
          'Access-Control-Expose-Headers': 'X-Is-Cacheable',
          'X-Is-Cacheable': 'yes'
        }
      }))
    ]
  })
);

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