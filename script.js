/* ==========================================================================
   MUHAMMED ANWAR — GRAPHIC DESIGNER & UI/UX DESIGNER
   Portfolio Interactive Functionality & Animations
   ========================================================================== */

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------
    // 1. PRELOADER ANIMATION
    // --------------------------------------------------
    const preloader = document.getElementById("preloader");
    const loaderProgress = document.getElementById("loader-progress");
    const loaderPercent = document.getElementById("loader-percent");

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            if (loaderProgress) loaderProgress.style.width = "100%";
            if (loaderPercent) loaderPercent.textContent = "100";

            setTimeout(() => {
                // Trigger 0% to 100% opacity hero animation
                initHeroAnimations();

                if (preloader) {
                    preloader.style.pointerEvents = "none";
                    gsap.to(preloader, {
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.out",
                        onComplete: () => {
                            preloader.style.display = "none";
                            ScrollTrigger.refresh();
                        }
                    });
                }
            }, 100);
        } else {
            if (loaderProgress) loaderProgress.style.width = `${progress}%`;
            if (loaderPercent) loaderPercent.textContent = `${progress}`;
        }
    }, 25);

    // --------------------------------------------------
    // 2. DUAL-RING CUSTOM CURSOR
    // --------------------------------------------------
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    const cursorText = document.getElementById("cursor-text");

    if (cursorDot && cursorRing) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursorDot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: "power1.out"
            });
        });

        gsap.ticker.add(() => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            gsap.set(cursorRing, {
                x: ringX,
                y: ringY
            });
        });

        // Hover text effect for cursor
        const interactiveElements = document.querySelectorAll("[data-cursor-text], a, button, .project-card-trigger, .filter-btn");

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                const text = el.getAttribute("data-cursor-text");
                if (text && cursorText) {
                    cursorText.textContent = text;
                    cursorRing.classList.add("active-hover");
                } else {
                    cursorRing.classList.add("active-hover");
                    if (cursorText) cursorText.textContent = "";
                }
            });

            el.addEventListener("mouseleave", () => {
                cursorRing.classList.remove("active-hover");
                if (cursorText) cursorText.textContent = "";
            });
        });
    }

    // --------------------------------------------------
    // 3. MAGNETIC BUTTONS & ELEMENTS
    // --------------------------------------------------
    const magneticItems = document.querySelectorAll(".magnetic");

    magneticItems.forEach((item) => {
        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(item, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.35,
                ease: "power2.out"
            });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.4)"
            });
        });
    });

    // --------------------------------------------------
    // 4. 3D CARD TILT EFFECT
    // --------------------------------------------------
    const tiltCards = document.querySelectorAll(".hover-tilt");

    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    });

    // --------------------------------------------------
    // 5. GSAP HERO (0% to 100% OPACITY ANIMATION) & SCROLL REVEAL
    // --------------------------------------------------
    let heroAnimated = false;

    function initHeroAnimations() {
        if (heroAnimated) return;
        heroAnimated = true;

        const heroElements = document.querySelectorAll(
            ".hero-portrait-col, .hero-eyebrow, .hero-greeting, .hero-display-heading, .hero-subtitle, .hero-bio-snippet, .hero-actions, .hero-skills-strip"
        );

        // Smooth 0% (opacity: 0) to 100% (opacity: 1) transition with clearProps to lock at 100% native opacity
        gsap.fromTo(
            heroElements,
            {
                opacity: 0,
                y: 25
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "all"
            }
        );
    }

    // Fallback trigger in case preloader is bypassed
    setTimeout(() => {
        initHeroAnimations();
    }, 600);

    // Scroll reveal for all other sections
    gsap.utils.toArray("section:not(.hero-section)").forEach((section) => {
        const items = section.querySelectorAll(".reveal-item");
        if (!items.length) return;

        gsap.from(items, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                once: true
            }
        });
    });

    // --------------------------------------------------
    // 6. PROJECT FILTER TABS
    // --------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".bento-work-card");

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach((card) => {
                const category = card.getAttribute("data-category");

                if (filterValue === "all" || category === filterValue) {
                    gsap.to(card, {
                        display: "flex",
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            card.style.display = "none";
                        }
                    });
                }
            });
        });
    });

    // --------------------------------------------------
    // 7. PROJECT DATA & LIGHTBOX MODAL
    // --------------------------------------------------
    const projectsData = {
        tea_cafe: {
            title: "Tea Café Branding",
            category: "BRAND IDENTITY",
            role: "Brand Identity & Packaging",
            tools: "Illustrator & Photoshop",
            image: "assets/images/tea_cafe.jpg",
            overview: "Comprehensive brand identity system, organic tea packaging design, ceramic tableware motifs, and store collateral for an artisanal tea lounge.",
            tags: ["BRAND IDENTITY", "PACKAGING", "VISUAL SYSTEM", "CREATIVE DIRECTION"]
        },
        logos: {
            title: "Logo Collection",
            category: "LOGOFOLIO",
            role: "Logo & Mark Design",
            tools: "Adobe Illustrator",
            image: "assets/images/logo_collection.jpg",
            overview: "A curated collection of minimalist logos, geometric marks, and corporate symbols designed with mathematical grid precision.",
            tags: ["LOGOMARKS", "VECTOR DESIGN", "GRID SYSTEMS", "BRAND IDENTITY"]
        },
        social: {
            title: "Social Media Designs",
            category: "GRAPHIC DESIGN",
            role: "Social Content & Strategy",
            tools: "Photoshop & Canva",
            image: "assets/images/social_media.jpg",
            overview: "High-impact social media campaign layouts, carousel post series, and visual grid strategies tailored for brand engagement.",
            tags: ["SOCIAL CONTENT", "CAROUSEL POSTS", "GRID LAYOUTS", "DIGITAL MARKETING"]
        },
        posters: {
            title: "Posters",
            category: "GRAPHIC DESIGN",
            role: "Poster Design & Art",
            tools: "Photoshop & Illustrator",
            image: "assets/images/posters.jpg",
            overview: "Experimental Swiss-style typographic poster designs, cultural exhibition prints, and bold geometric compositions.",
            tags: ["SWISS TYPOGRAPHY", "PRINT DESIGN", "ART DIRECTION", "COMPOSITION"]
        },
        uiux: {
            title: "UI/UX Concepts",
            category: "UI/UX DESIGN",
            role: "UI/UX & Mobile App",
            tools: "Figma & Prototyping",
            image: "assets/images/uiux_concepts.jpg",
            overview: "Apple-inspired mobile application interfaces, glassmorphic dashboards, wireframes, and scalable design system components.",
            tags: ["MOBILE APP", "WEB UI", "FIGMA SYSTEM", "INTERACTION DESIGN"]
        },
        photo_manip: {
            title: "Photo Manipulation",
            category: "GRAPHIC DESIGN",
            role: "Digital Compositing",
            tools: "Adobe Photoshop",
            image: "assets/images/photo_manipulation.jpg",
            overview: "Creative Photoshop compositions, surreal digital art, atmospheric lighting blends, and photo retouching benchmark showcases.",
            tags: ["PHOTOSHOP ART", "SURREALISM", "DIGITAL COMPOSITING", "COLOR GRADING"]
        }
    };

    const projectModal = document.getElementById("project-modal");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalCategory = document.getElementById("modal-category");
    const modalTitle = document.getElementById("modal-title");
    const modalRole = document.getElementById("modal-role");
    const modalTools = document.getElementById("modal-tools");
    const modalImage = document.getElementById("modal-image");
    const modalOverview = document.getElementById("modal-overview");
    const modalTechStack = document.getElementById("modal-tech-stack");

    const projectTriggers = document.querySelectorAll(".project-card-trigger");

    function openProjectModal(projectId) {
        const data = projectsData[projectId];
        if (!data || !projectModal) return;

        if (modalCategory) modalCategory.textContent = data.category;
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalRole) modalRole.textContent = data.role;
        if (modalTools) modalTools.textContent = data.tools;
        if (modalImage) {
            modalImage.src = data.image;
            modalImage.alt = data.title;
        }
        if (modalOverview) modalOverview.textContent = data.overview;

        if (modalTechStack) {
            modalTechStack.innerHTML = "";
            data.tags.forEach((tag) => {
                const span = document.createElement("span");
                span.textContent = tag;
                modalTechStack.appendChild(span);
            });
        }

        projectModal.classList.add("active");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove("active");
        projectModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    projectTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const projectId = trigger.getAttribute("data-project");
            openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener("click", closeProjectModal);
    }

    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });
    }

    // --------------------------------------------------
    // 8. RESUME MODAL
    // --------------------------------------------------
    const resumeModal = document.getElementById("resume-modal");
    const openResumeBtn = document.getElementById("open-resume-btn");
    const heroResumeBtn = document.getElementById("hero-resume-btn");
    const resumeCloseBtn = document.getElementById("resume-close-btn");
    const downloadCvBtn = document.getElementById("download-cv-file-btn");

    function openResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.add("active");
        resumeModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeResumeModal() {
        if (!resumeModal) return;
        resumeModal.classList.remove("active");
        resumeModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (openResumeBtn) openResumeBtn.addEventListener("click", openResumeModal);
    if (heroResumeBtn) heroResumeBtn.addEventListener("click", openResumeModal);
    if (resumeCloseBtn) resumeCloseBtn.addEventListener("click", closeResumeModal);

    if (resumeModal) {
        resumeModal.addEventListener("click", (e) => {
            if (e.target === resumeModal) {
                closeResumeModal();
            }
        });
    }

    if (downloadCvBtn) {
        downloadCvBtn.addEventListener("click", () => {
            showToast("Resume download started!", "fa-solid fa-file-arrow-down");
        });
    }

    // Close Modals on Escape Key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeProjectModal();
            closeResumeModal();
        }
    });

    // --------------------------------------------------
    // 9. ONE-CLICK EMAIL COPY
    // --------------------------------------------------
    const copyEmailBtn = document.getElementById("copy-email-btn");
    const emailAddressText = document.getElementById("email-address");
    const copyPillText = document.getElementById("copy-pill-text");

    if (copyEmailBtn && emailAddressText) {
        copyEmailBtn.addEventListener("click", () => {
            const email = emailAddressText.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                if (copyPillText) copyPillText.textContent = "COPIED!";
                showToast("Email copied to clipboard!", "fa-solid fa-copy");

                setTimeout(() => {
                    if (copyPillText) copyPillText.textContent = "COPY EMAIL";
                }, 2000);
            }).catch(() => {
                showToast("Could not copy email.", "fa-solid fa-triangle-exclamation");
            });
        });
    }

    // --------------------------------------------------
    // 10. CONTACT FORM SUBMISSION
    // --------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nameInput = document.getElementById("form-name");
            const name = nameInput ? nameInput.value.trim() : "there";

            showToast(`Thank you, ${name}! Your message has been sent successfully.`, "fa-solid fa-paper-plane");
            contactForm.reset();
        });
    }

    // --------------------------------------------------
    // 11. TOAST NOTIFICATIONS
    // --------------------------------------------------
    function showToast(message, iconClass = "fa-solid fa-circle-check") {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = "toast";

        toast.innerHTML = `
            <i class="${iconClass} toast-icon"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3500);
    }

    // --------------------------------------------------
    // 12. NAVBAR ACTIVE LINK & SCROLL BEHAVIOR
    // --------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // --------------------------------------------------
    // 13. SMOOTH ANCHOR SCROLL
    // --------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});