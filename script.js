/* ==========================================================================
   MUHAMMED ANWAR — GRAPHIC DESIGNER & UI/UX DESIGNER
   Awwwards Interactive JavaScript Engine
   GSAP + ScrollTrigger + Lenis + Modals + Physics
   ========================================================================== */

window.addEventListener('load', () => {

    // ----------------------------------------------------------------------
    // 1. GSAP & Lenis Smooth Scroll Setup
    // ----------------------------------------------------------------------
    // ----------------------------------------------------------------------
    // 1. GSAP & Lenis Smooth Scroll Setup (Safe Version)
    // ----------------------------------------------------------------------

    gsap.registerPlugin(ScrollTrigger);

    let lenis = null;

    if (typeof Lenis !== "undefined") {

        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

    } else {

        console.warn("Lenis not loaded. Using native scrolling.");

    }

    // ----------------------------------------------------------------------
    // 2. Preloader Animation & Reveal Timeline
    // ----------------------------------------------------------------------
    const loaderProgress = document.getElementById('loader-progress');
    const loaderPercent = document.getElementById('loader-percent');
    const preloader = document.getElementById('preloader');

    let percent = 0;
    const interval = setInterval(() => {
        percent += Math.floor(Math.random() * 14) + 1;
        if (percent > 100) percent = 100;

        if (loaderProgress) loaderProgress.style.width = `${percent}%`;
        if (loaderPercent) loaderPercent.textContent = percent;

        if (percent === 100) {
            clearInterval(interval);

            // Hide preloader animation
            gsap.timeline()
                .to(preloader, {
                    yPercent: -100,
                    duration: 1.1,
                    ease: "power4.inOut",
                    delay: 0.2
                })
                .from('.reveal-item', {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.12,
                    ease: "power3.out"
                }, "-=0.5");
        }
    }, 30);

    // ----------------------------------------------------------------------
    // 3. Custom Dual-Ring Cursor with Contextual Text
    // ----------------------------------------------------------------------
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const cursorText = document.getElementById('cursor-text');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    function renderCursorRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }

        requestAnimationFrame(renderCursorRing);
    }
    renderCursorRing();

    // Contextual Hover Badges
    const hoverElements = document.querySelectorAll('[data-cursor-text]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const text = el.getAttribute('data-cursor-text');
            if (cursorText) cursorText.textContent = text;
            if (cursorRing) cursorRing.classList.add('active-hover');
        });

        el.addEventListener('mouseleave', () => {
            if (cursorRing) cursorRing.classList.remove('active-hover');
            if (cursorText) cursorText.textContent = '';
        });
    });

    // ----------------------------------------------------------------------
    // 4. Magnetic Physics Effect
    // ----------------------------------------------------------------------
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)"
            });
        });
    });

    // ----------------------------------------------------------------------
    // 5. ScrollTrigger Section Animations
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        const reveals = sec.querySelectorAll('.reveal-item');
        if (reveals.length > 0) {
            gsap.from(reveals, {
                scrollTrigger: {
                    trigger: sec,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 40,
                opacity: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out"
            });
        }
    });

    // ----------------------------------------------------------------------
    // 6. Project Bento Grid Filtering
    // ----------------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.bento-work-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            workCards.forEach(card => {
                const cat = card.getAttribute('data-category');

                if (filter === 'all' || filter === cat) {
                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.4,
                        display: "flex",
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(card, {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.3,
                        display: "none",
                        ease: "power2.in"
                    });
                }
            });
        });
    });

    // ----------------------------------------------------------------------
    // 7. Project Detail Lightbox Modal Data & Controller
    // ----------------------------------------------------------------------
    const projectData = {
        tea_cafe: {
            category: "BRAND IDENTITY & PACKAGING",
            title: "Tea Café Branding",
            role: "Brand Identity & Packaging Design",
            tools: "Illustrator, Photoshop, Figma",
            overview: "A comprehensive brand identity system for an artisanal tea lounge. Created with a focus on serenity, organic textures, and traditional tea ceremony culture. Included custom logo mark creation, organic tea canister packaging design, ceramic tableware motifs, brand guidelines, and store collateral.",
            tags: ["Brand Identity", "Packaging", "Visual System", "Typography", "Print Design"],
            image: "assets/images/tea_cafe.jpg"
        },
        logos: {
            category: "LOGOFOLIO & MARKS",
            title: "Logo Collection",
            role: "Vector Logomarks & Brand Icons",
            tools: "Adobe Illustrator",
            overview: "A curated logofolio of minimalist geometric logos, corporate marks, and vector symbols created for tech startups, coffee shops, and lifestyle brands. Each logo is constructed with mathematical grid alignment to guarantee scalable elegance across print and digital media.",
            tags: ["Logomarks", "Vector Design", "Grid Alignment", "Brand Identity"],
            image: "assets/images/logo_collection.jpg"
        },
        social: {
            category: "GRAPHIC DESIGN",
            title: "Social Media Designs",
            role: "Digital Campaign & Content Strategy",
            tools: "Photoshop, Canva, Illustrator",
            overview: "High-impact social media campaign layouts, multi-slide Instagram carousel series, and promotional templates tailored for brand engagement and aesthetic grid consistency.",
            tags: ["Social Content", "Grid Strategy", "Editorial Layout", "Visual Campaign"],
            image: "assets/images/social_media.jpg"
        },
        posters: {
            category: "GRAPHIC DESIGN",
            title: "Posters Collection",
            role: "Swiss Typographic & Print Art",
            tools: "Photoshop, Illustrator",
            overview: "Experimental poster designs inspired by modern Swiss typography, architectural forms, and cultural exhibition concepts. Focuses on strong editorial contrast, negative space, and typographic hierarchy.",
            tags: ["Swiss Typography", "Poster Art", "Print Design", "Editorial Layout"],
            image: "assets/images/posters.jpg"
        },
        uiux: {
            category: "UI/UX DESIGN",
            title: "UI/UX Concepts",
            role: "Mobile App & Web Interface Design",
            tools: "Figma",
            overview: "Apple-inspired mobile application interfaces, glassmorphic web dashboards, and interactive user experience prototypes crafted in Figma. Built with clean layout grids, modern UI components, and micro-interaction states.",
            tags: ["Mobile App UI", "Figma", "Glassmorphism", "Design Systems", "Prototyping"],
            image: "assets/images/uiux_concepts.jpg"
        },
        photo_manip: {
            category: "GRAPHIC DESIGN",
            title: "Photo Manipulation",
            role: "Photoshop Surreal Digital Art",
            tools: "Adobe Photoshop",
            overview: "Creative Photoshop photo manipulation artwork, surreal digital compositions, atmospheric lighting blends, and high-end image retouching showcasing advanced raster graphics techniques.",
            tags: ["Photoshop Art", "Photo Compositing", "Surrealism", "Digital Retouching"],
            image: "assets/images/photo_manipulation.jpg"
        }
    };

    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalRole = document.getElementById('modal-role');
    const modalTools = document.getElementById('modal-tools');
    const modalImage = document.getElementById('modal-image');
    const modalOverview = document.getElementById('modal-overview');
    const modalTechStack = document.getElementById('modal-tech-stack');

    const projectTriggers = document.querySelectorAll('.project-card-trigger');

    projectTriggers.forEach(card => {
        card.addEventListener('click', () => {
            const key = card.getAttribute('data-project');
            const data = projectData[key];

            if (data) {
                if (modalCategory) modalCategory.textContent = data.category;
                if (modalTitle) modalTitle.textContent = data.title;
                if (modalRole) modalRole.textContent = data.role;
                if (modalTools) modalTools.textContent = data.tools;
                if (modalImage) modalImage.src = data.image;
                if (modalOverview) modalOverview.textContent = data.overview;

                if (modalTechStack) {
                    modalTechStack.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join('');
                }

                if (projectModal) {
                    projectModal.classList.add('active');
                    projectModal.setAttribute('aria-hidden', 'false');
                    if (lenis) lenis.stop();
                }
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            if (projectModal) {
                projectModal.classList.remove('active');
                projectModal.setAttribute('aria-hidden', 'true');
                if (lenis) lenis.start();
            }
        });
    }

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                projectModal.setAttribute('aria-hidden', 'true');
                if (lenis) lenis.start();
            }
        });
    }

    // ----------------------------------------------------------------------
    // 8. Resume Modal Controller & PDF Download
    // ----------------------------------------------------------------------
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume-btn');
    const heroResumeBtn = document.getElementById('hero-resume-btn');
    const resumeCloseBtn = document.getElementById('resume-close-btn');
    const downloadCvBtn = document.getElementById('download-cv-file-btn');

    function openResume() {
        if (resumeModal) {
            resumeModal.classList.add('active');
            resumeModal.setAttribute('aria-hidden', 'false');
            if (lenis) lenis.stop();
        }
    }

    function closeResume() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            resumeModal.setAttribute('aria-hidden', 'true');
            if (lenis) lenis.start();
        }
    }

    if (openResumeBtn) openResumeBtn.addEventListener('click', openResume);
    if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
    if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResume);

    if (resumeModal) {
        resumeModal.addEventListener('click', (e) => {
            if (e.target === resumeModal) closeResume();
        });
    }

    // Resume Download Handler (Generates clean formatted text CV file)
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            const resumeContent = `
====================================================================
MUHAMMED ANWAR — GRAPHIC DESIGNER & UI/UX DESIGNER
Contact: muhammed.anwar.design@gmail.com
LinkedIn: linkedin.com/in/muhammedanwar | Behance: behance.net/muhammedanwar
====================================================================

PROFILE SUMMARY
Dedicated, self-taught Graphic Designer and UI/UX Designer passionate about 
crafting minimalist brand identities, modern logo collections, and intuitive 
digital interfaces. Proficient in Figma, Adobe Creative Cloud (Photoshop, 
Illustrator, Canva), and front-end web technologies (HTML, CSS, JavaScript).

SOFTWARE & CORE SKILLS
- Design Stack: Photoshop, Illustrator, Figma, Canva
- UI/UX Engineering: Wireframing, Prototyping, Design Systems, Mobile App UI
- Frontend Web: HTML5, CSS3, JavaScript, GSAP Scroll Animations
- Branding: Logo Design, Brand Guidelines, Packaging, Visual Storytelling

EXPERIENCE
Freelance Graphic Designer & UI/UX Specialist (2024 — Present)
- Designed brand identity packages, logo marks, and visual guidelines.
- Created user interface concepts in Figma with emphasis on glassmorphism.
- Produced social media carousels, Swiss typographic posters, and campaign artwork.
- Developed clean portfolio layouts using HTML, CSS, and JavaScript.

SELECTED PROJECTS
1. Tea Café Branding — Brand Identity & Packaging Design
2. Logo Collection — Minimalist Vector Logomarks & Symbols
3. Social Media Designs — Digital Campaign Carousel Series
4. Posters — Swiss Typographic & Exhibition Print Art
5. UI/UX Concepts — Mobile App UI & Figma Design Systems
6. Photo Manipulation — Photoshop Compositing & Digital Art
====================================================================
`;
            const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Muhammed_Anwar_Resume.txt';
            link.click();

            showToast("Resume downloaded successfully!");
        });
    }

    // ----------------------------------------------------------------------
    // 9. Email Copy & Form Handler with Toast Notifications
    // ----------------------------------------------------------------------
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailAddress = document.getElementById('email-address');
    const copyPillText = document.getElementById('copy-pill-text');

    if (copyEmailBtn && emailAddress) {
        copyEmailBtn.addEventListener('click', () => {
            const textToCopy = emailAddress.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                if (copyPillText) copyPillText.textContent = "COPIED!";
                showToast("Email address copied to clipboard!");

                setTimeout(() => {
                    if (copyPillText) copyPillText.textContent = "COPY EMAIL";
                }, 2500);
            }).catch(err => {
                showToast("Failed to copy email.");
            });
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast("Message sent! Muhammed will get back to you soon.");
            contactForm.reset();
        });
    }

    // Toast Notification System
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check toast-icon"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Escape Key Close for Modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectModal && projectModal.classList.contains('active')) {
                projectModal.classList.remove('active');
                if (lenis) lenis.start();
            }
            if (resumeModal && resumeModal.classList.contains('active')) {
                resumeModal.classList.remove('active');
                if (lenis) lenis.start();
            }
        }
    });

});
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});