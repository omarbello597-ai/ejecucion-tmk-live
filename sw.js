// Service worker mínimo para Ejecución TMK · LIVE
// Su única función es habilitar la instalación de la PWA.
// NO cachea la app (para que siempre se cargue la última versión desde GitHub
// y evitar el problema de "versiones viejas" por caché).

self.addEventListener('install', (e) => {
  self.skipWaiting(); // activa la nueva versión de inmediato
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Estrategia "network-first": siempre intenta la red primero.
// Si no hay conexión, intenta responder desde el caché del navegador.
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
