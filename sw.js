// Service Worker generado automáticamente
const CACHE_NAME = "app-cache-v1";

const PRECACHE_URLS = [
  "/documentos.html",
  "/index.html",
  "/css/accesibillity-menu.css",
  "/css/bg-image.css",
  "/css/box-advice.css",
  "/css/dialog-box.css",
  "/css/dialog-event.css",
  "/css/div-line.css",
  "/css/general-settings.css",
  "/css/header&footer.css",
  "/css/mobile-header.css",
  "/css/nav-links.css",
  "/css/nprogress.css",
  "/css/search-box.css",
  "/css/validation-box.css",
  "/fonts/NotoSans/NotoSans-Bold.ttf",
  "/fonts/NotoSans/NotoSans-Light.ttf",
  "/fonts/NotoSans/NotoSans-Medium.ttf",
  "/fonts/NotoSans/NotoSans-Regular.ttf",
  "/icons/079.svg",
  "/icons/accesibillity-new.svg",
  "/icons/advise-icon.svg",
  "/icons/docto.svg",
  "/icons/facebook.svg",
  "/icons/favicon.png",
  "/icons/hamburguer-menu.svg",
  "/icons/instagram.svg",
  "/icons/lupa7.svg",
  "/icons/right-arrow-svgrepo-com.svg",
  "/icons/twitter.svg",
  "/icons/youtube.svg",
  "/icons/menu/menu10b.svg",
  "/icons/menu/menu11a.svg",
  "/icons/menu/menu11b.svg",
  "/icons/menu/menu12.svg",
  "/icons/menu/menu12a.svg",
  "/icons/menu/menu12b.svg",
  "/icons/menu/menu12c.svg",
  "/icons/menu/menu1a.svg",
  "/icons/menu/menu1b.svg",
  "/icons/menu/menu2a.svg",
  "/icons/menu/menu2b.svg",
  "/icons/menu/menu3a.svg",
  "/icons/menu/menu3b.svg",
  "/icons/menu/menu4a.svg",
  "/icons/menu/menu4b.svg",
  "/icons/menu/menu5a.svg",
  "/icons/menu/menu5b.svg",
  "/icons/menu/menu6a.svg",
  "/icons/menu/menu6b.svg",
  "/icons/menu/menu7a.svg",
  "/icons/menu/menu7b.svg",
  "/icons/menu/menu8a.svg",
  "/icons/menu/menu8b.svg",
  "/icons/menu/menu9a.svg",
  "/icons/menu/menu9b.svg",
  "/icons/menu/reset1.svg",
  "/icons/menu/reset2.svg",
  "/images/bg1.png",
  "/js/accesibillity-toggle.js",
  "/js/dropdown_setup.js",
  "/js/infoboxes.js",
  "/js/input-form-setup.js",
  "/js/nprogress.js",
  "/logos/gobmex-logo.svg",
  "/logos/logo_bco-sep.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting(); // Forza que el SW pase directamente a "activated"
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    self.clients.claim() // Toma control de todas las páginas dentro de su scope
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return; // ← tu if queda igual
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

