const CACHE_PREFIX = 'my-apps-portal-';
const CACHE_NAME = `${CACHE_PREFIX}v2`;

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

function fetchWithTimeout(request, timeoutMs = 3500) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), timeoutMs);
    fetch(request, { cache: 'no-cache' })
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

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

  const isStaticMedia = /\.(png|svg|woff2?|ttf|ico)$/i.test(url.pathname);

  if (isStaticMedia) {
    // Cache-first for heavy icons & fonts
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // Network-first (with fast offline fallback) for HTML/JS/CSS/JSON so every git push updates immediately!
  event.respondWith(
    fetchWithTimeout(request)
      .then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return res;
      })
      .catch(() => caches.match(request))
  );
});
