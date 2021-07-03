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

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((r) => {
    return r || fetch(event.request).then((response) => {
            return caches.open(CACHE).then((cache) => {
      console.log('[Service Worker] Caching new resource: '+event.request.url);
      cache.put(event.request, response.clone());
      return response;
    });
  });
})
  );
});
