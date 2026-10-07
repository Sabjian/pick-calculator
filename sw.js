const CACHE = 'pick-calc-v1.12';
// Relative to this script, so they resolve inside the app's own folder. On GitHub
// Pages that is /pick-calculator/; root paths like '/index.html' pointed at the
// site root, which 404s, and one failed file fails the whole install, so the
// worker never ran there.
const ASSETS = ['./', './index.html', './manifest.json'];

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
  // device kept serving whatever build it first cached. 'no-cache' makes the
  // browser check with the server rather than reuse its own copy: Pages allows
  // ten minutes of reuse, which kept serving the old build after a deploy.
  const accept = e.request.headers.get('accept') || '';
  if (e.request.mode === 'navigate' || accept.includes('text/html')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-cache' }).then(res => {
        // Only a good page is kept for offline use, never an error or a redirect.
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
