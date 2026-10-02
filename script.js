/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */


/* =========================================
   TYPING EFFECT
========================================= */

const typingElement =
    document.querySelector(".typing-text");


const words = [
    "Researcher.",
    "Data Analyst.",
    "ML Explorer.",
    "Cybersecurity Enthusiast."
];


let wordIndex = 0;
let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (
            characterIndex ===
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                words.length;

        }

    }


    const speed =
        deleting ? 50 : 90;


    setTimeout(
        typeEffect,
        speed
    );
}


if (typingElement) {

    typeEffect();

}


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(3, 5, 10, 0.90)";

        } else {

            navbar.style.background =
                "rgba(3, 5, 10, 0.65)";

        }

    }
);

/* =========================================
   SKILL FILTER
========================================= */

const skillFilters =
    document.querySelectorAll(".skill-filter");

const skillCards =
    document.querySelectorAll(".skill-card");


skillFilters.forEach(filter => {

    filter.addEventListener("click", () => {

        /* Remove active state */

        skillFilters.forEach(button => {

            button.classList.remove("active");

        });


        /* Activate clicked button */

        filter.classList.add("active");


        const selectedCategory =
            filter.dataset.filter;


        /* Filter cards */

        skillCards.forEach(card => {

            const categories =
                card.dataset.category;


            if (
                selectedCategory === "all" ||
                categories.includes(
                    selectedCategory
                )
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});/* =========================================================
   YAMINE INTERACTIVE SYSTEM — STEP 1
   CURSOR + PARTICLE TRAIL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       CREATE CURSOR
       ----------------------------------------------------- */

    const cursorGlow = document.createElement("div");
    cursorGlow.className = "cursor-glow";

    const cursorDot = document.createElement("div");
    cursorDot.className = "cursor-dot";

    document.body.appendChild(cursorGlow);
    document.body.appendChild(cursorDot);


    /* -----------------------------------------------------
       MOUSE TRACKING
       ----------------------------------------------------- */

    let lastX = 0;
    let lastY = 0;

    document.addEventListener("mousemove", (event) => {

        const x = event.clientX;
        const y = event.clientY;

        cursorGlow.style.left = `${x}px`;
        cursorGlow.style.top = `${y}px`;

        cursorDot.style.left = `${x}px`;
        cursorDot.style.top = `${y}px`;


        /* -------------------------------------------------
           PARTICLE TRAIL
           ------------------------------------------------- */

        const distance = Math.hypot(
            x - lastX,
            y - lastY
        );

        if (distance > 18) {

            createParticle(x, y);

            lastX = x;
            lastY = y;
        }

    });


    /* -----------------------------------------------------
       PARTICLE CREATION
       ----------------------------------------------------- */

    function createParticle(x, y) {

        const particle = document.createElement("span");

        particle.className = "cursor-particle";

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const size = Math.random() * 3 + 2;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 800);

    }


    /* -----------------------------------------------------
       PROJECT CARD 3D TILT
       ----------------------------------------------------- */

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const centerX =
                rect.left + rect.width / 2;

            const centerY =
                rect.top + rect.height / 2;

            const mouseX =
                event.clientX - centerX;

            const mouseY =
                event.clientY - centerY;

            const rotateX =
                -(mouseY / (rect.height / 2)) * 5;

            const rotateY =
                (mouseX / (rect.width / 2)) * 5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg)";

        });

    });

});/* =========================================================
   YAMINE SMART CURSOR — STEP 2
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const smartCursor = document.createElement("div");

    smartCursor.className = "smart-cursor-label";

    document.body.appendChild(smartCursor);


    /* -----------------------------------------------------
       Move smart cursor
       ----------------------------------------------------- */

    document.addEventListener("mousemove", (event) => {

        smartCursor.style.left = `${event.clientX}px`;
        smartCursor.style.top = `${event.clientY}px`;

    });


    /* -----------------------------------------------------
       Interactive elements
       ----------------------------------------------------- */

    const projectCards =
        document.querySelectorAll(".project-card");

    const links =
        document.querySelectorAll("a");

    const buttons =
        document.querySelectorAll("button");


    /* -----------------------------------------------------
       Project cards
       ----------------------------------------------------- */

    projectCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            smartCursor.textContent = "EXPLORE";

            smartCursor.classList.add(
                "active",
                "project-mode"
            );

        });

        card.addEventListener("mouseleave", () => {

            smartCursor.textContent = "";

            smartCursor.classList.remove(
                "active",
                "project-mode"
            );

        });

    });


    /* -----------------------------------------------------
       Links
       ----------------------------------------------------- */

    links.forEach((link) => {

        link.addEventListener("mouseenter", () => {

            const text =
                link.textContent.trim().toLowerCase();

            smartCursor.classList.remove(
                "project-mode",
                "contact-mode"
            );

            smartCursor.classList.add(
                "active",
                "link-mode"
            );


            if (
                text.includes("github") ||
                text.includes("live") ||
                text.includes("view")
            ) {

                smartCursor.textContent = "OPEN";

            } else if (
                text.includes("contact") ||
                text.includes("connect")
            ) {

                smartCursor.textContent = "CONNECT";

                smartCursor.classList.remove(
                    "link-mode"
                );

                smartCursor.classList.add(
                    "contact-mode"
                );

            } else {

                smartCursor.textContent = "GO";

            }

        });


        link.addEventListener("mouseleave", () => {

            smartCursor.classList.remove(
                "active",
                "link-mode",
                "contact-mode"
            );

            smartCursor.textContent = "";

        });

    });


    /* -----------------------------------------------------
       Buttons
       ----------------------------------------------------- */

    buttons.forEach((button) => {

        button.addEventListener("mouseenter", () => {

            smartCursor.textContent = "SELECT";

            smartCursor.classList.remove(
                "project-mode",
                "contact-mode"
            );

            smartCursor.classList.add(
                "active",
                "link-mode"
            );

        });

        button.addEventListener("mouseleave", () => {

            smartCursor.classList.remove(
                "active",
                "link-mode"
            );

            smartCursor.textContent = "";

        });

    });

});