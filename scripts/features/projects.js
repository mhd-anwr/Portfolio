import { PROJECTS } from "../config/site.js";
import { select, selectAll } from "../core/dom.js";

function fillProjectModal(project) {
    const fields = {
        "#modal-category": project.category,
        "#modal-title": project.title,
        "#modal-role": project.role,
        "#modal-tools": project.tools,
        "#modal-overview": project.overview
    };

    Object.entries(fields).forEach(([selector, value]) => {
        const element = select(selector);
        if (element) element.textContent = value;
    });

    const image = select("#modal-image");
    if (image) {
        image.src = project.image;
        image.alt = project.title;
    }

    const tags = select("#modal-tech-stack");
    if (!tags) return;

    tags.replaceChildren(...project.tags.map((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        return element;
    }));
}

export function initProjectModal() {
    const modal = select("#project-modal");
    if (!modal) return;

    const close = () => {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    selectAll(".project-card-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const project = PROJECTS[trigger.dataset.project];
            if (!project) return;

            fillProjectModal(project);
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });
    });

    select("#modal-close-btn")?.addEventListener("click", close);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) close();
    });

    return close;
}

export function initPortfolioTabs() {
    const tabs = selectAll(".filter-tab-pill");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((item) => item.classList.remove("active-yellow"));
            tab.classList.add("active-yellow");
        });
    });
}
