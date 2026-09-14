const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");


// Theme

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    body.classList.add("light-mode");
    themeToggle.innerHTML = "<span>☾</span>";
} else {
    themeToggle.innerHTML = "<span>☼</span>";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode");

    const isLight = body.classList.contains("light-mode");

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

    themeToggle.innerHTML = isLight
        ? "<span>☾</span>"
        : "<span>☼</span>";
});


// Mobile Menu

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("open");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
    });
});


// Header Background on Scroll

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// Active Navigation Link

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);


// Smooth Reveal Animation

const revealElements = document.querySelectorAll(
    ".timeline-item, .learning-card, .empty-projects, .contact-box, .about-grid"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);
});