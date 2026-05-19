/* ── SAYFA DOLDURMA ─────────────────────────────────── */
function populatePage(c) {

  /* 1. Marka renkleri (CSS değişkenleri) */
  const r = document.documentElement.style;
  r.setProperty('--primary', c.brand.primary);
  r.setProperty('--text',    c.brand.text);
  r.setProperty('--dark',    c.brand.dark);

  /* 2. Sayfa başlığı ve meta */
  document.title = `${c.name.sub} ${c.name.main} | ${c.tagline} ${c.city}`;
  const metaDesc = document.getElementById('meta-desc');
  if (metaDesc) metaDesc.content =
    `${c.name.sub} ${c.name.main} — ${c.city}'nın güvenilir pet kuaförü ve petshop. ${c.tagline}.`;

  /* 3. data-field: metin içerikleri */
  const resolve = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);
  document.querySelectorAll('[data-field]').forEach(el => {
    const val = resolve(c, el.dataset.field);
    if (val !== undefined) el.textContent = val;
  });

  /* 4. WhatsApp linkleri */
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.href = `https://wa.me/${c.whatsapp}`;
    el.target = '_blank';
    el.rel = 'noopener';
  });

  /* 5. Telefon linkleri */
  document.querySelectorAll('[data-tel]').forEach(el => {
    el.href = `tel:+${c.whatsapp}`;
  });

  /* 6. Hero bölümü */
  const set = (id, val, html) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (html) el.innerHTML = val; else el.textContent = val;
  };

  set('hero-badge',        `⭐ ${c.rating}`);
  set('hero-eyebrow',      `${c.reviewCount} Google Yorumu · ${c.city}`);
  set('hero-title-main',   c.name.main.split(' ').join('<br>'), true);
  set('hero-badge-rating', c.rating);
  set('hero-badge-count',  `${c.reviewCount} yorum`);

  const heroImg = document.getElementById('hero-img');
  if (heroImg) { heroImg.src = c.heroImage; heroImg.alt = `${c.name.sub} ${c.name.main}`; }

  /* Hero hizmet satırı */
  set('hero-services',
    c.services.map((s, i) =>
      `${i > 0 ? '<span class="dot">·</span>' : ''}<span>${s.icon} ${s.title.split(' ')[0]}</span>`
    ).join(''), true);

  /* 7. Stats bar */
  set('stats-bar-inner',
    c.stats.map((s, i) =>
      `${i > 0 ? '<div class="stat-divider"></div>' : ''}<div class="stat-item"><strong>${s.value}</strong><span>${s.label}</span></div>`
    ).join(''), true);

  /* 8. Hizmet kartları */
  set('services-grid',
    c.services.map((s, i) => `
      <div class="service-card${i === c.services.length - 1 ? ' service-card--accent' : ''}">
        <div class="service-card__top">
          <span class="service-card__icon">${s.icon}</span>
          <span class="service-card__num">0${i + 1}</span>
        </div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <a href="${s.ctaHref}" class="service-card__link">${s.ctaText} →</a>
      </div>`
    ).join(''), true);

  /* 9. Hakkımızda */
  const aboutImg = document.getElementById('about-img');
  if (aboutImg) { aboutImg.src = c.aboutImage; aboutImg.alt = `${c.name.sub} ${c.name.main} — ${c.city}`; }
  set('about-img-tag',    `${c.name.main} · ${c.city}`);
  set('about-text',       c.aboutText.map(p => `<p>${p}</p>`).join(''), true);
  set('about-stat-reviews', `${c.reviewCount}+`);
  set('about-stat-rating',  `${c.rating}★`);

  /* 10. Galeri */
  set('gallery-grid',
    c.gallery.map(g => `
      <div class="gallery__item${g.layout === 'tall' ? ' gallery__item--tall' : g.layout === 'wide' ? ' gallery__item--wide' : ''}">
        <img src="${g.url}" alt="${g.label}" loading="lazy">
        <div class="gallery__overlay"><span>${g.label}</span></div>
      </div>`
    ).join(''), true);

  /* 11. Yorumlar (× 2 — seamless loop için) */
  const card = rv => `
    <div class="review-card">
      <div class="review-card__stars">★★★★★</div>
      <p>"${rv.text}"</p>
      <span class="review-card__author">— ${rv.author}</span>
    </div>`;
  set('reviews-track', [...c.reviews, ...c.reviews].map(card).join(''), true);

  /* 12. İletişim */
  set('contact-address', c.address);
  const phoneEl = document.getElementById('contact-phone');
  if (phoneEl) { phoneEl.textContent = c.phone; phoneEl.href = `tel:+${c.whatsapp}`; }
  set('contact-hours', c.hours.map(h => `<p>${h}</p>`).join(''), true);
  const mapEl = document.getElementById('contact-map');
  if (mapEl) mapEl.src = `https://maps.google.com/maps?q=${c.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  /* 13. Footer */
  const igEl = document.getElementById('footer-instagram');
  if (igEl) igEl.href = c.instagram;
}

/* ── NAV: şeffaf → dolgulu ──────────────────────────── */
const nav = document.getElementById('nav');
const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

/* ── HAMBURGER MENÜ ─────────────────────────────────── */
const burger   = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── SCROLL FADE-IN ─────────────────────────────────── */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
  { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ── BAŞLAT ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (window.CLIENT) populatePage(window.CLIENT);
});
