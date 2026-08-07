import { select, selectAll } from "../core/dom.js";
import { showToast } from "./feedback.js";

export function initResume() {
    const modal = select("#resume-modal");
    const close = () => {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const open = (event) => {
        event?.preventDefault();
        if (!modal) return;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    selectAll("#hero-resume-btn, #open-resume-btn, #resume-download-btn-sec, .btn-download-cv, .btn-hero-secondary")
        .forEach((button) => button.addEventListener("click", open));

    select("#resume-close-btn")?.addEventListener("click", close);
    modal?.addEventListener("click", (event) => {
        if (event.target === modal) close();
    });

    select("#download-cv-file-btn")?.addEventListener("click", () => {
        const resume = select(".resume-paper");
        const html2canvas = window.html2canvas;
        const jsPDF = window.jspdf?.jsPDF;
        if (!resume || !html2canvas || !jsPDF) return;

        const actions = select(".resume-actions", resume);
        if (actions) {
            actions.style.display = "none";
            actions.style.visibility = "hidden";
        }

        showToast("Generating PDF download...", "fa-solid fa-file-arrow-down");
        html2canvas(resume, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#FFFFFF",
            ignoreElements: (element) => element.classList.contains("resume-actions") || element.classList.contains("btn-download-pdf")
        }).then((canvas) => {
            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
            const margin = 10;
            const width = 210 - margin * 2;
            const height = canvas.height * width / canvas.width;
            pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", margin, margin, width, height);
            pdf.save("Muhammed_Anwar_Resume.pdf");
            showToast("PDF downloaded successfully!", "fa-solid fa-check");
        }).catch((error) => {
            console.error("PDF export error:", error);
            showToast("Could not prepare the PDF.", "fa-solid fa-circle-exclamation");
        }).finally(() => {
            if (actions) {
                actions.style.display = "";
                actions.style.visibility = "";
            }
        });
    });

    return close;
}
