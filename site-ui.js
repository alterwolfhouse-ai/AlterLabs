(function () {
  const key = "alterlabs-theme";
  const allowed = new Set(["dark", "light"]);

  function savedTheme() {
    try {
      const stored = window.localStorage.getItem(key);
      if (allowed.has(stored)) return stored;
    } catch (_) {
      return null;
    }
    return null;
  }

  function applyTheme(theme) {
    const next = allowed.has(theme) ? theme : "dark";
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    try {
      window.localStorage.setItem(key, next);
    } catch (_) {}
    document.querySelectorAll("[data-theme-choice]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.getAttribute("data-theme-choice") === next ? "true" : "false");
    });
  }

  applyTheme(savedTheme() || document.documentElement.getAttribute("data-theme") || "dark");

  function createToggle() {
    if (document.querySelector(".site-theme-toggle")) return;
    const wrap = document.createElement("div");
    wrap.className = "site-theme-toggle";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Color theme");

    ["light", "dark"].forEach(function (theme) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = theme === "light" ? "Light" : "Dark";
      button.setAttribute("data-theme-choice", theme);
      button.setAttribute("aria-pressed", document.documentElement.getAttribute("data-theme") === theme ? "true" : "false");
      button.addEventListener("click", function () {
        applyTheme(theme);
        if (typeof window.alterLabsTrack === "function") {
          window.alterLabsTrack("theme_toggle", { theme });
        }
      });
      wrap.appendChild(button);
    });

    document.body.appendChild(wrap);
  }

  window.alterLabsSetTheme = applyTheme;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createToggle, { once: true });
  } else {
    createToggle();
  }
})();
