const CACHE = 'pick-calc-v1.08';
const ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // The page itself is network-first so a new build always wins when online,
  // falling back to cache when offline. Cache-first here meant an installed
  // device kept serving whatever build it first cached.
  const accept = e.request.headers.get('accept') || '';
  if (e.request.mode === 'navigate' || accept.includes('text/html')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('/index.html')))
    );
    return;
  }

  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
