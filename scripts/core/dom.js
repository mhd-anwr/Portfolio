export const select = (selector, scope = document) => scope.querySelector(selector);

export const selectAll = (selector, scope = document) => [
    ...scope.querySelectorAll(selector)
];

export function whenDocumentReady(callback) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", callback, { once: true });
        return;
    }

    callback();
}
