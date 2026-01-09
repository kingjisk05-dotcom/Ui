/* ==================================================
   SHISHUPAL OS • PWA CORE (FINAL STABLE)
   - Native App Install Trigger
   - Offline Persistence Engine
   - Glass UI System Notification
   ================================================== */

window.addEventListener("load", () => {
  
  /* 1. 🎨 CREATE "ULTRA UI" INSTALL NOTIFICATION
     -------------------------------------------------- */
  const installCard = document.createElement("div");
  installCard.id = "pwaInstallAlert";
  
  // Icon & Text
  installCard.innerHTML = `
    <div class="pwa-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </div>
    <div class="pwa-text">
      <span class="pwa-title">Install System</span>
      <span class="pwa-desc">Add to Home Screen for max performance</span>
    </div>
  `;

  // Apply Glassmorphism Styles Dynamically
  Object.assign(installCard.style, {
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%) translateY(100px)", // Hidden initially
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 20px",
    background: "rgba(18, 18, 24, 0.85)",
    backdropFilter: "blur(20px)",
    webkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "50px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    zIndex: "10000",
    cursor: "pointer",
    transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
    opacity: "0",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  });

  // Inner Elements Styling
  const css = document.createElement("style");
  css.textContent = `
    #pwaInstallAlert:hover { transform: translateX(-50%) scale(1.05) !important; border-color: #00d2ff; }
    .pwa-icon { color: #00d2ff; width: 24px; height: 24px; display: flex; }
    .pwa-text { display: flex; flex-direction: column; }
    .pwa-title { font-size: 14px; font-weight: 700; color: #fff; }
    .pwa-desc { font-size: 11px; color: rgba(255,255,255,0.6); }
  `;
  document.head.appendChild(css);
  document.body.appendChild(installCard);


  /* 2. 📲 INSTALL LOGIC (Browser Native)
     -------------------------------------------------- */
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Animate In
    setTimeout(() => {
      installCard.style.transform = "translateX(-50%) translateY(0)";
      installCard.style.opacity = "1";
    }, 2000);
  });

  installCard.addEventListener('click', () => {
    installCard.style.opacity = "0";
    setTimeout(() => installCard.style.display = "none", 500);

    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ System Installed');
        }
        deferredPrompt = null;
      });
    }
  });


  /* 3. ⚡ OFFLINE CORE (Virtual Engine)
     -------------------------------------------------- */
  if ('serviceWorker' in navigator) {
    const swScript = `
      self.addEventListener('fetch', event => {
        // Simple bypass to keep app alive offline
        if (event.request.mode === 'navigate') {
          event.respondWith(fetch(event.request).catch(() => {
            return new Response('<html><body style="background:#000;color:#fff;display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;"><h1>OFFLINE MODE ACTIVE</h1></body></html>', {headers: {'Content-Type': 'text/html'}});
          }));
        }
      });
    `;

    const blob = new Blob([swScript], {type: 'text/javascript'});
    navigator.serviceWorker.register(URL.createObjectURL(blob))
      .then(() => console.log("🔰 System Core Active"))
      .catch(err => console.log("⚠️ Core Error:", err));
  }

});
