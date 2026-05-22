// Nav: transparent → solid on scroll
const nav = document.getElementById('nav');

const updateNav = () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
};
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Hamburger menu
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  // Scroll-scrub animasyonu devam ediyorsa hamburgerı kilitle
  const wrapper = document.getElementById('hero-scrub-wrapper');
  if (wrapper) {
    const top = wrapper.getBoundingClientRect().top;
    const SCROLL_PX = 122 * 22; // client-config.js ile aynı: 2684px
    if (top < 0 && top > -SCROLL_PX) return; // scrubbing aktif
  }
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
