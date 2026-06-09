(function () {
  "use strict";

  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  /* Header scroll */
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 30);
    updateActiveNav();
  }, { passive: true });

  /* Menu mobile */
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
  }

  navItems.forEach(function (link) {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  /* Nav ativa */
  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    const scrollY = window.scrollY + 80;
    sections.forEach(function (section) {
      const id = section.getAttribute("id");
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      }
    });
  }

  /* Barras de habilidade */
  const skillItems = document.querySelectorAll(".skill-item");

  const skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const fill = entry.target.querySelector(".skill-fill");
      const percent = entry.target.getAttribute("data-percent");
      if (fill) fill.style.width = percent + "%";
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  skillItems.forEach(function (item) {
    skillObserver.observe(item);
  });

  /* Swiper — carrossel de projetos */
  if (typeof Swiper !== "undefined") {
    new Swiper(".projects-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      speed: 1200,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
      },
    });
  }

  updateActiveNav();
})();