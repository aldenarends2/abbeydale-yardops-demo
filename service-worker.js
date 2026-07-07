const CACHE_NAME = 'abbeydale-yardops-v28-production-assets';
const APP_SHELL = ['./?v=28','./index.html','./manifest.json?v=28','./assets/app.css?v=28','./assets/app.js?v=28','./assets/abbeydale-logo.svg?v=28','./assets/icon.svg?v=28','./assets/yardops-splash.svg?v=28'];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(() => null));
});
self.addEventListener('activate', event => event.waitUntil((async()=>{
  try {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
  } catch(e) {}
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
