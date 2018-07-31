/**
 * Service Worker
 */
var staticCacheName = 'mws-restaurant-v1';
let allCache = [
  'index.html',
  'restaurant.html',
  'js/dbhelper.js',
  'js/main.js',
  'js/restaurant_info.js',
  'sw.js',
  'css/styles.css',
  'img/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(allCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    cache.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('mws-restaurant') && cacheName != staticCacheName;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request);
    }).catch((error) => {
      console.log(error);
    })
  );
});