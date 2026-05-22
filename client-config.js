(() => {
  const C = {
    // Theme — Teal Modern
    primary:   '#0A7E8C',
    textColor: '#3D6B72',
    dark:      '#051F24',

    nameSub:     'LAVISH LIFE',
    nameMain:    'PET SPA',
    tagline:     'Premium Grooming & Spa Treatments for Your Furry Family',
    eyebrow:     '164 Google Reviews · Cambria Heights, NY',
    phone:       '+1 631-825-2089',
    whatsapp:    '16318252089',
    address:     '227-03 Linden Blvd, Cambria Heights, NY 11411',
    mapQuery:    '227-03+Linden+Blvd+Cambria+Heights+NY+11411',
    rating:      '4.7',
    ratingStars: '★★★★½',
    reviewCount: '164',
    locationTag: 'Cambria Heights · NY',
    instagram:   'https://www.instagram.com/lavishpetz/',

    heroImg:    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=1400&fit=crop&crop=center&q=85',
    heroImgAlt: 'Freshly groomed dog at Lavish Life Pet Spa',
    heroTags:   ['✂️ Grooming', '🛁 Spa Baths', '🐾 Paw Care', '🎀 Finishing Touch'],

    stats: [
      { value: '164+',    label: 'Happy Clients'   },
      { value: '4.7★',   label: 'Google Rating'    },
      { value: 'Premium', label: 'Spa Treatments'  },
      { value: 'Queens',  label: 'Cambria Heights' },
    ],

    services: [
      {
        icon: '✂️', num: '01', title: 'Full Grooming Package', accent: false,
        desc: 'Tailored head-to-tail grooming for every breed and size. Precise cuts that match your vision — delivered with care, every single time.',
      },
      {
        icon: '🛁', num: '02', title: 'Bath & Brush', accent: false,
        desc: 'Deep-cleansing bath with premium shampoo and conditioner, finished with a professional brush-out for a fresh, silky-smooth coat.',
      },
      {
        icon: '🐾', num: '03', title: 'Paw & Nail Care', accent: false,
        desc: 'Nail trimming, filing, and complimentary paw pad conditioning — keeping your pet comfortable and polished from the ground up.',
      },
      {
        icon: '🐶', num: '04', title: 'Puppy Cut', accent: true,
        desc: 'A gentle, stress-free first grooming experience designed to introduce puppies to the spa in a loving, confidence-building way.',
      },
    ],

    aboutTitle: 'We Genuinely\nLove Your Pets.',
    aboutP1: 'At Lavish Life Pet Spa, we pour love and expertise into every appointment. Located in Cambria Heights, NY, our dedicated groomers treat each pet like family — delivering precise, breed-specific cuts and luxurious spa treatments that leave your furry companion looking and feeling their absolute best.',
    aboutP2: 'From our spotlessly clean salon to the little extras like complimentary paw conditioning, every detail is crafted to put your pet at ease. With a 4.7-star rating from over 164 happy clients, we\'ve built our reputation one perfect grooming session at a time.',
    aboutImg:    'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=85',
    aboutImgAlt: 'Happy groomed dog',
    aboutStats: [
      { value: '164+', label: 'Google Reviews'      },
      { value: '4.7★', label: 'Avg Rating'          },
      { value: '100%', label: 'Client Satisfaction' },
    ],

    gallery: [
      { url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=600&q=85',  alt: 'Cat grooming',       label: 'Cat Grooming',  mod: 'gallery__item--tall' },
      { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=85', alt: 'Dog grooming',       label: 'Grooming',      mod: '' },
      { url: 'https://images.unsplash.com/photo-1601758174487-6e3e5be3ce8b?w=600&q=85', alt: 'Fluffy dog',         label: 'Expert Cut',    mod: '' },
      { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=85',   alt: 'Happy dog',          label: 'Happy Clients', mod: '' },
      { url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=900&q=85', alt: 'Spa finish result',  label: 'Lavish Finish', mod: 'gallery__item--wide' },
    ],

    reviews: [
      { stars: '★★★★★', text: '"Super friendly staff & they give great quality cuts ONLY!"',                                                           author: '— Google Review' },
      { stars: '★★★★★', text: '"The place was very clean and they even conditioned my dog\'s paws as a courtesy."',                                     author: '— Google Review' },
      { stars: '★★★★★', text: '"He always smells, looks and feels great once groomed by Lavish Life Pet Spa. Customer service is also excellent!"',     author: '— Cassie Dean'   },
      { stars: '★★★★★', text: '"PERFECTION!!! Trini\'s awesome work made Whiskey look great — he also smells and feels wonderful."',                    author: '— Bluest'        },
      { stars: '★★★★★', text: '"Her warmth, kind, loving and caring soul made both of our visits extremely comfortable. We\'re definitely coming back!"', author: '— Google Review' },
      { stars: '★★★★★', text: '"The owner personally reached out to make things right. That level of care is rare and truly appreciated."',               author: '— Google Review' },
    ],

    hoursLines: [
      'Monday – Tuesday: Closed',
      'Wednesday – Friday: 10:30 AM – 6:00 PM',
      'Saturday: 10:00 AM – 5:00 PM',
      'Sunday: 10:00 AM – 4:00 PM',
    ],

    footerCopy: '© 2025 Lavish Life Pet Spa. Cambria Heights, NY.',
  };

  // ── CSS theme variables (runs immediately, no DOM needed) ─────────────────
  const root = document.documentElement;
  root.style.setProperty('--primary', C.primary);
  root.style.setProperty('--text',    C.textColor);
  root.style.setProperty('--dark',    C.dark);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const $  = sel => document.querySelector(sel);
  const $$ = sel => [...document.querySelectorAll(sel)];
  const waHref  = `https://wa.me/${C.whatsapp}`;
  const telHref = `tel:${C.phone.replace(/[\s()-]/g, '')}`;

  const setText = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };
  const setHtml = (sel, val) => { const el = $(sel); if (el) el.innerHTML   = val; };

  // Updates only the plain text node inside an element (preserves child SVGs)
  const setTextNode = (el, val) => {
    if (!el) return;
    const node = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (node) node.textContent = ` ${val} `;
    else el.append(` ${val} `);
  };

  // ── Run immediately — script is at bottom of <body>, DOM is ready ─────────

  // Page meta
  document.title = 'Lavish Life Pet Spa | Premium Pet Grooming — Cambria Heights, NY';
  document.documentElement.lang = 'en';
  const metaDesc = $('meta[name="description"]');
  if (metaDesc) metaDesc.content = 'Lavish Life Pet Spa — Premium grooming & spa services in Cambria Heights, NY. 4.7 stars · 164 reviews. Book online today!';

  // NAV
  setText('.nav__logo-sub',  C.nameSub);
  setText('.nav__logo-main', C.nameMain);
  const navCta = $('.nav__cta');
  if (navCta) { navCta.href = waHref; navCta.textContent = 'Book Online'; }
  const navLinkLabels = ['Services', 'About', 'Gallery', 'Contact'];
  $$('.nav__links li a').forEach((a, i) => { if (navLinkLabels[i]) a.textContent = navLinkLabels[i]; });

  // HERO
  const heroBadge = $('.hero__badge');
  if (heroBadge) heroBadge.textContent = `⭐ ${C.rating}`;
  const eyebrowSpans = $$('.hero__eyebrow span');
  if (eyebrowSpans[1]) eyebrowSpans[1].textContent = C.eyebrow;

  setText('.hero__title-sub', C.nameSub);
  setHtml('.hero__title-main', 'PET<br>SPA');
  setText('.hero__desc', C.tagline);

  const heroActions = $$('.hero__actions a');
  if (heroActions[0]) { heroActions[0].href = waHref;  setTextNode(heroActions[0], 'WhatsApp Us'); }
  if (heroActions[1]) { heroActions[1].href = telHref; setTextNode(heroActions[1], 'Call Us'); }

  const tagsRow = $('.hero__services-row');
  if (tagsRow) {
    tagsRow.innerHTML = C.heroTags.map((t, i) =>
      i < C.heroTags.length - 1
        ? `<span>${t}</span><span class="dot">·</span>`
        : `<span>${t}</span>`
    ).join('');
  }

  const imgBadge = $('.hero__img-badge');
  if (imgBadge) imgBadge.innerHTML =
    `<strong>${C.rating}</strong><span>${C.ratingStars}</span><small>${C.reviewCount} reviews</small>`;

  // ── SCROLL SCRUBBING (frame-by-frame video) ───────────────────────────────
  (() => {
    // Mobilde (< 768px) scroll-scrubbing kapalı — sticky canvas istenmiyor
    if (window.innerWidth < 768) return;

    const FRAME_COUNT = 122;
    const FRAMES_DIR  = 'frames/';
    const FRAME_PFX   = 'ezgif-frame-';
    const SCROLL_PX   = FRAME_COUNT * 22; // ~2684px total scroll range

    const hero = document.getElementById('hero');
    if (!hero) return;

    // Wrap hero in a tall container so it sticks while frames play
    const wrapper = document.createElement('div');
    wrapper.id = 'hero-scrub-wrapper';
    wrapper.style.cssText = 'position:relative;';
    hero.parentNode.insertBefore(wrapper, hero);
    wrapper.appendChild(hero);

    hero.style.position = 'sticky';
    hero.style.top      = '0';
    hero.style.zIndex   = '1';

    const spacer = document.createElement('div');
    spacer.style.height = SCROLL_PX + 'px';
    wrapper.appendChild(spacer);

    // Replace hero right <img> with a <canvas>
    const heroRight = hero.querySelector('.hero__right');
    const heroImg   = heroRight && heroRight.querySelector('img');

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';
    canvas.style.cssText = [
      'display:block',
      'width:100%',
      'height:100%',
      'object-fit:cover',
      'position:absolute',
      'inset:0',
    ].join(';');

    if (heroRight) heroRight.style.position = 'relative';
    if (heroImg)   { heroImg.style.display = 'none'; heroImg.after(canvas); }
    else if (heroRight) heroRight.prepend(canvas);

    const ctx = canvas.getContext('2d');

    // Preload all frames
    const frames = [];
    let loaded = 0;

    const draw = (idx) => {
      const f = frames[idx];
      if (!f || !f.complete || !f.naturalWidth) return;
      if (canvas.width !== f.naturalWidth) {
        canvas.width  = f.naturalWidth;
        canvas.height = f.naturalHeight;
      }
      ctx.drawImage(f, 0, 0);
    };

    const onScroll = () => {
      const top      = wrapper.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, -top / SCROLL_PX));
      draw(Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT)));
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `${FRAMES_DIR}${FRAME_PFX}${String(i + 1).padStart(3, '0')}.jpg`;
      frames[i] = img;
      img.onload = () => {
        loaded++;
        if (loaded === 1) draw(0);           // show frame 1 ASAP
        if (loaded === FRAME_COUNT) onScroll(); // sync to current scroll
      };
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // STATS BAR
  $$('.stat-item').forEach((el, i) => {
    const s = C.stats[i]; if (!s) return;
    const strong = el.querySelector('strong');
    const span   = el.querySelector('span');
    if (strong) strong.textContent = s.value;
    if (span)   span.textContent   = s.label;
  });

  // SERVICES
  const srvNum = $('#hizmetler .section__num');
  if (srvNum) srvNum.textContent = '01 — SERVICES';
  setText('#hizmetler .section__title', 'What We Offer');

  const srvGrid = $('.services__grid');
  if (srvGrid) {
    srvGrid.innerHTML = C.services.map(s => `
      <div class="service-card${s.accent ? ' service-card--accent' : ''}">
        <div class="service-card__top">
          <span class="service-card__icon">${s.icon}</span>
          <span class="service-card__num">${s.num}</span>
        </div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <a href="${waHref}" target="_blank" rel="noopener" class="service-card__link">Book Now →</a>
      </div>
    `).join('');
  }

  // ABOUT
  const aboutNum = $('#hakkimizda .section__num');
  if (aboutNum) aboutNum.textContent = '02 — ABOUT US';
  setHtml('#hakkimizda .section__title', C.aboutTitle.replace('\n', '<br>'));

  const aboutImg = $('.about__image img');
  if (aboutImg) { aboutImg.src = C.aboutImg; aboutImg.alt = C.aboutImgAlt; }
  setText('.about__img-tag', C.locationTag);

  const aboutPs = $$('.about__content p');
  if (aboutPs[0]) aboutPs[0].textContent = C.aboutP1;
  if (aboutPs[1]) aboutPs[1].textContent = C.aboutP2;

  $$('.about__stats .stat').forEach((el, i) => {
    const s = C.aboutStats[i]; if (!s) return;
    const strong = el.querySelector('strong');
    const span   = el.querySelector('span');
    if (strong) strong.textContent = s.value;
    if (span)   span.textContent   = s.label;
  });

  const aboutCta = $('.about__content a.btn');
  if (aboutCta) { aboutCta.href = waHref; aboutCta.textContent = 'Book an Appointment'; }

  // GALLERY
  const galNum = $('#galeri .section__num');
  if (galNum) galNum.textContent = '03 — GALLERY';
  setHtml('#galeri .section__title', 'After Their<br>Spa Day');

  const galGrid = $('.gallery__grid');
  if (galGrid) {
    galGrid.innerHTML = C.gallery.map(g => `
      <div class="gallery__item${g.mod ? ' ' + g.mod : ''}">
        <img src="${g.url}" alt="${g.alt}" loading="lazy">
        <div class="gallery__overlay"><span>${g.label}</span></div>
      </div>
    `).join('');
  }

  // REVIEWS
  const revNum = $('.section--reviews .section__num');
  if (revNum) { revNum.textContent = '04 — REVIEWS'; revNum.style.color = 'var(--primary)'; }
  setHtml('.section--reviews .section__title', 'What Our Clients<br>Say About Us');

  const track = $('.reviews__track');
  if (track) {
    const doubled = [...C.reviews, ...C.reviews];
    track.innerHTML = doubled.map(r => `
      <div class="review-card">
        <div class="review-card__stars">${r.stars}</div>
        <p>${r.text}</p>
        <span class="review-card__author">${r.author}</span>
      </div>
    `).join('');
  }

  // CONTACT
  const conNum = $('#iletisim .section__num');
  if (conNum) conNum.textContent = '05 — CONTACT';
  setText('#iletisim .section__title', 'Get in Touch');

  const conItems = $$('.contact__item');
  if (conItems[0]) {
    const strong = conItems[0].querySelector('strong');
    if (strong) strong.textContent = 'Address';
    const p = conItems[0].querySelector('p');
    if (p) p.textContent = C.address;
  }
  if (conItems[1]) {
    const strong = conItems[1].querySelector('strong');
    if (strong) strong.textContent = 'Phone';
    const a = conItems[1].querySelector('a');
    if (a) { a.href = telHref; a.textContent = C.phone; }
  }
  if (conItems[2]) {
    const strong = conItems[2].querySelector('strong');
    if (strong) strong.textContent = 'Business Hours';
    const ps = conItems[2].querySelectorAll('p');
    if (ps[0]) ps[0].innerHTML = C.hoursLines.slice(0, 2).join('<br>');
    if (ps[1]) ps[1].innerHTML = C.hoursLines.slice(2).join('<br>');
  }

  const conActionBtns = $$('.contact__actions a');
  if (conActionBtns[0]) { conActionBtns[0].href = waHref;  conActionBtns[0].textContent = 'WhatsApp Us'; }
  if (conActionBtns[1]) { conActionBtns[1].href = telHref; conActionBtns[1].textContent = 'Call Us'; }

  const mapFrame = $('.contact__map iframe');
  if (mapFrame) {
    mapFrame.src   = `https://maps.google.com/maps?q=${C.mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    mapFrame.title = 'Lavish Life Pet Spa Location';
  }

  // FOOTER
  setText('.footer__logo-sub',  C.nameSub);
  setText('.footer__logo-main', C.nameMain);
  setText('.footer__copy', C.footerCopy);

  $$('.footer__links a').forEach(a => {
    const t = a.textContent.trim();
    if (t.includes('Hizmet'))    a.textContent = 'Services';
    else if (t.includes('Galer')) a.textContent = 'Gallery';
    else if (t.includes('leti'))  a.textContent = 'Contact';
    else if (t.includes('Insta') || a.href.includes('instagram')) {
      a.href = C.instagram; a.textContent = 'Instagram →';
    }
  });

  // FAB
  const fab = $('.fab');
  if (fab) fab.href = waHref;

})();
