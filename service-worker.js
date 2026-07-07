const CACHE_NAME = 'abbeydale-yardops-v26-install';
const APP_SHELL = ['./?v=26','./index.html','./manifest.json?v=26','./assets/app.css?v=26','./assets/app.js?v=26','./assets/abbeydale-logo.svg?v=26','./assets/icon.svg?v=26'];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(() => null));
});
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
