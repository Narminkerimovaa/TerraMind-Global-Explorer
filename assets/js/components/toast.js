import { TOAST_DURATION } from "../utils/config.js";

let toastEl = null;
let toastTimer = null;

export function initToast() {
  toastEl = document.querySelector("#toast");
}

export function showToast(message, type = "info") {
  if (!toastEl) return;

  clearTimeout(toastTimer);

  toastEl.className = "";
  toastEl.classList.add("toast", type);
  toastEl.textContent = message;
  toastEl.classList.add("active");

  toastTimer = setTimeout(() => {
    toastEl.classList.remove("active");
  }, TOAST_DURATION);
}