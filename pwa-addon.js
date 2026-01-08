let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Small install toast
  const btn = document.createElement("div");
  btn.innerText = "⬇ Install App";
  btn.style.cssText = `
    position:fixed;
    bottom:20px;
    right:20px;
    background:#ff34b3;
    color:#000;
    padding:12px 18px;
    border-radius:25px;
    font-weight:700;
    z-index:9999;
    cursor:pointer;
  `;
  document.body.appendChild(btn);

  btn.onclick = async () => {
    btn.remove();
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  };
});
