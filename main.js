"use strict";

const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const internalLinks = document.querySelectorAll('.nav-link[href^="#"]');

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Abrir menú");
  menu?.classList.remove("is-open");
}

menuButton?.addEventListener("click", () => {
  const willOpen = menuButton.getAttribute("aria-expanded") !== "true";

  menuButton.setAttribute("aria-expanded", String(willOpen));
  menuButton.setAttribute("aria-label", willOpen ? "Cerrar menú" : "Abrir menú");
  menu?.classList.toggle("is-open", willOpen);
});

internalLinks.forEach((link) => {
  link.addEventListener("click", () => {
    internalLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    closeMenu();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

document.addEventListener("click", (event) => {
  if (!navbar?.contains(event.target)) closeMenu();
});

function updateNavbarOnScroll() {
  navbar?.classList.toggle("is-scrolled", window.scrollY > 24);

  if (window.scrollY < 80) {
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
      internalLinks.forEach((link) => link.classList.remove("active"));
      homeLink.classList.add("active");
    }
  }
}

window.addEventListener("scroll", updateNavbarOnScroll, { passive: true });
updateNavbarOnScroll();

const observedSections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const currentLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      internalLinks.forEach((link) => link.classList.remove("active"));
      currentLink?.classList.add("active");
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: 0 }
);

observedSections.forEach((section) => sectionObserver.observe(section));

if (!window.jQuery) {
  document.querySelectorAll(".reveal").forEach((section) => section.classList.add("is-visible"));
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const contactForm = document.querySelector("#contact-form");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim() || "Visitante";
  const email = formData.get("email")?.toString().trim() || "No indicado";
  const subject = formData.get("subject")?.toString().trim() || "Contacto desde el portafolio";
  const message = formData.get("message")?.toString().trim() || "";
  const status = contactForm.querySelector(".form-status");

  const emailBody = [
    `Nombre: ${name}`,
    `Correo: ${email}`,
    "",
    "Mensaje:",
    message,
  ].join("\n");

  const mailtoUrl = `mailto:garciaordonez.alejandra.mr@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  if (status) status.textContent = "Abriendo tu aplicación de correo…";
  window.location.href = mailtoUrl;
});
