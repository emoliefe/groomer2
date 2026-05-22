# Lavish Life Pet Spa — Next.js 14 Canvas Scroll Sequence Site

> **System prompt** — hand this document verbatim to an AI coding assistant.  
> It contains every spec needed to build the full site from scratch.

---

## MISSION

Build a **production-ready, single-page marketing website** for **Lavish Life Pet Spa** (Cambria Heights, NY).  
The centrepiece is a **canvas-based scroll-scrubbing animation** that plays 122 JPEG frames as the user scrolls.  
The rest of the page is a premium dark-teal spa brand experience with smooth Framer Motion reveals.

---

## TECH STACK (non-negotiable)

| Layer | Choice |
|---|---|
| Framework | **Next.js 14** (App Router, `src/` dir) |
| Language | **TypeScript** — strict mode, no `any` |
| Styling | **Tailwind CSS v3** with a custom `lavish` palette |
| Animation | **Framer Motion** (`useScroll`, `useTransform`, `useMotionValueEvent`, `motion.*`) |
| Fonts | **Cormorant Garamond** (serif display) + **Outfit** (sans body) via `next/font/google` |
| Export | Static — `output: 'export'` in `next.config.mjs` |
| Images | `unoptimized: true` in next config (required for static export) |
| Deploy target | GitHub Pages (base path configured if repo name differs) |

---

## ABSOLUTE REQUIREMENTS

1. **122 frames** live at `public/frames/ezgif-frame-001.jpg` → `public/frames/ezgif-frame-122.jpg` (zero-padded, 3 digits).  
   The canvas sequence must load all 122 and scrub frame-accurately on scroll.
2. **No server components** that use Node APIs incompatible with static export.  
   All interactive components → `'use client'`.
3. **`scroll-behavior: auto`** on `<html>` — smooth-scroll breaks the canvas position maths.
4. WhatsApp CTA: `https://wa.me/16318252089`  
   Phone CTA: `tel:+16318252089`
5. Every Framer Motion component must have `initial`, `animate`/`whileInView`, and `transition` defined.
6. No placeholder lorem ipsum — use the real copy provided in this document.
7. `npm run build` must exit 0 with zero TypeScript errors.

---

## BRAND & IDENTITY

```
Name sub:   LAVISH LIFE
Name main:  PET SPA
Tagline:    Premium Grooming & Spa Treatments for Your Furry Family
Location:   Cambria Heights, NY
Address:    227-03 Linden Blvd, Cambria Heights, NY 11411
Phone:      +1 631-825-2089
WhatsApp:   16318252089
Rating:     4.7★  (164 Google Reviews)
Instagram:  https://www.instagram.com/lavishpetz/
```

---

## COLOR PALETTE

Add this to `tailwind.config.ts` under `theme.extend.colors`:

```ts
lavish: {
  50:  '#F0FDFA',   // mint cream
  100: '#CCFBF1',   // pale teal
  200: '#F5D32E',   // sunlit gold — primary accent
  300: '#D4A817',   // deep gold (hover)
  400: '#9A7B0A',   // antique brass
  500: '#0A7E8C',   // signature teal (primary brand)
  600: '#065F6E',   // deep teal (cards / overlays)
  700: '#044752',   // dark teal
  800: '#032F38',   // midnight teal (body)
  900: '#021E25',   // near-black teal (footer)
  950: '#010F12',   // ink teal
},
```

**Body background** (in `globals.css`):
```css
body {
  background: radial-gradient(ellipse at top center,
    #044752 0%, #032F38 50%, #010F12 100%
  );
  background-attachment: fixed;
  color: #CCFBF1;
  scroll-behavior: auto;
}
```

**CSS custom properties** (also in `globals.css`):
```css
:root {
  --primary:  #0A7E8C;
  --gold:     #F5D32E;
  --gold-dim: #D4A817;
  --dark:     #010F12;
  --body-bg:  #032F38;
  --text:     #CCFBF1;
  --text-dim: #7FB8C0;
}
```

---

## TYPOGRAPHY

```ts
// app/layout.tsx
import { Cormorant_Garamond, Outfit } from 'next/font/google';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});
```

Apply both font variables to `<html>` classname. In Tailwind config:
```ts
fontFamily: {
  serif: ['var(--font-serif)', 'Georgia', 'serif'],
  sans:  ['var(--font-sans)',  'system-ui', 'sans-serif'],
},
```

Rules of thumb:
- Display headings (`h1`, section titles): `font-serif`
- Body copy, UI labels, nav, buttons: `font-sans`

---

## FILE STRUCTURE

```
project-root/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── postcss.config.mjs
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── globals.css
│       └── page.tsx
└── components/
    ├── Loader.tsx
    ├── Navbar.tsx
    ├── HeroScrollSequence.tsx   ← canvas scrubbing + sticky wrapper
    ├── HeroTextOverlays.tsx     ← 4 text blocks that fade over canvas
    ├── AboutSection.tsx
    ├── ExperienceSection.tsx    ← 3-step journey cards
    ├── BookingSection.tsx
    ├── ReviewsMarquee.tsx
    └── Footer.tsx
```

`page.tsx` simply assembles the above in order:
```tsx
<Loader />
<Navbar />
<HeroScrollSequence>
  <HeroTextOverlays />
</HeroScrollSequence>
<AboutSection />
<ExperienceSection />
<BookingSection />
<ReviewsMarquee />
<Footer />
```

---

## COMPONENT SPECS

---

### 1. `Loader.tsx`

**Behaviour**  
- Renders a full-screen overlay (`position:fixed inset-0 z-[200]`) with the same body radial-gradient background.  
- Shows a branded title + progress bar.  
- Waits until all **122 frames** have loaded (via a `Promise.all` on `122 × new Image()`) **and** a minimum of 1.2 s has elapsed.  
- Then fades out with a 0.7 s Framer Motion opacity exit (`AnimatePresence`).

**Visual layout**:
```
┌─────────────────────────────────────────────────┐
│                                                 │
│            LAVISH LIFE  PET SPA                 │  ← gold gradient italic serif
│           Cambria Heights · NY                  │  ← tracked-widest text-dim sans
│                                                 │
│   ████████████████░░░░░░░░░░░░░░░░░░░  68 %    │  ← animated progress bar
│          Getting your pet ready…                │  ← fades in after 0.4 s
│                                                 │
└─────────────────────────────────────────────────┘
```

Progress bar:
- Width driven by `loadedCount / 122 * 100` state
- Bar background: gold → teal gradient, rounded-full, height 3px
- Track: `bg-lavish-700` at 30% opacity

Pass the array of preloaded `HTMLImageElement[]` up to `HeroScrollSequence` via a shared context or prop so frames don't load twice.

**TypeScript interface**:
```ts
interface LoaderProps {
  onComplete: (frames: HTMLImageElement[]) => void;
}
```

---

### 2. `Navbar.tsx`

**Behaviour**  
- Fixed at top, full-width.  
- Transparent by default; adds `backdrop-blur-md bg-lavish-900/80 shadow-lg` class after scrolling 40 px (`useScroll` → `scrollY > 40`).  
- Hamburger menu for mobile (Framer Motion height animation on the dropdown panel).

**Layout**:
```
[ 🐾 LAVISH LIFE PET SPA ]   Services  About  Reviews  Contact   [ Book Now ]
```

- Logo: gold inline paw-print SVG (20 × 20, stroke `#F5D32E`) + `LAVISH LIFE` (small-caps sans, tracking-widest, gold) + `PET SPA` (serif, text-2xl, white).
- Nav links: `font-sans text-sm tracking-wide text-lavish-100 hover:text-lavish-200 transition`.
- CTA button: `bg-lavish-200 text-lavish-950 font-sans font-semibold px-5 py-2 rounded-full hover:bg-lavish-300 transition`.
- Mobile breakpoint: `lg:hidden` for hamburger; `hidden lg:flex` for desktop links.

**Paw-print SVG** (use inline, no external file):
```svg
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <ellipse cx="5"  cy="9"  rx="2" ry="3" />
  <ellipse cx="19" cy="9"  rx="2" ry="3" />
  <ellipse cx="9"  cy="5"  rx="2" ry="2.5" />
  <ellipse cx="15" cy="5"  rx="2" ry="2.5" />
  <path d="M12 10c-4 0-7 3-6 7 .5 2 3 3 6 3s5.5-1 6-3c1-4-2-7-6-7z" />
</svg>
```

---

### 3. `HeroScrollSequence.tsx`

This is the most critical component. Read every word.

**Structural approach**  
- Renders a `<div id="hero-scrub-wrapper">` with `position: relative`.  
- Inside: a `<section id="hero">` with `position: sticky; top: 0; height: 100vh; overflow: hidden`.  
- Below the sticky section (still inside the wrapper): a transparent `<div>` spacer of height `122 * 22 = 2684px`.  
- The total wrapper height ≈ `100vh + 2684px`.

```
┌── hero-scrub-wrapper (relative) ────────────────────────────┐
│  ┌── hero (sticky, top:0, h:100vh) ──────────────────────┐  │
│  │                                                        │  │
│  │   LEFT panel (hero content / text overlays)            │  │
│  │   RIGHT panel (canvas)                                 │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                               │
│   [spacer 2684px — invisible, just pushes scroll]            │
└───────────────────────────────────────────────────────────────┘
```

**Canvas rendering**  
```ts
const FRAME_COUNT = 122;
const SCROLL_PX   = FRAME_COUNT * 22; // 2684

// On scroll:
const wrapperTop = wrapperRef.current.getBoundingClientRect().top;
const progress   = Math.max(0, Math.min(1, -wrapperTop / SCROLL_PX));
const frameIdx   = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
```

**Canvas sizing (DPR-aware)**  
```ts
const drawFrame = (img: HTMLImageElement) => {
  const dpr = window.devicePixelRatio || 1;
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width !== width * dpr) {
    canvas.width  = width  * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  // "cover" fit
  const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
  const sw = img.naturalWidth  * scale;
  const sh = img.naturalHeight * scale;
  const sx = (width  - sw) / 2;
  const sy = (height - sh) / 2;
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, sx, sy, sw, sh);
};
```

**Canvas styles**  
```ts
canvas.style.cssText = `
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
`;
```

**Frame loading**  
Accept `frames: HTMLImageElement[]` as a prop (passed from Loader so frames are already loaded).  
On mount draw frame 0. On scroll, redraw with `requestAnimationFrame` guard:

```ts
let rafId: number;
const handleScroll = () => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    // compute progress → draw
  });
};
window.addEventListener('scroll', handleScroll, { passive: true });
return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId); };
```

**Layout (desktop, lg+)**  
The sticky hero is split 50/50:
- Left 50%: hero text content (eyebrow, title, CTAs, service tags)
- Right 50%: `position: relative; height: 100%` → canvas fills it absolutely

**Mobile (< lg)**  
Canvas takes full width at top (height ~55vw), content stacks below it.

**Hero left content**:
```tsx
// Eyebrow row
<div className="flex items-center gap-3 text-sm font-sans text-lavish-100">
  <span className="bg-lavish-200 text-lavish-950 font-semibold px-3 py-0.5 rounded-full text-xs">
    ⭐ 4.7
  </span>
  <span>164 Google Reviews · Cambria Heights, NY</span>
</div>

// Title
<h1 className="font-serif">
  <span className="block text-base tracking-[0.3em] text-lavish-200 uppercase">LAVISH LIFE</span>
  <span className="block text-7xl lg:text-8xl font-bold leading-none text-white">PET<br/>SPA</span>
</h1>

// Tagline
<p className="font-sans text-lavish-100 text-lg max-w-sm">
  Premium Grooming & Spa Treatments for Your Furry Family
</p>

// CTA row
<div className="flex gap-3 flex-wrap">
  <a href="https://wa.me/16318252089" className="... btn-primary">
    {/* WhatsApp SVG */} WhatsApp Us
  </a>
  <a href="tel:+16318252089" className="... btn-outline">
    {/* Phone SVG */} Call Us
  </a>
</div>

// Service tags
<div className="flex flex-wrap gap-2 text-sm font-sans text-lavish-200">
  ✂️ Grooming · 🛁 Spa Baths · 🐾 Paw Care · 🎀 Finishing Touch
</div>
```

**Rating badge** (absolute on canvas panel, bottom-right):
```tsx
<div className="absolute bottom-6 right-6 bg-lavish-900/90 border border-lavish-600
                backdrop-blur-sm rounded-xl px-4 py-3 text-center">
  <strong className="block font-serif text-3xl text-lavish-200">4.7</strong>
  <span className="text-lavish-200 text-sm">★★★★½</span>
  <small className="block font-sans text-lavish-100 text-xs mt-1">164 reviews</small>
</div>
```

---

### 4. `HeroTextOverlays.tsx`

Four text blocks that appear/disappear as scroll progress moves through defined ranges.  
They overlay the LEFT panel of the hero.

**Implementation**: use `useScroll` from `HeroScrollSequenceContext` (or receive `scrollProgress: MotionValue<number>` as a prop).

```ts
const overlays = [
  {
    range:   [0.0, 0.15] as [number, number],
    heading: 'Lavish Life Pet Spa.',
    body:    'Where every pet gets the royal treatment.',
  },
  {
    range:   [0.20, 0.40] as [number, number],
    heading: 'Expert Grooming.',
    body:    'Breed-specific cuts, luxurious spa baths, and finishing touches — all under one roof in Cambria Heights.',
  },
  {
    range:   [0.45, 0.65] as [number, number],
    heading: 'Your pet deserves the best.',
    body:    'A spotlessly clean salon, warm-hearted groomers, and complimentary paw conditioning on every visit.',
  },
  {
    range:   [0.70, 0.85] as [number, number],
    heading: 'Not just a groom.',
    body:    'An experience.',            // ← render last word in gold gradient
    bodyGold: true,
  },
];
```

For each overlay, compute opacity from scroll progress:
```ts
// appear: progress 0 → range[0]+0.04 → opacity 0→1
// hold:   range[0]+0.04 → range[1]-0.04
// disappear: range[1]-0.04 → range[1] → opacity 1→0
const opacity = useTransform(
  scrollProgress,
  [range[0], range[0]+0.04, range[1]-0.04, range[1]],
  [0, 1, 1, 0]
);
```

Position: `position: absolute; inset: 0; display: flex; align-items: center; padding-left: 10%`.  
Heading: `font-serif text-5xl lg:text-6xl text-white font-semibold leading-tight max-w-md`  
Body: `font-sans text-lg text-lavish-100 mt-4 max-w-sm`  
Gold body variant: wrap in `<span className="bg-gradient-to-r from-lavish-200 to-lavish-300 bg-clip-text text-transparent">`

---

### 5. `AboutSection.tsx`

Section ID: `about`. Section number label: `02 — ABOUT US`.

**Framer Motion entrance**: `whileInView={{ opacity: 1, y: 0 }}` from `{ opacity: 0, y: 40 }`, `viewport={{ once: true, margin: '-100px' }}`.

**Layout (desktop)**:
```
┌────────────────────────┬──────────────────────────────┐
│  Image panel           │  Content panel               │
│  (left 45%)            │  (right 55%)                 │
│                        │                              │
│  ┌─────────────────┐   │  02 — ABOUT US               │
│  │                 │   │                              │
│  │  About image    │   │  We Genuinely                │
│  │  (groomed dog)  │   │  Love Your Pets.             │
│  │                 │   │                              │
│  └─────────────────┘   │  [p1 copy]                   │
│  ┌ Cambria Heights ┘   │  [p2 copy]                   │
│    · NY tag            │                              │
│                        │  164+  4.7★  100%            │
│                        │  Reviews  Rating  Satis.     │
│                        │                              │
│                        │  [ Book an Appointment ]     │
└────────────────────────┴──────────────────────────────┘
```

**Image**:  
`src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=85"`  
`alt="Happy groomed dog at Lavish Life Pet Spa"`  
Rounded-2xl, object-cover. Location tag absolutely positioned at bottom-left:  
`bg-lavish-900/80 backdrop-blur-sm text-lavish-200 text-xs font-sans tracking-widest px-3 py-1 rounded-tr-xl`  
Text: `Cambria Heights · NY`

**Copy** (verbatim):
> **P1:** At Lavish Life Pet Spa, we pour love and expertise into every appointment. Located in Cambria Heights, NY, our dedicated groomers treat each pet like family — delivering precise, breed-specific cuts and luxurious spa treatments that leave your furry companion looking and feeling their absolute best.

> **P2:** From our spotlessly clean salon to the little extras like complimentary paw conditioning, every detail is crafted to put your pet at ease. With a 4.7-star rating from over 164 happy clients, we've built our reputation one perfect grooming session at a time.

**Stats row** (3 items):
| Value | Label |
|---|---|
| `164+` | Google Reviews |
| `4.7★` | Avg Rating |
| `100%` | Client Satisfaction |

Each stat: `<strong>` in gold (`text-lavish-200 font-serif text-4xl`), label in `text-lavish-100 text-sm font-sans`.

**CTA**: `Book an Appointment` → `https://wa.me/16318252089`  
Style: `bg-lavish-200 text-lavish-950 font-semibold font-sans px-8 py-3 rounded-full hover:bg-lavish-300 transition`

**Feature tags** (below CTAs, optional):
`Expert Cuts` · `Spa Baths` · `Paw Care`  
Pill style: `border border-lavish-500 text-lavish-100 text-xs font-sans px-3 py-1 rounded-full`

---

### 6. `ExperienceSection.tsx`

Section label: `03 — THE LAVISH EXPERIENCE`  
Section title: `A Journey Worth\nEvery Wag.`  
Subtitle: `Three simple steps — extraordinary results every time.`

**Three cards** with staggered Framer Motion entrance (`staggerChildren: 0.15`):

```ts
const steps = [
  {
    icon: '🚗',           // or a custom SVG
    num:  '01',
    title: 'Arrive',
    desc:  'Pull up to our spotlessly clean Cambria Heights salon. A friendly face greets you and your pet at the door — no waiting, no stress.',
  },
  {
    icon: '✨',
    num:  '02',
    title: 'Pamper',
    desc:  'Your pet settles in for a full spa experience: expert bath, breed-specific cut, nail trim, ear cleaning, and complimentary paw conditioning.',
  },
  {
    icon: '🌟',
    num:  '03',
    title: 'Shine',
    desc:  'Pick up a freshly groomed, sweet-smelling companion who looks — and feels — absolutely lavish. Ready for their close-up.',
  },
];
```

**Card style**:
```
bg-lavish-800/50 border border-lavish-700 rounded-2xl p-8
hover:border-lavish-500 hover:bg-lavish-700/40 transition-all duration-300
```

Card number (`01`, `02`, `03`): top-right, `font-serif text-6xl text-lavish-700 font-bold leading-none select-none`  
Icon: `text-5xl mb-4`  
Title: `font-serif text-2xl text-white font-semibold mb-3`  
Desc: `font-sans text-lavish-100 text-sm leading-relaxed`

**Section background**: no extra bg — inherits body gradient. Add a subtle top border: `border-t border-lavish-700/30`.

---

### 7. `BookingSection.tsx`

Section label: `04 — BOOK YOUR APPOINTMENT`  
Section title: `Ready for the\nLavish Treatment?`  
Subtitle: `Cambria Heights' favourite pet spa — one message away.`

**Two-column layout (desktop)**:

```
┌────────────────────────────┬────────────────────────────┐
│  Booking CTAs              │  Info panel                │
│  (left)                    │  (right)                   │
│                            │                            │
│  [ 📱 Book on WhatsApp ]   │  📍 227-03 Linden Blvd,   │
│                            │     Cambria Heights,        │
│  [ 📞 Call Us ]            │     NY 11411               │
│                            │                            │
│                            │  🕐 Wed–Fri 10:30AM–6PM    │
│  4.7★ · 164 Reviews        │     Sat 10AM–5PM           │
│  Google                    │     Sun 10AM–4PM           │
│                            │     Mon–Tue Closed         │
│                            │                            │
│                            │  ★★★★½  4.7 / 5           │
│                            │  Based on 164 reviews       │
└────────────────────────────┴────────────────────────────┘
```

**Primary CTA** (WhatsApp):
```tsx
<a href="https://wa.me/16318252089" target="_blank" rel="noopener"
   className="inline-flex items-center gap-3 bg-lavish-200 text-lavish-950
              font-sans font-bold text-lg px-10 py-4 rounded-full
              hover:bg-lavish-300 transition-all duration-300
              shadow-[0_0_40px_rgba(245,211,46,0.25)]">
  {/* WhatsApp SVG */}
  Book on WhatsApp
</a>
```

**Secondary CTA** (Call):
```tsx
<a href="tel:+16318252089"
   className="inline-flex items-center gap-3 border-2 border-lavish-500
              text-lavish-100 font-sans font-semibold text-lg px-10 py-4
              rounded-full hover:border-lavish-200 hover:text-lavish-200 transition">
  {/* Phone SVG */}
  Call Us
</a>
```

**Google rating badge** (below CTAs):
```tsx
<div className="flex items-center gap-2 mt-6">
  <span className="text-lavish-200 text-xl">★★★★½</span>
  <span className="font-sans text-lavish-100 text-sm">
    <strong className="text-white">4.7</strong> · 164 Google Reviews
  </span>
</div>
```

**Hours** (exact data):
```ts
const hours = [
  'Monday – Tuesday: Closed',
  'Wednesday – Friday: 10:30 AM – 6:00 PM',
  'Saturday: 10:00 AM – 5:00 PM',
  'Sunday: 10:00 AM – 4:00 PM',
];
```

**WhatsApp SVG** (use inline):
```svg
<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
           -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463
           -2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606
           .134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371
           -.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
           -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016
           -1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487
           .709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758
           -.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.526 5.847L0 24l6.335-1.488
           A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22
           c-1.885 0-3.645-.493-5.17-1.355l-.369-.218-3.826.899.942-3.718-.24-.382
           A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
</svg>
```

---

### 8. `ReviewsMarquee.tsx`

Section label: `05 — REVIEWS` (in gold `text-lavish-200`)  
Section title: `What Our Clients\nSay About Us`

**Reviews data** (6 real reviews, doubled for seamless loop):
```ts
const reviews = [
  {
    stars: '★★★★★',
    text: '"Super friendly staff & they give great quality cuts ONLY!"',
    author: '— Google Review',
  },
  {
    stars: '★★★★★',
    text: '"The place was very clean and they even conditioned my dog\'s paws as a courtesy."',
    author: '— Google Review',
  },
  {
    stars: '★★★★★',
    text: '"He always smells, looks and feels great once groomed by Lavish Life Pet Spa. Customer service is also excellent!"',
    author: '— Cassie Dean',
  },
  {
    stars: '★★★★★',
    text: '"PERFECTION!!! Trini\'s awesome work made Whiskey look great — he also smells and feels wonderful."',
    author: '— Bluest',
  },
  {
    stars: '★★★★★',
    text: '"Her warmth, kind, loving and caring soul made both of our visits extremely comfortable. We\'re definitely coming back!"',
    author: '— Google Review',
  },
  {
    stars: '★★★★★',
    text: '"The owner personally reached out to make things right. That level of care is rare and truly appreciated."',
    author: '— Google Review',
  },
];
```

**Marquee CSS** (pure CSS animation, no JS):
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.reviews-track {
  display: flex;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.reviews-track:hover {
  animation-play-state: paused;
}
```

Track contains `[...reviews, ...reviews]` (12 cards total) — first and second half are identical so the loop is seamless.

**Review card**:
```tsx
<div className="flex-shrink-0 w-80 mx-3 bg-lavish-800/60 border border-lavish-700
                rounded-2xl p-6 backdrop-blur-sm">
  <div className="text-lavish-200 text-lg mb-3">{stars}</div>
  <p className="font-sans text-lavish-100 text-sm leading-relaxed italic mb-4">{text}</p>
  <span className="font-sans text-lavish-400 text-xs tracking-wide">{author}</span>
</div>
```

Outer wrapper: `overflow-hidden` with left/right fade mask:
```css
mask-image: linear-gradient(
  to right,
  transparent 0%,
  black 8%,
  black 92%,
  transparent 100%
);
```

---

### 9. `Footer.tsx`

**Background**: `bg-lavish-950` with a top border `border-t border-lavish-800`.

**Layout**:
```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  🐾 LAVISH LIFE                    Services          │
│     PET SPA                        Gallery           │
│                                    Reviews           │
│  Premium Pet Grooming &            Contact           │
│  Spa — Cambria Heights, NY         Instagram →       │
│                                    WhatsApp →        │
│                                                      │
│  ─────────────────────────────────────────────────   │
│  © 2025 Lavish Life Pet Spa. Cambria Heights, NY.    │
└──────────────────────────────────────────────────────┘
```

**Footer links**:
```ts
const links = [
  { label: 'Services',    href: '#services'  },
  { label: 'About',       href: '#about'     },
  { label: 'Reviews',     href: '#reviews'   },
  { label: 'Contact',     href: '#contact'   },
  { label: 'Instagram →', href: 'https://www.instagram.com/lavishpetz/', external: true },
  { label: 'WhatsApp →',  href: 'https://wa.me/16318252089',             external: true },
];
```

Link style: `font-sans text-sm text-lavish-400 hover:text-lavish-200 transition`.  
Copyright: `font-sans text-xs text-lavish-600`.

---

## PAGE SECTION ORDER

```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <>
      <Loader onComplete={setFrames} />          {/* unmounts after load */}
      <Navbar />
      <main>
        <section id="hero">
          <HeroScrollSequence frames={frames}>
            <HeroTextOverlays />
          </HeroScrollSequence>
        </section>

        <section id="about">
          <AboutSection />
        </section>

        <section id="services">
          <ExperienceSection />
        </section>

        <section id="reviews">
          <ReviewsMarquee />
        </section>

        <section id="contact">
          <BookingSection />
        </section>
      </main>
      <Footer />

      {/* Floating WhatsApp button */}
      <a href="https://wa.me/16318252089" target="_blank" rel="noopener"
         aria-label="Chat on WhatsApp"
         className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white
                    w-14 h-14 rounded-full flex items-center justify-center
                    shadow-lg hover:scale-110 transition-transform">
        {/* WhatsApp SVG, size 26×26 */}
      </a>
    </>
  );
}
```

---

## `next.config.mjs`

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deployed to https://<user>.github.io/<repo-name>/, set:
  // basePath: '/<repo-name>',
  // assetPrefix: '/<repo-name>/',
  trailingSlash: true,
};

export default nextConfig;
```

---

## `tailwind.config.ts` (full, important parts)

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lavish: {
          50:  '#F0FDFA',
          100: '#CCFBF1',
          200: '#F5D32E',
          300: '#D4A817',
          400: '#9A7B0A',
          500: '#0A7E8C',
          600: '#065F6E',
          700: '#044752',
          800: '#032F38',
          900: '#021E25',
          950: '#010F12',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)',  'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## `globals.css` (essential rules)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary:  #0A7E8C;
  --gold:     #F5D32E;
  --gold-dim: #D4A817;
  --dark:     #010F12;
  --body-bg:  #032F38;
  --text:     #CCFBF1;
  --text-dim: #7FB8C0;
}

html {
  scroll-behavior: auto; /* CRITICAL: smooth breaks canvas position calc */
}

body {
  background: radial-gradient(ellipse at top center,
    #044752 0%, #032F38 50%, #010F12 100%
  );
  background-attachment: fixed;
  color: #CCFBF1;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

/* Marquee overflow */
.marquee-container {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right, transparent 0%, black 8%, black 92%, transparent 100%
  );
  mask-image: linear-gradient(
    to right, transparent 0%, black 8%, black 92%, transparent 100%
  );
}

.reviews-track:hover {
  animation-play-state: paused;
}

/* Canvas container must be relative */
#hero-canvas-panel {
  position: relative;
  overflow: hidden;
}
```

---

## `package.json` — dependencies

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0",
    "next": "14.2.x",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10",
    "postcss": "^8",
    "tailwindcss": "^3",
    "typescript": "^5"
  }
}
```

---

## FRAME LOADING PATTERN (shared state)

Use a simple React context to share preloaded frames between Loader and HeroScrollSequence:

```tsx
// context/FramesContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface FramesCtx {
  frames: HTMLImageElement[];
  setFrames: (f: HTMLImageElement[]) => void;
}

const Ctx = createContext<FramesCtx>({ frames: [], setFrames: () => {} });

export function FramesProvider({ children }: { children: ReactNode }) {
  const [frames, setFrames] = useState<HTMLImageElement[]>([]);
  return <Ctx.Provider value={{ frames, setFrames }}>{children}</Ctx.Provider>;
}

export const useFrames = () => useContext(Ctx);
```

Wrap `<body>` children in `<FramesProvider>` inside `layout.tsx`.

---

## PERFORMANCE NOTES

1. **RAF guard** — never draw inside a `scroll` event directly. Always wrap in `requestAnimationFrame`.
2. **DPR scaling** — only resize canvas when container dimensions actually change (compare against cached `prevWidth`).
3. **Image preload priority** — frame 1 draws immediately (`img.onload` for `i === 0`). Rest load in background.
4. **No layout thrash** — read `getBoundingClientRect()` once per RAF call; cache wrapper ref.
5. **Intersection Observer** — all sections below the hero fold use `whileInView` with `once: true` so they only animate on first appearance.
6. **`will-change: transform`** on marquee track (applied via inline style, not class, to avoid layout thrash on non-animating elements).

---

## QUALITY CHECKLIST

Before considering the build done, verify:

- [ ] `npm run build` exits 0, zero TypeScript errors, zero ESLint errors
- [ ] Frame 1 is visible immediately on page load (before scroll)
- [ ] Scrubbing from frame 1 → 122 is smooth and jitter-free on both desktop and mobile
- [ ] Text overlays fade in/out at correct scroll positions
- [ ] Loader hides after all 122 frames load
- [ ] Navbar turns opaque after 40px scroll
- [ ] All CTAs point to correct WhatsApp / phone links
- [ ] Mobile layout (< 1024px): canvas stacks above text
- [ ] `window.scrollY` resets to 0 on refresh — canvas shows frame 1
- [ ] No horizontal scroll anywhere on the page
- [ ] Marquee pauses on hover
- [ ] `alt` text on all `<img>` and `<canvas>` (`aria-label`)
- [ ] Static export produces valid `out/` directory
- [ ] `out/index.html` loads locally from `file://` (no missing assets)

---

## COMMON PITFALLS TO AVOID

| Pitfall | Fix |
|---|---|
| `smooth scroll` on `<html>` | Set `scroll-behavior: auto` |
| Canvas DPI blurriness | Apply `devicePixelRatio` scaling |
| Frame images load twice | Use shared `FramesContext` |
| Framer Motion SSR mismatch | Mark all interactive components `'use client'` |
| `next/image` errors on static export | Use `<img>` or set `unoptimized: true` |
| Canvas not resizing on window resize | Add `ResizeObserver` on canvas panel |
| Marquee gaps / jumps | Duplicate reviews array exactly once (12 total) |
| Build fails on `window` reference | Guard with `typeof window !== 'undefined'` or `useEffect` |

---

*End of prompt — everything needed to build Lavish Life Pet Spa from scratch is above.*
