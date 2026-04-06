import {storage} from './../utils/storage.js'

export function initTheme() {
  let theme = storage.get("data-theme") ?? "light";
  document.documentElement.setAttribute("data-theme", theme); 
}

export function toggleTheme() {
  let theme = storage.get("data-theme") ?? "light";
  let newTheme = theme === "dark" ? "light" : "dark";
  storage.set("data-theme", newTheme);
  document.documentElement.setAttribute("data-theme", newTheme); 
}