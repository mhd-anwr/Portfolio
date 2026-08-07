import { EMAILJS_CONFIG } from "../config/site.js";
import { select } from "../core/dom.js";
import { showToast } from "./feedback.js";

export function initContactForm() {
    const form = select("#contact-form");
    if (!form || !window.emailjs) return;

    window.emailjs.init(EMAILJS_CONFIG.publicKey);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const submitButton = select('button[type="submit"]', form);
        const previousContent = submitButton?.innerHTML;
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = "<span>Sending...</span>";
        }

        const name = select("#name")?.value ?? "";
        const email = select("#email")?.value ?? "";
        const message = select("#message")?.value ?? "";

        window.emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            { name, from_name: name, email, from_email: email, reply_to: email, message },
            EMAILJS_CONFIG.publicKey
        ).then(() => {
            showToast("Your message has been sent successfully!", "fa-solid fa-paper-plane");
            form.reset();
        }).catch((error) => {
            console.error(error);
            showToast("Failed to send message.", "fa-solid fa-circle-exclamation");
        }).finally(() => {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = previousContent ?? "<span>Send Message</span>";
            }
        });
    });
}
