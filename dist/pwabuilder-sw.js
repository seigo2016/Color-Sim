const CACHE_NAME = "itokake-v2";

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
  'manifest.json',
  '/'
];

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(offlineFallbackPages))
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((r) => {
      if (r) {
        return r;
      }
      let fetchRequest = event.request.clone();
      return fetch(fetchRequest, {redirect: "follow"}).then(
        function(response){
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          let  responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseToCache));
          return response;
        }
      );
    })
  );
});
