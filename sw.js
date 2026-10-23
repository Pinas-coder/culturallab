const CACHE_NAME = 'culturalab-static-v2';
const BASE = new URL('./', self.location.href);
const FILES = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './manus-routes.json',
  './js/app.js',
  './js/content.js',
  './icons/mark.svg'
].map(path => new URL(path, BASE).href);

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function fetchAndRefresh(request, isNavigation = false) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    if (isNavigation) {
      const shell = await caches.match(new URL('./index.html', BASE).href);
      if (shell) return shell;
    }
    return new Response('Contenuto non disponibile offline.', {
      status: 503,
      statusText: 'Offline',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetchAndRefresh(request, request.mode === 'navigate'));
});
