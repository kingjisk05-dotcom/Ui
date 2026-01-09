/* ==================================================
   PWA STABILITY ENGINE (Service Worker Controller)
   - Handles App Installation
   - Caches Core Assets for Offline Use
   - Updates the OS automatically
   ================================================== */

// 1. Register Service Worker on Load
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('✅ OS Core Registered (SW)', reg.scope))
      .catch(err => console.log('❌ OS Core Failed', err));
  });
}

// 2. Install Prompt Handler (Custom "Install App" Button)
let deferredPrompt;
const installBtn = document.createElement("button");
installBtn.style.display = "none"; // Hidden by default

// Style the Install Button (Mini Floating Fab)
installBtn.innerHTML = "⬇ Install OS";
installBtn.style.position = "fixed";
installBtn.style.bottom = "20px";
installBtn.style.left = "50%";
installBtn.style.transform = "translateX(-50%)";
installBtn.style.zIndex = "9999";
installBtn.style.padding = "10px 20px";
installBtn.style.background = "#ff34b3";
installBtn.style.color = "white";
installBtn.style.border = "none";
installBtn.style.borderRadius = "30px";
installBtn.style.boxShadow = "0 5px 15px rgba(255, 52, 179, 0.4)";
installBtn.style.cursor = "pointer";
document.body.appendChild(installBtn);

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = "block"; // Show button when installable
});

installBtn.addEventListener('click', () => {
  installBtn.style.display = 'none';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      deferredPrompt = null;
    });
  }
});

/* ==================================================
   DYNAMIC SERVICE WORKER GENERATOR
   (This creates 'sw.js' virtually if you don't have one)
   ================================================== */
const swCode = `
const CACHE_NAME = 'shishupal-os-v3-core';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './settings-addon.js',
  './ui-addon.js',
  './wall.jpg' 
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch Event (Offline Capability)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// Activate & Cleanup Old Caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
`;

// Create the SW file dynamically so you don't need to make a separate file manually
const blob = new Blob([swCode], {type: 'text/javascript'});
const swUrl = URL.createObjectURL(blob);

// Override the register call above to use this dynamic blob
// Note: In production, it's better to have a real 'sw.js' file, 
// but this works for single-file portability.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(swUrl)
    .then(r => console.log("✅ Virtual Service Worker Active"))
    .catch(e => console.log("⚠️ SW Error:", e));
}
