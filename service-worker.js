const CACHE_NAME = 'abbeydale-yardops-v23';
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith((async () => {
    const res = await fetch(event.request);
    const accept = event.request.headers.get('accept') || '';
    const url = new URL(event.request.url);
    const isPage = accept.includes('text/html') && (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html'));
    if (!isPage) return res;
    const html = await res.text();
    const patch = '<script src="assets/live-catalog-patch.js?v=23"></script>';
    return new Response(html.replace('</body>', patch + '</body>'), { headers: { 'content-type': 'text/html; charset=utf-8' } });
  })());
});
