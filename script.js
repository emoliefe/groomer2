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
    const SCROLL_PX = 122 * 22; // 2684px
    if (top < 0 && top > -SCROLL_PX) return;
  }
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Fade-in on scroll (frontend-design: staggered reveals)
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

// Staggered card entrance (frontend-design skill: high-impact moments)
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(
          '.service-card, .review-card, .gallery__item, .stat'
        );
        cards.forEach((card, i) => {
          card.style.transitionDelay = `${i * 0.08}s`;
          card.classList.add('card-visible');
        });
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(
  '.services__grid, .gallery__grid, .about__stats'
).forEach(el => {
  // Set initial hidden state
  el.querySelectorAll('.service-card, .gallery__item, .stat').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  });
  cardObserver.observe(el);
});

// CSS class to make cards visible
const style = document.createElement('style');
style.textContent = '.card-visible .service-card, .card-visible .gallery__item, .card-visible .stat { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);
