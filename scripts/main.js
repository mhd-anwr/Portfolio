import { whenDocumentReady } from "./core/dom.js";
import { initContactForm } from "./features/contact.js";
import { initCursorAndParallax, initBackgroundCanvas, initHeroMotion, initHoverMotion, initPreloader, initSectionReveal, initSmoothScroll } from "./features/motion.js";
import { initFaq, initNavigation } from "./features/navigation.js";
import { initProjectModal, initPortfolioTabs } from "./features/projects.js";
import { initResume } from "./features/resume.js";
import { initTheme } from "./features/theme.js";

function initPortfolio() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.ticker.lagSmoothing(0);
    }

    initSmoothScroll();
    initBackgroundCanvas();
    initCursorAndParallax();
    initHoverMotion();
    initSectionReveal();

    initTheme();
    initNavigation();
    initFaq();
    initPortfolioTabs();
    initContactForm();

    const closeProjectModal = initProjectModal();
    const closeResumeModal = initResume();

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeProjectModal?.();
        closeResumeModal?.();
    });

    initPreloader(initHeroMotion);
}

whenDocumentReady(initPortfolio);
