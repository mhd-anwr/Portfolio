import { select, selectAll } from "../core/dom.js";

export function initNavigation() {
    const mobileToggle = select("#mobile-toggle");
    const navMenu = select("#nav-menu");

    mobileToggle?.addEventListener("click", () => {
        if (!navMenu) return;

        const isOpen = navMenu.classList.toggle("mobile-active");
        mobileToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });

    selectAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = select(targetId);
            if (!target) return;

            event.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top, behavior: "smooth" });

            navMenu?.classList.remove("mobile-active");
            if (mobileToggle) {
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
                mobileToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    const sections = selectAll("section[id]");
    const navLinks = selectAll(".nav-link");

    const updateActiveLink = () => {
        const activeSection = sections.find((section) => {
            const top = section.offsetTop - 150;
            return window.scrollY >= top && window.scrollY < top + section.offsetHeight;
        })?.id;

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${activeSection}`);
        });
    };

    window.addEventListener("scroll", updateActiveLink, { passive: true });
    updateActiveLink();
}

export function initFaq() {
    const faqItems = selectAll(".faq-item");

    faqItems.forEach((item) => {
        const button = select("button", item);
        button?.addEventListener("click", (event) => {
            event.stopPropagation();
            const willOpen = !item.classList.contains("active-faq");

            faqItems.forEach((faq) => {
                faq.classList.remove("active-faq");
                const control = select("button", faq);
                if (control) {
                    control.className = "btn-faq-gray";
                    control.textContent = "Show +";
                }
            });

            if (willOpen && button) {
                item.classList.add("active-faq");
                button.className = "btn-faq-yellow";
                button.textContent = "Hide -";
            }
        });
    });
}
