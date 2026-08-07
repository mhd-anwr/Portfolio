import { select } from "../core/dom.js";
import { showToast } from "./feedback.js";

const STORAGE_KEY = "portfolio-theme";

function setTheme(theme, button) {
    const isDark = theme === "dark";
    document.documentElement.toggleAttribute("data-theme", isDark);

    if (button) {
        button.innerHTML = isDark
            ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
    }
}

export function initTheme() {
    const button = select("#theme-toggle");
    const storedTheme = localStorage.getItem(STORAGE_KEY);
    const initialTheme = storedTheme === "light" ? "light" : "dark";

    setTheme(initialTheme, button);

    button?.addEventListener("click", () => {
        const theme = document.documentElement.hasAttribute("data-theme")
            ? "light"
            : "dark";

        setTheme(theme, button);
        localStorage.setItem(STORAGE_KEY, theme);
        showToast(
            theme === "dark" ? "Switched to Dark Mode" : "Switched to Light Mode",
            theme === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun"
        );
    });
}
