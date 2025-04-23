// // sw.js
// self.addEventListener('install', event => {
//     // activate immediately
//     event.waitUntil(self.skipWaiting());
//   });
//   self.addEventListener('activate', event => {
//     // take control of uncontrolled clients
//     event.waitUntil(self.clients.claim());
//   });
  
//   self.addEventListener('fetch', event => {
//     const url = new URL(event.request.url);
  
//     // Only intercept navigation to .js files under /QuiZGenQ/QData/
//     if (
//       url.pathname.startsWith('/QuiZGenQ/QData/') &&
//       event.request.mode === 'navigate'
//     ) {
//       // Redirect to your app's main page
//       event.respondWith(Response.redirect('/unauthorized.html'));
//       return;
//     }
  
//     // Otherwise, allow default network handling
//   });