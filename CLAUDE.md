# Pet Shop Website Template — Claude Talimatları

## Proje Nedir?

Statik bir pet shop / pet kuaför web sitesi template'i. Aynı tasarım farklı müşterilere satılır. Her müşteri için **sadece `client-config.js` değişir** — diğer 3 dosya hiç değişmez.

## Dosya Mimarisi

```
/
├── index.html          ← HİÇ DEĞİŞMEZ
├── style.css           ← HİÇ DEĞİŞMEZ
├── script.js           ← HİÇ DEĞİŞMEZ
└── client-config.js    ← SADECE BU DEĞİŞİR (her müşteri için yeni)
```

## Yeni Müşteri Talebi Geldiğinde

Kullanıcı yeni bir işletme için site istediğinde:

1. **SADECE `client-config.js` dosyasını yaz** — index.html / style.css / script.js'e dokunma
2. Aşağıdaki şemayı kullan
3. Commit + push et

## client-config.js Şeması

```js
window.CLIENT = {

  /* MARKA */
  name: {
    sub:  'SEMT ADI',       // Küçük üst yazı (şehir/semt)
    main: 'İŞLETME ADI',   // Büyük logo metni
  },
  tagline: 'Pet Kuaför & Petshop',  // Kısa slogan
  city:    'Şehir',

  brand: {
    primary: '#0000EE',  // Ana renk (buton, link, vurgu)
    text:    '#58655A',  // Gövde metin rengi
    dark:    '#111111',  // Başlık rengi
  },

  /* İLETİŞİM */
  phone:     '05XX XXX XX XX',
  whatsapp:  '90XXXXXXXXXX',  // Ülke kodu dahil, + ve boşluk yok
  address:   'Mahalle, Posta Kodu İlçe / Şehir',
  hours:     ['Pazartesi – Cumartesi: 09:00 – 20:00', 'Pazar: Kapalı'],
  instagram: 'https://www.instagram.com/kullanici_adi',
  mapQuery:  'Mahalle+Ilce+Sehir+Turkey',  // Google Maps arama terimi

  /* PUANLAMA */
  rating:      '4.5',
  reviewCount: 100,

  /* GÖRSELLER */
  heroImage:  'https://images.unsplash.com/photo-XXXX?w=1200&h=1400&fit=crop&q=85',
  aboutImage: 'https://images.unsplash.com/photo-XXXX?w=800&q=85',

  /* HAKKIMIZDA (her öğe ayrı paragraf) */
  aboutText: [
    'Birinci paragraf...',
    'İkinci paragraf...',
  ],

  /* STATS ÇUBUĞU (4 öğe) */
  stats: [
    { value: '100+',    label: 'Mutlu Müşteri' },
    { value: '4.5★',    label: 'Google Puanı' },
    { value: 'Uzman',   label: 'Grooming' },
    { value: 'Şehir',   label: 'Semt' },
  ],

  /* HİZMET KARTLARI (4 adet; son kart otomatik vurgu rengi alır) */
  services: [
    { icon: '✂️', title: 'Pet Tıraş',        desc: '...', ctaText: 'Randevu Al',   ctaHref: 'tel:+90XXXXXXXXXX' },
    { icon: '🛁', title: 'Grooming & Bakım', desc: '...', ctaText: 'Randevu Al',   ctaHref: 'tel:+90XXXXXXXXXX' },
    { icon: '🏪', title: 'PetShop',          desc: '...', ctaText: 'Mağazaya Gel', ctaHref: 'tel:+90XXXXXXXXXX' },
    { icon: '🐾', title: 'Özel Hizmet',      desc: '...', ctaText: 'Bilgi Al',     ctaHref: 'https://wa.me/90XXXXXXXXXX' },
  ],

  /* GALERİ (5 öğe; layout: 'normal' | 'tall' | 'wide') */
  gallery: [
    { url: 'https://images.unsplash.com/...', label: 'Kedi Bakımı',    layout: 'tall' },
    { url: 'https://images.unsplash.com/...', label: 'Grooming',       layout: 'normal' },
    { url: 'https://images.unsplash.com/...', label: 'Tıraş Sonrası',  layout: 'normal' },
    { url: 'https://images.unsplash.com/...', label: 'Köpek Bakımı',   layout: 'normal' },
    { url: 'https://images.unsplash.com/...', label: 'Mutlu Dostlar',  layout: 'wide' },
  ],

  /* MÜŞTERİ YORUMLARI */
  reviews: [
    { text: 'Yorum metni...', author: 'Ad Soyad' },
  ],

};
```

## Mevcut Müşteri: Bahçelievler Pet Park

Bu repodaki `client-config.js` Antalya Bahçelievler'deki "Pet Park" işletmesine aittir.
- Telefon: 0506 036 95 07
- Adres: Bahçelievler, 07100 Muratpaşa / Antalya
- Rating: 4.4 (90 yorum)

## Deploy

GitHub Pages: branch `claude/pet-shop-website-design-e5wpK`, root klasör.
URL: `https://emoliefe.github.io/Deneme/`
