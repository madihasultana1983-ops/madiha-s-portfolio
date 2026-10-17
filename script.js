/* ==========================================
   MADIHA SULTANA — CRIMSON NOIR PORTFOLIO
   Interactive JavaScript
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* 1. ACCESSIBILITY: CHECK REDUCED MOTION */
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* 2. SCROLL REVEAL ANIMATIONS */
    const revealElements = document.querySelectorAll(
        ".reveal, .skill-card, .project-card, .contact-item"
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");

        // Stagger the appearance of cards.
        if (
            element.classList.contains("skill-card") ||
            element.classList.contains("project-card")
        ) {
            element.style.transitionDelay =
                `${(index % 3) * 100}ms`;
        }
    });

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    /* 3. TYPING ANIMATION */
    const typingElement = document.querySelector("#typing-text");

    if (typingElement && !prefersReducedMotion) {

        const words = [
            "Web Developer",
            "BCA Student",
            "Creative Builder",
            "Future Software Engineer"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeWords() {
            const currentWord = words[wordIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typingElement.textContent = currentWord.substring(
                0,
                characterIndex
            );

            let delay = deleting ? 45 : 85;

            if (!deleting && characterIndex === currentWord.length) {
                deleting = true;
                delay = 1300;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 350;
            }

            window.setTimeout(typeWords, delay);
        }

        typeWords();

    } else if (typingElement) {
        typingElement.textContent = "Web Developer";
    }


    /* 4. ACTIVE NAVIGATION LINK */
    const sections = document.querySelectorAll(
        "main section[id], body > section[id]"
    );

    const navLinks = document.querySelectorAll(
        'nav a[href^="#"]'
    );

    function updateActiveLink() {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            const target = link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    updateActiveLink();


    /* 5. SMOOTH SCROLL FOR NAVIGATION */
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") {
                return;
            }

            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });

                // Update the URL hash.
                history.replaceState(null, "", targetID);
            }
        });
    });


    /* 6. CURRENT YEAR IN FOOTER */
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* 7. BACK-TO-TOP BUTTON */
    const backToTop = document.querySelector("#back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }, {
            passive: true
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    }


    /* 8. IMAGE LOADING FALLBACK */
    const images = document.querySelectorAll("img");

    images.forEach((image) => {
        image.addEventListener("error", () => {
            image.classList.add("image-error");
        });
    });


    /* 9. PROJECT CARD POINTER EFFECT */
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {

        card.addEventListener("pointermove", (event) => {

            if (prefersReducedMotion) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            card.style.setProperty("--pointer-x", `${x}px`);
            card.style.setProperty("--pointer-y", `${y}px`);
        });

    });


    /* 10. CONTACT EMAIL LINKS */
    const emailLinks = document.querySelectorAll(
        'a[data-email]'
    );

    emailLinks.forEach((link) => {
        const email = link.dataset.email;

        if (email && email.includes("@")) {
            link.href = `mailto:${email}`;
        }
    });


    /* 11. CONSOLE MESSAGE */
    console.log(
        "%c MADIHA. ",
        "background:#C50337;color:#FFF8F0;padding:8px;font-weight:bold;"
    );

    console.log(
        "Crimson Noir portfolio initialized successfully."
    );

});