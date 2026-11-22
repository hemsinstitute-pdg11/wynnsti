const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup navigasi" : "Buka navigasi");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka navigasi");
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => observer.observe(section));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
const siteHeader = document.querySelector(".site-header");
const homeSection = document.querySelector("#home");

if (siteHeader && homeSection && "IntersectionObserver" in window) {
  const homeObserver = new IntersectionObserver(([entry]) => {
    siteHeader.classList.toggle("at-home", entry.isIntersecting);
  }, { threshold: 0.08 });
  homeObserver.observe(homeSection);
}

/* Reveal cards gently as they enter the viewport */
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion-ready");
  const motionItems = document.querySelectorAll(
    ".portrait-card, .focus-card, .portfolio-card, .contact-panel"
  );
  const motionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children].filter((item) =>
        item.matches(".focus-card, .portfolio-card")
      );
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = index >= 0 ? `${index * 100}ms` : "0ms";
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
  motionItems.forEach((item) => motionObserver.observe(item));
}
