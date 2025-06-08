// sw.js
self.addEventListener('install', event => {
    // activate immediately
    event.waitUntil(self.skipWaiting());
  });
  self.addEventListener('activate', event => {
    // take control of uncontrolled clients
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
  
    // Redirect if navigating to /QuiZGenQ/QData/ or any .js file
    if (
      (url.pathname.startsWith('/QuiZGenQ/QData/') && event.request.mode === 'navigate') ||
      (url.pathname.endsWith('.js') && event.request.mode === 'navigate')
    ) {
      event.respondWith(Response.redirect('/unauthorized.html'));
      return;
    }
    // Otherwise, allow default network handling
});