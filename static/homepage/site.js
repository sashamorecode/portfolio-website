(() => {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("sasha-appearance");
    if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  } catch { /* Preferences still work when local storage is unavailable. */ }

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-control");
    const alternate = document.querySelector(".language");
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const current = () => root.dataset.theme || (system.matches ? "dark" : "light");
    const updateLabel = () => {
      button.textContent = current() === "dark" ? button.dataset.light : button.dataset.dark;
    };
    function keepSection() {
      const section = document.getElementById(location.hash.slice(1));
      alternate.hash = section ? location.hash : "";
    }
    alternate.addEventListener("click", () => {
      const locale = alternate.hreflang;
      document.cookie = `locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
      try { localStorage.setItem("locale", locale); } catch { /* The language link still works. */ }
    });
    button.hidden = false;
    button.addEventListener("click", () => {
      const theme = current() === "dark" ? "light" : "dark";
      root.dataset.theme = theme;
      try { localStorage.setItem("sasha-appearance", theme); } catch { /* Session choice is applied. */ }
      updateLabel();
    });
    system.addEventListener("change", updateLabel);
    window.addEventListener("hashchange", keepSection);
    updateLabel();
    keepSection();
  }, { once: true });
})();
