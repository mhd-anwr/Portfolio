/* ==========================================================================
   MUHAMMED ANWAR — GRAPHIC DESIGNER & UI/UX DESIGNER
   Portfolio Interactive Functionality & Animations
   ========================================================================== */

gsap.registerPlugin(ScrollTrigger);
emailjs.init("gz2f1kp7L-ae3kKgV");
document.addEventListener("DOMContentLoaded", () => {
    // --------------------------------------------------
    // 1. PRELOADER COUNTER & CURTAIN SLIDE REVEAL
    // --------------------------------------------------
    const preloader = document.getElementById("preloader");
    const loaderProgress = document.getElementById("loader-progress");
    const loaderPercent = document.getElementById("loader-percent");

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            if (loaderProgress) loaderProgress.style.width = "100%";
            if (loaderPercent) loaderPercent.textContent = "100";

            setTimeout(() => {
                initHeroAnimations();

                if (preloader) {
                    preloader.style.pointerEvents = "none";
                    gsap.to(preloader, {
                        yPercent: -100,
                        duration: 0.85,
                        ease: "power4.inOut",
                        onComplete: () => {
                            preloader.style.display = "none";
                            ScrollTrigger.refresh();
                        }
                    });
                }
            }, 300);
        } else {
            if (loaderProgress) loaderProgress.style.width = `${progress}%`;
            if (loaderPercent) loaderPercent.textContent = `${progress}`;
        }
    }, 30);

    // --------------------------------------------------
    // 2. DUAL-RING CUSTOM CURSOR & BG PARALLAX
    // --------------------------------------------------
    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    const cursorText = document.getElementById("cursor-text");

    // --------------------------------------------------
    // 2.5. REAL FLUID WATER RIPPLE CANVAS (CURSOR TRAIL)
    // --------------------------------------------------
    const bgCanvas = document.getElementById("bg-canvas");
    if (bgCanvas) {
        const ctx = bgCanvas.getContext("2d");
        let width = (bgCanvas.width = window.innerWidth);
        let height = (bgCanvas.height = window.innerHeight);

        window.addEventListener("resize", () => {
            width = bgCanvas.width = window.innerWidth;
            height = bgCanvas.height = window.innerHeight;
        });

        const ripples = [];
        let mouseX = width / 2;
        let mouseY = height / 2;
        let prevMouseX = mouseX;
        let prevMouseY = mouseY;

        // Emit water ripples directly trailing mouse cursor
        window.addEventListener("mousemove", (e) => {
            const dx = e.clientX - prevMouseX;
            const dy = e.clientY - prevMouseY;
            const speed = Math.sqrt(dx * dx + dy * dy);

            if (speed > 3) {
                ripples.push({
                    x: e.clientX,
                    y: e.clientY,
                    radius: 2,
                    maxRadius: 75 + Math.min(speed * 2.5, 110),
                    alpha: 0.65,
                    speed: 2.5 + speed * 0.06
                });
                if (ripples.length > 35) ripples.shift();
            }

            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        let step = 0;

        function animateWaterRipples() {
            ctx.clearRect(0, 0, width, height);
            step += 0.02;

            // 1. Organic liquid water waves following mouse Y height
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, height);

                const waveAmplitude = 25 + i * 15;
                const waveFreq = 0.003 + i * 0.001;
                const baseHeight = height * 0.5 + Math.sin(step + i) * 30;

                for (let x = 0; x <= width; x += 15) {
                    const distToMouse = Math.hypot(x - mouseX, baseHeight - mouseY);
                    const cursorInfluence = distToMouse < 320 ? (1 - distToMouse / 320) * 50 * Math.sin(step * 5 + x * 0.01) : 0;

                    const y = baseHeight + Math.sin(x * waveFreq + step * (1 + i * 0.3)) * waveAmplitude + cursorInfluence;
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(width, height);
                ctx.closePath();

                const waveColors = [
                    "rgba(139, 92, 246, 0.14)", // Vivid Neon Violet
                    "rgba(124, 58, 237, 0.09)", // Deep Indigo
                    "rgba(6, 182, 212, 0.05)"   // Cyan Water Glow
                ];
                ctx.fillStyle = waveColors[i];
                ctx.fill();
            }

            // 2. Interactive expanding liquid water ripple rings at cursor coordinates
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += r.speed;
                r.alpha *= 0.955;

                if (r.alpha <= 0.01 || r.radius >= r.maxRadius) {
                    ripples.splice(i, 1);
                    continue;
                }

                // Primary water wave ripple
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(167, 139, 250, ${r.alpha})`;
                ctx.lineWidth = 1.8;
                ctx.stroke();

                // Secondary cyan echo wave
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(6, 182, 212, ${r.alpha * 0.55})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            }

            requestAnimationFrame(animateWaterRipples);
        }

        animateWaterRipples();
    }

    if (cursorDot && cursorRing) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        const orb1 = document.getElementById("bg-orb-1");
        const orb2 = document.getElementById("bg-orb-2");
        const orb3 = document.getElementById("bg-orb-3");

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            gsap.to(cursorDot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: "power1.out"
            });

            // Gentle Parallax Shift for Background Ambient Glow Orbs
            const moveX = (mouseX - window.innerWidth / 2) * 0.035;
            const moveY = (mouseY - window.innerHeight / 2) * 0.035;

            if (orb1) gsap.to(orb1, { x: moveX * 1.2, y: moveY * 1.2, duration: 2.2, ease: "power1.out" });
            if (orb2) gsap.to(orb2, { x: -moveX * 1.5, y: -moveY * 1.5, duration: 2.5, ease: "power1.out" });
            if (orb3) gsap.to(orb3, { x: moveX * 0.8, y: moveY * 0.8, duration: 1.8, ease: "power1.out" });
        });

        // --------------------------------------------------
        // MOUSE-FOLLOWING AURORA GLOW (.hero-glow GSAP)
        // --------------------------------------------------
        const glow = document.querySelector(".hero-glow");

        if (glow) {
            window.addEventListener("mousemove", (e) => {
                gsap.to(glow, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 1.4,
                    ease: "power3.out"
                });
            });
        }

        const heroSection = document.getElementById("hero");
        const orbYellow = document.getElementById("aurora-orb-yellow");
        const orbViolet = document.getElementById("aurora-orb-violet");
        const orbCyan = document.getElementById("aurora-orb-cyan");

        if (heroSection) {
            heroSection.addEventListener("mousemove", (e) => {
                const rect = heroSection.getBoundingClientRect();
                const relX = e.clientX - rect.left;
                const relY = e.clientY - rect.top;

                if (orbYellow) {
                    gsap.to(orbYellow, {
                        x: (relX - rect.width / 2) * 0.35,
                        y: (relY - rect.height / 2) * 0.35,
                        duration: 1.2,
                        ease: "power2.out"
                    });
                }

                if (orbViolet) {
                    gsap.to(orbViolet, {
                        x: (relX - rect.width / 2) * -0.25,
                        y: (relY - rect.height / 2) * -0.25,
                        duration: 1.6,
                        ease: "power2.out"
                    });
                }

                if (orbCyan) {
                    gsap.to(orbCyan, {
                        x: (relX - rect.width / 2) * 0.15,
                        y: (relY - rect.height / 2) * 0.15,
                        duration: 2.0,
                        ease: "power2.out"
                    });
                }
        }

        // --------------------------------------------------
        // 2. HERO IMAGE SCALE (LOAD & SCROLLTRIGGER PARALLAX)
        // --------------------------------------------------
        if (document.querySelector(".hero-image")) {
            gsap.from(".hero-image", {
                scale: 1.25,
                opacity: 0,
                duration: 2,
                ease: "power4.out"
            });

            gsap.to(".hero-image", {
                scale: 1,
                scrollTrigger: {
                    trigger: "#hero",
                    scrub: true,
                    start: "top top",
                    end: "bottom top"
                }
            });
        }

        // --------------------------------------------------
        // 3. TEXT REVEAL (MASK ANIMATION)
        // --------------------------------------------------
        if (document.querySelector(".line-mask h1")) {
            gsap.from(".line-mask h1", {
                yPercent: 100,
                duration: 1.3,
                stagger: 0.1,
                ease: "power4.out"
            });
        }

        // --------------------------------------------------
        // 4. CONTINUOUS SCALE (SUBTLE BREATHING HEADING)
        // --------------------------------------------------
        if (document.querySelector(".hero-title")) {
            gsap.to(".hero-title", {
                scale: 1.015,
                repeat: -1,
                yoyo: true,
                duration: 3,
                ease: "sine.inOut"
            });
        }

        // --------------------------------------------------
        // 8. SCROLL SCALING (HEADING 100% -> 92%)
        // --------------------------------------------------
        if (document.querySelector(".hero-title")) {
            gsap.to(".hero-title", {
                scale: 0.92,
                scrollTrigger: {
                    trigger: "#hero",
                    scrub: true,
                    start: "top top",
                    end: "bottom top"
                }
            });
        }

        // --------------------------------------------------
        // 5. MOUSE PARALLAX (HERO CONTENT MOVEMENT)
        // --------------------------------------------------
        if (document.querySelector(".hero-content")) {
            window.addEventListener("mousemove", (e) => {
                let x = (e.clientX / window.innerWidth - 0.5) * 25;
                let y = (e.clientY / window.innerHeight - 0.5) * 25;

                gsap.to(".hero-content", {
                    x: x,
                    y: y,
                    duration: 1.4
                });
            });
        }

        // --------------------------------------------------
        // 6. FLOATING SHAPES (.blob1 CONTINUOUS SLOW MOVEMENT)
        // --------------------------------------------------
        if (document.querySelector(".blob1")) {
            gsap.to(".blob1", {
                y: -40,
                x: 20,
                repeat: -1,
                yoyo: true,
                duration: 8,
                ease: "sine.inOut"
            });
        }

        // --------------------------------------------------
        // 7. IMAGE HOVER (3D TILT ROTATION ON MOUSEMOVE)
        // --------------------------------------------------
        const heroImages = document.querySelectorAll(".hero-image");
        heroImages.forEach((img) => {
            const parent = img.parentElement || img;

            parent.addEventListener("mousemove", (e) => {
                const rect = parent.getBoundingClientRect();
                const xVal = (e.clientX - rect.left) / rect.width - 0.5;
                const yVal = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(img, {
                    rotationY: xVal * 12 || 6,
                    rotationX: -yVal * 12 || -4,
                    transformPerspective: 1000,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            parent.addEventListener("mouseleave", () => {
                gsap.to(img, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
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
            image: "assets/images/tea_cafe.png",
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
    // 8. RESUME MODAL & PDF DOWNLOAD
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

    document.querySelectorAll("#hero-resume-btn, #open-resume-btn, #resume-download-btn-sec, .btn-download-cv, .btn-hero-secondary").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openResumeModal();
        });
    });

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
            const resumePaper = document.querySelector(".resume-paper");
            if (!resumePaper) return;

            showToast("Generating PDF download...", "fa-solid fa-file-arrow-down");

            const actions = resumePaper.querySelector(".resume-actions");
            if (actions) {
                actions.style.display = "none";
                actions.style.visibility = "hidden";
            }

            setTimeout(() => {
                if (window.html2canvas && window.jspdf) {
                    const { jsPDF } = window.jspdf;

                    html2canvas(resumePaper, {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: "#FFFFFF",
                        ignoreElements: (element) =>
                            element.classList.contains("resume-actions") ||
                            element.classList.contains("btn-download-pdf")
                    }).then((canvas) => {
                        if (actions) {
                            actions.style.display = "";
                            actions.style.visibility = "";
                        }

                        const imgData = canvas.toDataURL("image/jpeg", 0.98);
                        const pdf = new jsPDF({
                            orientation: "portrait",
                            unit: "mm",
                            format: "a4"
                        });

                        const pdfWidth = 210;
                        const pdfHeight = 297;
                        const margin = 10;
                        const printWidth = pdfWidth - (margin * 2);
                        const printHeight = (canvas.height * printWidth) / canvas.width;

                        pdf.addImage(imgData, "JPEG", margin, margin, printWidth, printHeight);
                        pdf.save("Muhammed_Anwar_Resume.pdf");

                        showToast("PDF downloaded successfully!", "fa-solid fa-check");
                    }).catch((err) => {
                        console.error("PDF export error:", err);
                        if (actions) {
                            actions.style.display = "";
                            actions.style.visibility = "";
                        }
                    });
                } else {
                    if (actions) {
                        actions.style.display = "";
                        actions.style.visibility = "";
                    }
                    showToast("Preparing PDF download...", "fa-solid fa-file-arrow-down");
                }
            }, 100);
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
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = "<span>Sending...</span>";
            }

            const nameEl = document.getElementById("name") || document.getElementById("form-name");
            const emailEl = document.getElementById("email") || document.getElementById("form-email");
            const msgEl = document.getElementById("message") || document.getElementById("form-message");

            const formName = nameEl ? nameEl.value : "";
            const formEmail = emailEl ? emailEl.value : "";
            const formMessage = msgEl ? msgEl.value : "";

            const templateParams = {
                name: formName,
                from_name: formName,
                email: formEmail,
                from_email: formEmail,
                reply_to: formEmail,
                message: formMessage
            };

            emailjs.send(
                "service_im0v3lj",
                "template_zc98mcn",
                templateParams,
                "gz2f1kp7L-ae3kKgV"
            )
            .then(() => {
                showToast("Your message has been sent successfully!", "fa-solid fa-paper-plane");
                contactForm.reset();
            })
            .catch((error) => {
                console.error(error);
                showToast("Failed to send message.", "fa-solid fa-circle-exclamation");
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <span>Send Message</span>
                        <i class="fa-solid fa-paper-plane"></i>
                    `;
                }
            });
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

                // Auto close mobile menu on click
                if (navMenu && navMenu.classList.contains("mobile-active")) {
                    navMenu.classList.remove("mobile-active");
                    if (mobileToggle) {
                        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                    }
                }
            }
        });
    });

    // --------------------------------------------------
    // 14. MOBILE MENU TOGGLE
    // --------------------------------------------------
    const mobileToggle = document.getElementById("mobile-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("mobile-active");
            mobileToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });
    }

    // --------------------------------------------------
    // 15. FAQ ACCORDION TOGGLES
    // --------------------------------------------------
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        const btn = item.querySelector("button");
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isOpen = item.classList.contains("active-faq");
                faqItems.forEach((f) => {
                    f.classList.remove("active-faq");
                    const b = f.querySelector("button");
                    if (b) {
                        b.className = "btn-faq-gray";
                        b.textContent = "Show +";
                    }
                });
                if (!isOpen) {
                    item.classList.add("active-faq");
                    btn.className = "btn-faq-yellow";
                    btn.textContent = "Hide -";
                }
            });
        }
    });

    // --------------------------------------------------
    // 16. PORTFOLIO FILTER TABS
    // --------------------------------------------------
    const filterTabs = document.querySelectorAll(".filter-tab-pill");
    filterTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            filterTabs.forEach((t) => t.classList.remove("active-yellow"));
            tab.classList.add("active-yellow");
        });
    });

    // --------------------------------------------------
    // 15. DARK MODE & LIGHT MODE THEME SWITCHER
    // --------------------------------------------------
    const themeToggle = document.getElementById("theme-toggle");
    const storedTheme = localStorage.getItem("portfolio-theme");

    if (storedTheme !== "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute("data-theme");
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            if (newTheme === "dark") {
                document.documentElement.setAttribute("data-theme", "dark");
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
                localStorage.setItem("portfolio-theme", "dark");
                showToast("Switched to Dark Mode", "fa-solid fa-moon");
            } else {
                document.documentElement.removeAttribute("data-theme");
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
                localStorage.setItem("portfolio-theme", "light");
                showToast("Switched to Light Mode", "fa-solid fa-sun");
            }
        });
    }

    // --------------------------------------------------
    // 16. HERO TEXT TYPING ROTATOR (ARROWSDESIGN.ME EXACT MATCH)
    // --------------------------------------------------
    const typingTextEl = document.getElementById("typing-text");
    if (typingTextEl) {
        const roles = [
            "Designer",
            "Creator",
            "Graphic Designer",
            "UI/UX Specialist"
        ];
        let roleIndex = 0;

        setInterval(() => {
            typingTextEl.style.opacity = "0";
            typingTextEl.style.transform = "translateY(8px)";

            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                typingTextEl.textContent = roles[roleIndex];
                typingTextEl.style.opacity = "1";
                typingTextEl.style.transform = "translateY(0)";
            }, 350);
        }, 3200);
    }
});