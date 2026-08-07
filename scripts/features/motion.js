import { select, selectAll } from "../core/dom.js";

const getGsap = () => window.gsap;
const getScrollTrigger = () => window.ScrollTrigger;

export function initSmoothScroll() {
    const Lenis = window.Lenis;
    if (!Lenis) return;

    const lenis = new Lenis({
        duration: 1.5,
        wheelMultiplier: 0.9,
        smoothWheel: true
    });

    const ScrollTrigger = getScrollTrigger();
    lenis.on("scroll", () => ScrollTrigger?.update());

    const frame = (time) => {
        lenis.raf(time);
        window.requestAnimationFrame(frame);
    };

    window.requestAnimationFrame(frame);
}

export function initPreloader(onComplete) {
    const gsap = getGsap();
    const preloader = select("#preloader");
    const progressBar = select("#loader-progress");
    const percentage = select("#loader-percent");
    let completed = false;

    const finish = () => {
        if (completed) return;
        completed = true;
        if (progressBar) progressBar.style.width = "100%";
        if (percentage) percentage.textContent = "100";

        window.setTimeout(() => {
            onComplete?.();

            if (!preloader || !gsap) return;
            preloader.style.pointerEvents = "none";
            gsap.to(preloader, {
                yPercent: -100,
                duration: 0.85,
                ease: "power4.inOut",
                onComplete: () => {
                    preloader.style.display = "none";
                    getScrollTrigger()?.refresh();
                }
            });
        }, 200);
    };

    if (!preloader || !gsap) {
        onComplete?.();
        return;
    }

    let progress = 0;
    const interval = window.setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 12;
        if (progress >= 100) {
            window.clearInterval(interval);
            finish();
            return;
        }

        if (progressBar) progressBar.style.width = `${progress}%`;
        if (percentage) percentage.textContent = String(progress);
    }, 20);

    window.setTimeout(() => {
        window.clearInterval(interval);
        finish();
    }, 1200);
}

export function initBackgroundCanvas() {
    const canvas = select("#bg-canvas");
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const ripples = [];
    let mouseX = width / 2;
    let mouseY = height / 2;
    let previousMouseX = mouseX;
    let previousMouseY = mouseY;
    let step = 0;

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener("mousemove", (event) => {
        const speed = Math.hypot(event.clientX - previousMouseX, event.clientY - previousMouseY);
        if (speed > 3) {
            ripples.push({
                x: event.clientX,
                y: event.clientY,
                radius: 2,
                maxRadius: 75 + Math.min(speed * 2.5, 110),
                alpha: 0.65,
                speed: 2.5 + speed * 0.06
            });
            if (ripples.length > 35) ripples.shift();
        }

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    const render = () => {
        context.clearRect(0, 0, width, height);
        step += 0.02;

        [
            "rgba(139, 92, 246, 0.14)",
            "rgba(124, 58, 237, 0.09)",
            "rgba(6, 182, 212, 0.05)"
        ].forEach((color, index) => {
            context.beginPath();
            context.moveTo(0, height);

            const amplitude = 25 + index * 15;
            const frequency = 0.003 + index * 0.001;
            const baseHeight = height * 0.5 + Math.sin(step + index) * 30;

            for (let x = 0; x <= width; x += 15) {
                const distance = Math.hypot(x - mouseX, baseHeight - mouseY);
                const influence = distance < 320
                    ? (1 - distance / 320) * 50 * Math.sin(step * 5 + x * 0.01)
                    : 0;
                const y = baseHeight + Math.sin(x * frequency + step * (1 + index * 0.3)) * amplitude + influence;
                context.lineTo(x, y);
            }

            context.lineTo(width, height);
            context.closePath();
            context.fillStyle = color;
            context.fill();
        });

        for (let index = ripples.length - 1; index >= 0; index -= 1) {
            const ripple = ripples[index];
            ripple.radius += ripple.speed;
            ripple.alpha *= 0.955;

            if (ripple.alpha <= 0.01 || ripple.radius >= ripple.maxRadius) {
                ripples.splice(index, 1);
                continue;
            }

            context.beginPath();
            context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            context.strokeStyle = `rgba(167, 139, 250, ${ripple.alpha})`;
            context.lineWidth = 1.8;
            context.stroke();

            context.beginPath();
            context.arc(ripple.x, ripple.y, ripple.radius * 0.65, 0, Math.PI * 2);
            context.strokeStyle = `rgba(6, 182, 212, ${ripple.alpha * 0.55})`;
            context.lineWidth = 1.2;
            context.stroke();
        }

        window.requestAnimationFrame(render);
    };

    render();
}

export function initCursorAndParallax() {
    const gsap = getGsap();
    const cursorDot = select("#cursor-dot");
    const cursorRing = select("#cursor-ring");
    const cursorText = select("#cursor-text");
    if (!gsap || !cursorDot || !cursorRing) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    const glow = select(".hero-glow");
    const hero = select("#hero");
    const heroContent = select(".hero-content");
    const orbs = [select("#aurora-orb-yellow"), select("#aurora-orb-violet"), select("#aurora-orb-cyan")];

    window.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.1, ease: "power1.out" });

        if (glow) {
            gsap.to(glow, { x: mouseX, y: mouseY, duration: 1.4, ease: "power3.out" });
        }

        if (heroContent) {
            gsap.to(heroContent, {
                x: (mouseX / window.innerWidth - 0.5) * 25,
                y: (mouseY / window.innerHeight - 0.5) * 25,
                duration: 1.4
            });
        }
    });

    hero?.addEventListener("mousemove", (event) => {
        const rect = hero.getBoundingClientRect();
        const relativeX = event.clientX - rect.left - rect.width / 2;
        const relativeY = event.clientY - rect.top - rect.height / 2;
        const movement = [[0.35, 1.2], [-0.25, 1.6], [0.15, 2.0]];

        orbs.forEach((orb, index) => {
            if (!orb) return;
            const [factor, duration] = movement[index];
            gsap.to(orb, {
                x: relativeX * factor,
                y: relativeY * factor,
                duration,
                ease: "power2.out"
            });
        });
    });

    gsap.ticker.add(() => {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        gsap.set(cursorRing, { x: ringX, y: ringY });
    });

    selectAll("[data-cursor-text], a, button, .project-card-trigger").forEach((element) => {
        element.addEventListener("mouseenter", () => {
            cursorText.textContent = element.dataset.cursorText ?? "";
            cursorRing.classList.add("active-hover");
        });

        element.addEventListener("mouseleave", () => {
            cursorText.textContent = "";
            cursorRing.classList.remove("active-hover");
        });
    });
}

export function initHeroMotion() {
    const gsap = getGsap();
    const ScrollTrigger = getScrollTrigger();
    if (!gsap) return;

    const hero = select(".hero");
    if (!hero || hero.dataset.motionInitialized === "true") return;
    hero.dataset.motionInitialized = "true";

    gsap.from(".hero > *", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1.1,
        ease: "power4.out"
    });

    const heroImages = selectAll(".hero-image");
    if (heroImages.length) {
        gsap.from(heroImages, { scale: 1.25, opacity: 0, duration: 2, ease: "power4.out" });
        gsap.to(heroImages, {
            scale: 1,
            scrollTrigger: ScrollTrigger ? { trigger: "#hero", scrub: true, start: "top top", end: "bottom top" } : undefined
        });
    }

    const title = selectAll(".hero-title");
    if (title.length) {
        gsap.from(".line-mask h1", { yPercent: 100, duration: 1.3, stagger: 0.1, ease: "power4.out" });
        gsap.to(title, { scale: 1.015, repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" });
        if (ScrollTrigger) {
            gsap.to(title, {
                scale: 0.92,
                scrollTrigger: { trigger: "#hero", scrub: true, start: "top top", end: "bottom top" }
            });
        }
    }

    if (select(".blob1")) {
        gsap.to(".blob1", { y: -40, x: 20, repeat: -1, yoyo: true, duration: 8, ease: "sine.inOut" });
    }

    heroImages.forEach((image) => {
        const parent = image.parentElement ?? image;
        parent.addEventListener("mousemove", (event) => {
            const rect = parent.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            gsap.to(image, {
                rotationY: x * 12 || 6,
                rotationX: -y * 12 || -4,
                transformPerspective: 1000,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        parent.addEventListener("mouseleave", () => {
            gsap.to(image, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power2.out" });
        });
    });
}

export function initHoverMotion() {
    const gsap = getGsap();
    if (!gsap) return;

    selectAll(".magnetic").forEach((element) => {
        element.addEventListener("mousemove", (event) => {
            const rect = element.getBoundingClientRect();
            gsap.to(element, {
                x: (event.clientX - rect.left - rect.width / 2) * 0.3,
                y: (event.clientY - rect.top - rect.height / 2) * 0.3,
                duration: 0.35,
                ease: "power2.out"
            });
        });
        element.addEventListener("mouseleave", () => {
            gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        });
    });

    selectAll(".hover-tilt").forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            gsap.to(card, {
                rotateX: ((event.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8,
                rotateY: ((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
        });
    });
}

export function initSectionReveal() {
    const gsap = getGsap();
    if (!gsap || !getScrollTrigger()) return;

    selectAll("section:not(.hero-section)").forEach((section) => {
        const items = selectAll(".reveal-item", section);
        if (!items.length) return;

        gsap.from(items, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 85%", once: true }
        });
    });
}
