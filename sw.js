// Offline support: the app shell is cached on first visit; fonts and the
// screenshot text reader (loaded from CDNs) are cached the first time they're used.
const CACHE = "homework-v2";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const sameOrigin = new URL(req.url).origin === location.origin;
  const store = res => {
    if (res && (res.ok || res.type === "opaque")) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
    }
    return res;
  };
  if (sameOrigin) {
    // App files: newest version first so updates show up right away; cache only when offline.
    e.respondWith(
      fetch(req, { cache: "no-cache" }).then(store)
        .catch(() => caches.match(req).then(hit => hit || caches.match("index.html")))
    );
  } else {
    // Fonts and the screenshot text reader: cached copy first, so they work offline.
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(store).catch(() => Response.error()))
    );
  }
});
