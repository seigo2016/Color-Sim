const CACHE = "itokake-v2";

const offlineFallbackPages = [
  'index.html',
  'animation.html',
  'help.html',
  'css/',
  'main.js',
  'bundle.js',
  'animation.js',
  'pwabuilder-sw.js',
  'icon/',
];

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(offlineFallbackPages))
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((r) => {
      if (r) {
        return r
      }
      return fetch(event.request);
    })
  );
});
