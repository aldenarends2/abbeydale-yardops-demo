const CACHE_NAME = 'abbeydale-yardops-v25-stable';
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') event.respondWith(fetch(event.request));
});
