const CACHE_NAME = 'abbeydale-yardops-v27-brand';
const APP_SHELL = ['./?v=27','./index.html','./manifest.json?v=27','./assets/app.css?v=27','./assets/app.js?v=27','./assets/abbeydale-logo.svg?v=27','./assets/icon.svg?v=27'];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(() => null));
});
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
