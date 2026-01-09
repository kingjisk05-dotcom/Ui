ControlCenter.register(() => {

  const slot = ControlCenter.slots.middle;
  if (!slot || slot.querySelector("#layoutLockBtn")) return;

  const btn = document.createElement("button");
  btn.id = "layoutLockBtn";
  btn.className = "panel-btn";

  let locked = localStorage.getItem("layoutLocked") === "true";

  function update() {
    btn.textContent = locked
      ? "🔒 Layout Locked"
      : "🔓 Layout Unlocked";
  }

  btn.onclick = () => {
    locked = !locked;
    window.__layoutLocked = locked;
    localStorage.setItem("layoutLocked", locked);
    update();
  };

  update();
  slot.appendChild(btn);
});
