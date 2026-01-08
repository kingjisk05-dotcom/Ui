/* ==================================================
   SMART APPS ENGINE
   - 5 min active site → shortcut
   - Max 4 apps
   - Persistent (history independent)
   - Circular order
   ================================================== */

const ACTIVE_TIME = 5 * 60 * 1000; // 5 minutes
const MAX_APPS = 4;

let startTime = Date.now();

/* ---------- TRACK ACTIVE TIME ---------- */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    checkAndSave();
  } else {
    startTime = Date.now();
  }
});

/* ---------- SAVE LOGIC ---------- */
function checkAndSave() {
  const duration = Date.now() - startTime;
  if (duration < ACTIVE_TIME) return;

  const url = location.origin;
  if (!url.startsWith("http")) return;

  let apps = JSON.parse(localStorage.getItem("smartApps") || "[]");

  const index = apps.findIndex(a => a.url === url);

  if (index > -1) {
    apps[index].count++;
    apps[index].last = Date.now();
  } else {
    apps.push({
      url,
      icon: `https://www.google.com/s2/favicons?domain=${url}`,
      count: 1,
      last: Date.now()
    });
  }

  /* Sort by importance */
  apps.sort((a, b) => b.last - a.last);

  /* Keep only top MAX_APPS */
  apps = apps.slice(0, MAX_APPS);

  localStorage.setItem("smartApps", JSON.stringify(apps));
}

/* ---------- UI IN SEARCH MODE ---------- */
window.addEventListener("load", () => {

  const search = document.getElementById("searchInput");
  const speedDial = document.querySelector(".speed-dial");
  if (!search || !speedDial) return;

  const smartBox = document.createElement("div");
  smartBox.className = "speed-dial";
  smartBox.style.display = "none";

  speedDial.after(smartBox);

  function renderSmartApps() {
    smartBox.innerHTML = "";
    const apps = JSON.parse(localStorage.getItem("smartApps") || "[]");

    apps.forEach((app, i) => {
      const a = document.createElement("a");
      a.href = app.url;
      a.className = "app-icon";
      a.innerHTML = `<img src="${app.icon}" style="width:22px">`;
      smartBox.appendChild(a);
    });
  }

  search.addEventListener("focus", () => {
    speedDial.style.display = "none";
    smartBox.style.display = "flex";
    renderSmartApps();
  });

  search.addEventListener("blur", () => {
    smartBox.style.display = "none";
    speedDial.style.display = "flex";
  });

});
