import { select } from "../core/dom.js";

export function showToast(message, iconClass = "fa-solid fa-circle-check") {
    const container = select("#toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";

    const icon = document.createElement("i");
    icon.className = `${iconClass} toast-icon`;
    icon.setAttribute("aria-hidden", "true");

    const text = document.createElement("span");
    text.textContent = message;

    toast.append(icon, text);
    container.appendChild(toast);

    window.setTimeout(() => toast.classList.add("show"), 10);
    window.setTimeout(() => {
        toast.classList.remove("show");
        window.setTimeout(() => toast.remove(), 300);
    }, 3500);
}
