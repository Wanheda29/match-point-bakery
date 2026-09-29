const CACHE_PREFIX = "dulce-gestion-hrcbprhmwqmymobxumao-";
const CACHE = `${CACHE_PREFIX}v4`;
const ASSETS = ["./", "./index.html", "./styles.css?v=tennis-4", "./app.js?v=tennis-4", "./domain.js", "./storage.js", "./cloud.js", "./cloud-config.js", "./manifest.webmanifest", "./tennis-ball.svg", "./tennis-bakery.svg"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS.map((url) => new Request(url, { cache: "reload" })))));
});
self.addEventListener("activate", (event) => event.waitUntil(Promise.all([
  self.clients.claim(),
  caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE).map((key) => caches.delete(key)))),
])));
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.open(CACHE).then((cache) => cache.match("./index.html"))));
    return;
  }
  event.respondWith(caches.open(CACHE).then((cache) => cache.match(event.request)).then((cached) => cached || fetch(event.request)));
});
