const CACHE_NAME = "nextgen-shell-v124-creative-studio-autoplay";
// Hero image is served from assets/hero-video-studio.jpg
const APP_SHELL = [
  "./",
  "./index.html",
  "./ai-assistant-approved.webp",
  "./ai-design/assistant.html",
  "./ai-design/assistant-mobile.html",
  "./ai-design/assistant-desktop.html",
  "./ai-design/assistant-mobile.css",
  "./ai-design/assistant-desktop.css",
  "./dashboard.html",
  "./channels-archive.html",
  "./nextgen-shared.css",
  "./hamburger-menu.html",
  "./hamburger-menu.js",
  "./hamburger-home.css",
  "./video-studio.html",
  "./channels.html",
  "./analytics.html",
  "./approvals.html",
  "./content.html",
  "./schedule.html",
  "./creative-studio.html",
  "./ai-studio.html",
  "./gallery.html",
  
  "./login.html",
  "./signin.html",
  "./review.html",
  "./settings.html",
  "./subscription-package.html",
  "./send-feedback.html",
  "./help-centre.html",
  "./privacy-policy.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./ng-symbol.jpg",
  "./assets/ai-video-editor.webp",
  "./assets/image-to-video.webp",
  "./assets/text-to-video.jpg",
  "./assets/video-extender.jpg",
  "./assets/text-to-song.webp",
  "./assets/text-to-music-video.webp",
  "./assets/text-to-dance-video.webp",
  "./assets/nextgen-login-logo.webp",
  "./header-reference.webp",
  "./profile-icon.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  // Auth configuration must always be fetched fresh; never serve a cached project URL.
  if (/\/supabase-config\.js(?:\?|$)/i.test(new URL(request.url).pathname + new URL(request.url).search)) {
    event.respondWith(fetch(request.url, { cache: "no-store" }));
    return;
  }

  // Shared workspace runtime is network-first so global behavior fixes are not trapped in a stale JS cache.
  if (new URL(request.url).pathname.endsWith("/nextgen-workspace.js")) {
    event.respondWith(
      fetch(request.url, { cache: "no-store" })
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // HTML navigations use network-first so users receive fixes promptly, with an offline fallback.
  if (request.mode === "navigate" || /\.css(?:\?|$)/i.test(new URL(request.url).pathname + new URL(request.url).search)) {
    event.respondWith(
      fetch(request.url, { cache: "no-store" })
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then(cached => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
