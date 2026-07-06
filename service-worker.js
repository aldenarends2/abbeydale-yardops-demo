const CACHE_NAME = 'abbeydale-yardops-v2';
self.addEventListener('install', event => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  self.clients.claim();
});
