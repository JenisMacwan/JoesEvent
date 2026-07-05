const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const filters = document.querySelectorAll(".filter");
const eventCards = document.querySelectorAll(".event-card");
const form = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const suffix = target === 96 ? "%" : "+";
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 70));

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = `${current}${suffix}`;
      }, 24);

      countObserver.unobserve(element);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => countObserver.observe(counter));

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filters.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");

    eventCards.forEach((card) => {
      const shouldShow = category === "all" || card.dataset.category === category;
      card.classList.toggle("hide", !shouldShow);
    });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks! Your event request is ready for our planning team.";
  form.reset();
});
