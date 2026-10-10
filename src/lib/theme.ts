export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "sd-theme";

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* private mode — theme still applies for this session */
  }
  window.dispatchEvent(new Event("sd-theme-change"));
}

export function toggleTheme() {
  setTheme(readTheme() === "dark" ? "light" : "dark");
}