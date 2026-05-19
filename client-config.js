/**
 * MÜŞTERİ KONFİGÜRASYONU
 * Yeni müşteri için yalnızca bu dosyayı doldurun.
 * index.html, style.css ve script.js hiç değişmez.
 */
window.CLIENT = {

  /* ── MARKA ─────────────────────────────────────────── */
  name: {
    sub:  'BAHÇELİEVLER',   // Küçük üst yazı (şehir / semt vb.)
    main: 'PET PARK',        // Büyük logo metni (boşlukta otomatik alt satır)
  },
  tagline: 'Pet Kuaför & Petshop',
  city:    'Antalya',

  brand: {
    primary: '#0000EE',  // Butonlar, linkler, vurgu
    text:    '#58655A',  // Gövde metin
    dark:    '#111111',  // Başlıklar, koyu alanlar
  },

  /* ── İLETİŞİM ──────────────────────────────────────── */
  phone:     '0506 036 95 07',
  whatsapp:  '905060369507',  // Ülke kodu dahil, + ve boşluk yok
  address:   'Bahçelievler, 07100 Muratpaşa / Antalya',
  hours:     ['Pazartesi – Cumartesi: 09:00 – 20:00', 'Pazar: Kapalı'],
  instagram: 'https://www.instagram.com',
  mapQuery:  'Bahcelievler+Muratpasa+Antalya+Turkey',  // Google Maps arama terimi

  /* ── PUANLAMA ───────────────────────────────────────── */
  rating:      '4.4',
  reviewCount: 90,

  /* ── GÖRSELLER ─────────────────────────────────────── */
  heroImage:  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=1400&fit=crop&crop=center&q=85',
  aboutImage: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=85',

  /* ── HAKKIMIZDA METİNLERİ (dizi; her öğe bir paragraf) */
  aboutText: [
    'Antalya Bahçelievler\'de, evcil ve sokak dostlarımıza bakım hizmetleri ve kaliteli ürünler sunuyoruz. Muhammed Bey liderliğindeki ekibimiz, her hayvana özenli ve sevecen bir yaklaşımla hizmet verir.',
    'Anestezisiz tıraş konusundaki uzmanlığımızla hassas ve huzursuz hayvanlar bile konfor içinde bakım alıyor. Bize gelen her hayvan sağlıklı, temiz ve mutlu şekilde sahibine kavuşuyor.',
  ],

  /* ── İSTATİSTİK ÇUBUĞU (4 öğe) ───────────────────── */
  stats: [
    { value: '90+',         label: 'Mutlu Müşteri' },
    { value: '4.4★',        label: 'Google Puanı' },
    { value: 'Anestezisiz', label: 'Uzman Tıraş' },
    { value: 'Antalya',     label: 'Bahçelievler' },
  ],

  /* ── HİZMETLER (4 adet; son kart otomatik vurgu rengi) */
  services: [
    {
      icon: '✂️',
      title: 'Pet Tıraş',
      desc: 'Tüm ırk ve boyutlar için uzman el tıraşı. Hayvanınızın konforu her şeyin önünde.',
      ctaText: 'Randevu Al',
      ctaHref: 'tel:+905060369507',
    },
    {
      icon: '🛁',
      title: 'Grooming & Bakım',
      desc: 'Banyo, fön, tırnak kesimi ve kulak temizliği dahil kapsamlı bakım paketi.',
      ctaText: 'Randevu Al',
      ctaHref: 'tel:+905060369507',
    },
    {
      icon: '🏪',
      title: 'PetShop',
      desc: 'Mama, oyuncak, aksesuar ve evcil dostunuz için ihtiyaç duyacağınız her şey.',
      ctaText: 'Mağazaya Gel',
      ctaHref: 'tel:+905060369507',
    },
    {
      icon: '🐾',
      title: 'Anestezisiz Traş',
      desc: 'İlaç kullanmadan, güven içinde yapılan özel tıraş — hem güvenli hem stressiz.',
      ctaText: 'Bilgi Al',
      ctaHref: 'https://wa.me/905060369507',
    },
  ],

  /* ── GALERİ (5 öğe; layout: 'normal' | 'tall' | 'wide') */
  gallery: [
    { url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=600&q=85', label: 'Kedi Bakımı',    layout: 'tall' },
    { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=85', label: 'Grooming',      layout: 'normal' },
    { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=85', label: 'Tıraş Sonrası', layout: 'normal' },
    { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=85', label: 'Köpek Bakımı',  layout: 'normal' },
    { url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=900&q=85', label: 'Mutlu Dostlar', layout: 'wide' },
  ],

  /* ── MÜŞTERİ YORUMLARI (yalnızca iyi olanlar) ─────── */
  reviews: [
    { text: 'Çok teşekkür ederim, elinize emeğinize sağlık. Kızım çok güzel oldu 😻',                                       author: 'Google Yorumu' },
    { text: '🌟 Stresten uzak, mükemmel bir tıraş deneyimi!',                                                                author: 'Kseniia Kozel' },
    { text: 'Kedimiz hiç strese girmedi. Gönül rahatlığıyla tavsiye ederim ⭐⭐⭐⭐⭐',                                       author: 'Alper Genç' },
    { text: '2 tane kedi getirdim, ekibiniz gerçekten çok ilgiliydi ve özenle çalıştılar.',                                   author: 'Nadiia Özcan' },
    { text: 'Anestezisiz traşla tanıştığım günden beridir Muhammed Bey\'e götürüyorum. Çok memnunum!',                       author: 'Ozan Temur' },
    { text: 'İlgisi ve anlayışı için çok teşekkür ederim. Hem uygun hem de işini severek ve ustaca yapıyor.',                author: 'ilhan kahraman' },
    { text: 'Açık ara gittiğimiz en temiz salondu. Sahibi beyefendi çok ilgili ve bilgiliydi.',                               author: 'Beril' },
    { text: 'İşini çok iyi yapan, düzgün bir pet kuaförü. Anestezi almayan kedimi anestezisiz traş etti.',                   author: 'Nurettin TAYFUN' },
    { text: 'Devamlı tercih ettiğimiz, güvendiğimiz, profesyonel bir kuaför. Çok memnunuz!',                                 author: 'Taner Karagulle' },
  ],

};
