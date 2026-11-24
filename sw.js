const CACHE_PREFIX = 'my-apps-portal-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './apps.json',
  './assets/portal.css',
  './assets/portal.js',
  './assets/icons/icon.svg',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './gym/icons/icon.svg',
  './gym/icons/icon-192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const scopePath = new URL(self.registration.scope).pathname;

  // Allow independent child apps (e.g. ./gym/) to manage their own navigation & assets
  if (url.origin === self.location.origin && url.pathname.startsWith(scopePath)) {
    const relPath = url.pathname.slice(scopePath.length);
    const isPortalAsset =
      relPath === '' ||
      relPath === 'index.html' ||
      relPath === 'manifest.json' ||
      relPath === 'apps.json' ||
      relPath.startsWith('assets/') ||
      relPath.endsWith('/icons/icon.svg') ||
      relPath.endsWith('/icons/icon-192.png');

    if (!isPortalAsset) {
      return;
    }
  }

  // Network-first for apps.json so newly added apps appear immediately when online
  if (url.pathname.endsWith('/apps.json') || url.pathname === 'apps.json') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Stale-while-revalidate for fast instant boot + background update
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((res) => {
          if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
