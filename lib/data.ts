// ==================== PRODUCERS ====================
export interface Producer {
  id: number;
  name: string;
  location: string;
  desc: string;
  color: string;
  tags: string[];
  featured: boolean;
  rating: number;
  productCount: number;
}

export const PRODUCERS: Producer[] = [
  { id: 1, name: "Ayşe Teyze Çiftliği", location: "Bolu, Mengen", desc: "30 yıllık tecrübesiyle doğal süt ve yumurta üretimi. Serbest dolaşan tavuklar, mera hayvancılığı.", color: "#8B4513", tags: ["Süt", "Yumurta", "Tereyağı"], featured: true, rating: 4.9, productCount: 12 },
  { id: 2, name: "Karadeniz Organik", location: "Rize, Çamlıhemşin", desc: "Yaylalarda organik sebze ve meyve üretimi. Hiçbir kimyasal kullanılmamaktadır.", color: "#2d6a1e", tags: ["Sebze", "Meyve", "Organik"], featured: true, rating: 4.8, productCount: 18 },
  { id: 3, name: "Anadolu Lezzetleri", location: "Konya, Beyşehir", desc: "Geleneksel yöntemlerle tahıl ve baklagil üretimi. Dededen toruna çiftçilik.", color: "#d4a017", tags: ["Tahıl", "Baklagil", "Un"], featured: true, rating: 4.7, productCount: 10 },
  { id: 4, name: "Ege Çiftliği", location: "İzmir, Seferihisar", desc: "Ege'nin verimli topraklarında zeytinyağı ve narenciye üretimi.", color: "#1a5276", tags: ["Zeytinyağı", "Narenciye"], featured: false, rating: 4.6, productCount: 8 },
  { id: 5, name: "Balkan Et Çiftliği", location: "Edirne, Keşan", desc: "Doğal mera hayvancılığı ile et ve tavuk üretimi. Antibiyotik yok.", color: "#c0392b", tags: ["Et", "Tavuk"], featured: true, rating: 4.8, productCount: 14 },
  { id: 6, name: "Akdeniz Tropik", location: "Antalya, Kumluca", desc: "Akdeniz ikliminde tropik meyve ve sera sebze üretimi.", color: "#e67e22", tags: ["Meyve", "Sera"], featured: false, rating: 4.5, productCount: 9 },
  { id: 7, name: "Bal Köyü", location: "Muğla, Marmaris", desc: "Çam balı ve çiçek balı üretimi. Arıcılıkta 3 nesil tecrübe.", color: "#f39c12", tags: ["Bal", "Arı Ürünleri"], featured: true, rating: 4.9, productCount: 6 },
  { id: 8, name: "Doğal Temizlik", location: "Bursa, Nilüfer", desc: "Ev yapımı doğal temizlik ürünleri. Sabun, şampuan ve temizlik.", color: "#8e44ad", tags: ["Temizlik", "Kozmetik"], featured: false, rating: 4.4, productCount: 11 },
];

// ==================== PRODUCTS ====================
export interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  icon: string;
  badge: string;
  badgeClass: string;
  category: string;
  producerId: number;
  organic: boolean;
  description?: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Günlük Taze Süt", weight: "1 Litre", price: 22.90, icon: "🥛", badge: "", badgeClass: "", category: "sut-urunleri", producerId: 1, organic: true, description: "Pasteüze edilmemiş günlük süt" },
  { id: 2, name: "Köy Yumurtası", weight: "30'lu", price: 49.90, icon: "🥚", badge: "Çok Satan", badgeClass: "", category: "yumurta", producerId: 1, organic: true, description: "Serbest dolaşan tavuklardan" },
  { id: 3, name: "Tereyağı", weight: "500 g", price: 89.90, icon: "🧈", badge: "Organik", badgeClass: "organic", category: "sut-urunleri", producerId: 1, organic: true },
  { id: 4, name: "Beyaz Peynir", weight: "1 kg", price: 74.90, icon: "🧀", badge: "", badgeClass: "", category: "sut-urunleri", producerId: 1, organic: false },
  { id: 5, name: "Mevsim Domates", weight: "1 kg", price: 18.90, icon: "🍅", badge: "Taze", badgeClass: "organic", category: "sebze-meyve", producerId: 2, organic: true },
  { id: 6, name: "Organik Salatalık", weight: "1 kg", price: 14.90, icon: "🥒", badge: "Organik", badgeClass: "organic", category: "sebze-meyve", producerId: 2, organic: true },
  { id: 7, name: "Yeşil Biber", weight: "500 g", price: 9.90, icon: "🫑", badge: "", badgeClass: "", category: "sebze-meyve", producerId: 2, organic: false },
  { id: 8, name: "Taze Portakal", weight: "1 kg", price: 24.90, icon: "🍊", badge: "Mevsim", badgeClass: "organic", category: "sebze-meyve", producerId: 6, organic: true },
  { id: 9, name: "Tam Buğday Unu", weight: "2 kg", price: 28.90, icon: "🌾", badge: "", badgeClass: "", category: "tahil", producerId: 3, organic: false },
  { id: 10, name: "Mercimek", weight: "1 kg", price: 32.90, icon: "🫘", badge: "", badgeClass: "", category: "tahil", producerId: 3, organic: false },
  { id: 11, name: "Çam Balı", weight: "500 g", price: 129.90, icon: "🍯", badge: "Organik", badgeClass: "organic", category: "bal", producerId: 7, organic: true },
  { id: 12, name: "Çiçek Balı", weight: "500 g", price: 99.90, icon: "🍯", badge: "", badgeClass: "", category: "bal", producerId: 7, organic: true },
  { id: 13, name: "Tavuk But", weight: "1 kg", price: 42.90, icon: "🍗", badge: "", badgeClass: "", category: "et", producerId: 5, organic: false },
  { id: 14, name: "Dana Kıyma", weight: "500 g", price: 89.90, icon: "🥩", badge: "Taze", badgeClass: "", category: "et", producerId: 5, organic: false },
  { id: 15, name: "Zeytinyağı", weight: "1 L", price: 149.90, icon: "🫒", badge: "Soğuk Sıkım", badgeClass: "organic", category: "sut-urunleri", producerId: 4, organic: true },
  { id: 16, name: "Doğal Sabun", weight: "100 g", price: 34.90, icon: "🧼", badge: "", badgeClass: "", category: "temizlik", producerId: 8, organic: true },
  { id: 17, name: "El Yapımı Şampuan", weight: "250 ml", price: 59.90, icon: "🧴", badge: "Doğal", badgeClass: "organic", category: "kozmetik", producerId: 8, organic: true },
  { id: 18, name: "Meyve Çayı", weight: "100 g", price: 24.90, icon: "🍵", badge: "", badgeClass: "", category: "icecek", producerId: 2, organic: true },
  { id: 19, name: "Yulaf Ezmesi", weight: "500 g", price: 19.90, icon: "🥣", badge: "", badgeClass: "", category: "atistirmalik", producerId: 3, organic: true },
  { id: 20, name: "Taze İncir", weight: "1 kg", price: 39.90, icon: "🫐", badge: "Mevsim", badgeClass: "organic", category: "sebze-meyve", producerId: 4, organic: true },
];

// ==================== SUBSCRIPTION PLANS ====================
export interface SubPlan {
  id: string;
  name: string;
  desc: string;
  basePrice: number;
  icon: string;
  color: string;
  baseItems: { name: string; amount: string; icon: string }[];
  popular?: boolean;
}

export const SUBSCRIPTION_PLANS: SubPlan[] = [
  {
    id: "kucuk",
    name: "Küçük Paket",
    desc: "Tek Hür / Bireysel",
    basePrice: 49.90,
    icon: "🧑",
    color: "from-emerald-50 to-green-100",
    baseItems: [
      { name: "Günlük Taze Süt", amount: "1 Litre", icon: "🥛" },
      { name: "Köy Yumurtası", amount: "15 Adet", icon: "🥚" },
    ],
  },
  {
    id: "orta",
    name: "Orta Paket",
    desc: "Çekirdek Aile",
    basePrice: 89.90,
    icon: "👨‍👩‍👧",
    color: "from-amber-50 to-orange-100",
    baseItems: [
      { name: "Günlük Taze Süt", amount: "3 Litre", icon: "🥛" },
      { name: "Köy Yumurtası", amount: "15 Adet", icon: "🥚" },
    ],
    popular: true,
  },
  {
    id: "buyuk",
    name: "Büyük Aile Paketi",
    desc: "Kalabalık Aileler İçin",
    basePrice: 149.90,
    icon: "👨‍👩‍👧‍👦",
    color: "from-rose-50 to-pink-100",
    baseItems: [
      { name: "Günlük Taze Süt", amount: "5 Litre", icon: "🥛" },
      { name: "Köy Yumurtası", amount: "30 Adet", icon: "🥚" },
    ],
  },
];

// ==================== EXTRA ITEMS ====================
export interface ExtraItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  icon: string;
  description: string;
  options?: { label: string; value: number; priceModifier: number }[];
}

export const EXTRA_ITEMS: ExtraItem[] = [
  // Peynir & Süt Ürünleri
  { id: "peynir-1", name: "Köy Peyniri", category: "Peynir, Süt Ürünleri", unit: "250g", price: 45.00, icon: "🧀", description: "Tam yağlı doğal köy peyniri", options: [
    { label: "250g", value: 250, priceModifier: 0 },
    { label: "500g", value: 500, priceModifier: 35 },
    { label: "1kg", value: 1000, priceModifier: 80 },
  ]},
  { id: "tereyagi-1", name: "Köy Tereyağı", category: "Peynir, Süt Ürünleri", unit: "250g", price: 55.00, icon: "🧈", description: "Yayık tereyağı, doğal tuzlu", options: [
    { label: "250g", value: 250, priceModifier: 0 },
    { label: "500g", value: 500, priceModifier: 45 },
  ]},
  { id: "yogurt-1", name: "Süzme Yoğurt", category: "Peynir, Süt Ürünleri", unit: "1kg", price: 32.00, icon: "🥣", description: "Ev yapımı tam yağlı süzme yoğurt" },

  // Reçel & Bal
  { id: "recel-1", name: "Ev Yapımı Reçel", category: "Kahvaltılık", unit: "340g", price: 38.00, icon: "🍓", description: "Mevsim meyvelerinden doğal reçel", options: [
    { label: "Çilek", value: 1, priceModifier: 0 },
    { label: "Vişne", value: 2, priceModifier: 0 },
    { label: "Kayısı", value: 3, priceModifier: 5 },
    { label: "İncir", value: 4, priceModifier: 8 },
  ]},
  { id: "bal-1", name: "Çiçek Balı", category: "Kahvaltılık", unit: "500g", price: 89.00, icon: "🍯", description: "Doğal çiçek balı", options: [
    { label: "500g", value: 500, priceModifier: 0 },
    { label: "1kg", value: 1000, priceModifier: 75 },
  ]},
  { id: "zeytinyagi-1", name: "Soğuk Sıkım Zeytinyağı", category: "Temel Gıda", unit: "500ml", price: 79.00, icon: "🫒", description: "Erken hasat naturel sızma", options: [
    { label: "500ml", value: 500, priceModifier: 0 },
    { label: "1L", value: 1000, priceModifier: 65 },
  ]},

  // Mevsim Meyveleri
  { id: "portakal-1", name: "Taze Portakal", category: "Sebze, Meyve", unit: "1kg", price: 24.90, icon: "🍊", description: "Mevsim portakalı", options: [
    { label: "1kg", value: 1, priceModifier: 0 },
    { label: "2kg", value: 2, priceModifier: 20 },
    { label: "3kg", value: 3, priceModifier: 45 },
  ]},
  { id: "elma-1", name: "Amasya Elması", category: "Sebze, Meyve", unit: "1kg", price: 22.90, icon: "🍎", description: "Kırmızı Amasya elması", options: [
    { label: "1kg", value: 1, priceModifier: 0 },
    { label: "2kg", value: 2, priceModifier: 18 },
    { label: "3kg", value: 3, priceModifier: 40 },
  ]},
  { id: "muz-1", name: "Muz", category: "Sebze, Meyve", unit: "1kg", price: 29.90, icon: "🍌", description: "Olgun muz" },
  { id: "cilek-1", name: "Çilek", category: "Sebze, Meyve", unit: "500g", price: 34.90, icon: "🍓", description: "Taze çilek (mevsiminde)" },
  { id: "kavun-1", name: "Karpuz/Kavun", category: "Sebze, Meyve", unit: "1 Adet", price: 19.90, icon: "🍈", description: "Mevsim karpuz veya kavun" },

  // Mevsim Sebzeleri
  { id: "domates-1", name: "Mevsim Domates", category: "Sebze, Meyve", unit: "1kg", price: 18.90, icon: "🍅", description: "Toprak domatesi", options: [
    { label: "1kg", value: 1, priceModifier: 0 },
    { label: "2kg", value: 2, priceModifier: 15 },
    { label: "3kg", value: 3, priceModifier: 30 },
  ]},
  { id: "biber-1", name: "Çarliston Biber", category: "Sebze, Meyve", unit: "500g", price: 12.90, icon: "🫑", description: "Taze çarliston biber" },
  { id: "salatalik-1", name: "Taze Salatalık", category: "Sebze, Meyve", unit: "1kg", price: 14.90, icon: "🥒", description: "Kırık salatalık", options: [
    { label: "1kg", value: 1, priceModifier: 0 },
    { label: "2kg", value: 2, priceModifier: 12 },
  ]},
  { id: "marul-1", name: "Kıvırcık Marul", category: "Sebze, Meyve", unit: "1 Adet", price: 8.90, icon: "🥬", description: "Taze koparma marul" },
  { id: "havuc-1", name: "Havuç", category: "Sebze, Meyve", unit: "1kg", price: 10.90, icon: "🥕", description: "Taze havuç" },
  { id: "patates-1", name: "Patates", category: "Sebze, Meyve", unit: "2kg", price: 15.90, icon: "🥔", description: "Yemeklik patates" },
  { id: "sogan-1", name: "Kuru Soğan", category: "Sebze, Meyve", unit: "2kg", price: 12.90, icon: "🧅", description: "Kuru soğan" },

  // Atıştırmalık & Diğer
  { id: "yumurta-extra-1", name: "Köy Yumurtası (Ek)", category: "Yumurta", unit: "Adet", price: 3.50, icon: "🥚", description: "Serbest dolaşan tavuklardan", options: [
    { label: "10 Adet", value: 10, priceModifier: 0 },
    { label: "15 Adet", value: 15, priceModifier: -5 },
    { label: "30 Adet", value: 30, priceModifier: -15 },
  ]},
  { id: "sut-extra-1", name: "Günlük Taze Süt (Ek)", category: "Süt Ürünleri", unit: "Litre", price: 22.90, icon: "🥛", description: "Pasteüze edilmemiş günlük süt", options: [
    { label: "1 Litre", value: 1, priceModifier: 0 },
    { label: "3 Litre", value: 3, priceModifier: -2 },
    { label: "5 Litre", value: 5, priceModifier: -5 },
    { label: "10 Litre", value: 10, priceModifier: -12 },
  ]},
  { id: "ekmek-1", name: "Köy Ekmeği", category: "Fırın, Pastane", unit: "1 Adet", price: 12.00, icon: "🍞", description: "Taş fırın köy ekmeği" },
  { id: "tahin-1", name: "Tahin", category: "Kahvaltılık", unit: "500g", price: 49.00, icon: "🫘", description: "Doğal susam tahini" },
  { id: "pekmez-1", name: "Pekmez", category: "Kahvaltılık", unit: "500g", price: 42.00, icon: "🍯", description: "Üzüm pekmezi" },
];

// ==================== BOX BUILDER PRODUCTS ====================
export interface BoxProduct {
  id: string;
  name: string;
  category: "sut" | "yumurta" | "sarkuteri" | "mevsimlik";
  unit: string;
  price: number;
  emoji: string;
  description?: string;
  options?: { label: string; value: number; priceModifier: number }[];
}

export interface BoxItem {
  product: BoxProduct;
  quantity: number;
  selectedOption?: { label: string; value: number; priceModifier: number };
}

export const BOX_PRODUCTS: BoxProduct[] = [
  { id: "sut-1", name: "Günlük Taze Süt", category: "sut", unit: "Litre", price: 22.90, emoji: "🥛", description: "Pasteüze edilmemiş günlük süt", options: [
    { label: "1 Litre", value: 1, priceModifier: 0 },
    { label: "3 Litre", value: 3, priceModifier: -2 },
    { label: "5 Litre", value: 5, priceModifier: -5 },
    { label: "10 Litre", value: 10, priceModifier: -12 },
  ]},
  { id: "yumurta-1", name: "Köy Yumurtası", category: "yumurta", unit: "Adet", price: 3.50, emoji: "🥚", description: "Serbest dolaşan tavuklardan", options: [
    { label: "10 Adet", value: 10, priceModifier: 0 },
    { label: "15 Adet", value: 15, priceModifier: -5 },
    { label: "30 Adet", value: 30, priceModifier: -15 },
  ]},
  { id: "peynir-1", name: "Köy Peyniri", category: "sarkuteri", unit: "250g", price: 45.00, emoji: "🧀", description: "Tam yağlı doğal köy peyniri" },
  { id: "recel-1", name: "Ev Yapımı Reçel", category: "sarkuteri", unit: "340g", price: 38.00, emoji: "🍓", description: "Mevsim meyvelerinden doğal reçel" },
  { id: "tereyagi-1", name: "Köy Tereyağı", category: "sarkuteri", unit: "250g", price: 55.00, emoji: "🧈", description: "Yayık tereyağı, doğal tuzlu" },
  { id: "bal-1", name: "Çiçek Balı", category: "sarkuteri", unit: "500g", price: 89.00, emoji: "🍯", description: "Doğal çiçek balı" },
  { id: "zeytinyagi-1", name: "Soğuk Sıkım Zeytinyağı", category: "sarkuteri", unit: "500ml", price: 79.00, emoji: "🫒", description: "Erken hasat naturel sızma" },
  { id: "domates-1", name: "Mevsim Domates", category: "mevsimlik", unit: "1kg", price: 18.90, emoji: "🍅", description: "Sera değil, toprak domatesi" },
  { id: "biber-1", name: "Çarliston Biber", category: "mevsimlik", unit: "500g", price: 12.90, emoji: "🫑", description: "Taze çarliston biber" },
  { id: "salatalik-1", name: "Taze Salatalık", category: "mevsimlik", unit: "1kg", price: 14.90, emoji: "🥒", description: "Kırık salatalık" },
  { id: "marul-1", name: "Kıvırcık Marul", category: "mevsimlik", unit: "1 Adet", price: 8.90, emoji: "🥬", description: "Taze koparma marul" },
  { id: "portakal-1", name: "Taze Portakal", category: "mevsimlik", unit: "1kg", price: 24.90, emoji: "🍊", description: "Mevsim portakalı" },
  { id: "elma-1", name: "Amasya Elması", category: "mevsimlik", unit: "1kg", price: 22.90, emoji: "🍎", description: "Kırmızı Amasya elması" },
];

// ==================== PRESET BOXES ====================
export interface PresetBox {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  items: BoxItem[];
  basePrice: number;
  color: string;
  popular?: boolean;
}

export const PRESET_BOXES: PresetBox[] = [
  { id: "kucuk", name: "Küçük Paket", subtitle: "Tek Hür / Bireysel", icon: "🧑", color: "from-emerald-50 to-green-100", items: [
    { product: BOX_PRODUCTS[0], quantity: 1, selectedOption: BOX_PRODUCTS[0].options![0] },
    { product: BOX_PRODUCTS[1], quantity: 1, selectedOption: BOX_PRODUCTS[1].options![1] },
  ], basePrice: 69.90 },
  { id: "orta", name: "Orta Paket", subtitle: "Çekirdek Aile", icon: "👨‍👩‍👧", color: "from-amber-50 to-orange-100", items: [
    { product: BOX_PRODUCTS[0], quantity: 1, selectedOption: BOX_PRODUCTS[0].options![1] },
    { product: BOX_PRODUCTS[1], quantity: 1, selectedOption: BOX_PRODUCTS[1].options![1] },
  ], basePrice: 119.90, popular: true },
  { id: "buyuk", name: "Büyük Aile Paketi", subtitle: "Kalabalık Aileler İçin", icon: "👨‍👩‍👧‍👦", color: "from-rose-50 to-pink-100", items: [
    { product: BOX_PRODUCTS[0], quantity: 1, selectedOption: BOX_PRODUCTS[0].options![2] },
    { product: BOX_PRODUCTS[1], quantity: 1, selectedOption: BOX_PRODUCTS[1].options![2] },
  ], basePrice: 189.90 },
];

// ==================== CART ITEM ====================
export interface CartItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  qty: number;
  producer?: string;
}

// ==================== CATEGORIES ====================
export const CATEGORIES = [
  { id: "all", name: "Tümü", icon: "fa-solid fa-grid-2" },
  { id: "sebze-meyve", name: "Sebze, Meyve", icon: "fa-solid fa-apple-whole" },
  { id: "kadin-kooperatifleri", name: "Kadın Kooperatifleri", icon: "fa-solid fa-people-group" },
  { id: "et-tavuk", name: "Et, Tavuk", icon: "fa-solid fa-drumstick-bite" },
  { id: "balik", name: "Balık, Deniz Ürünleri", icon: "fa-solid fa-fish" },
  { id: "peynir-sut", name: "Peynir, Süt Ürünleri", icon: "fa-solid fa-cheese" },
  { id: "temel-gida", name: "Temel Gıda", icon: "fa-solid fa-wheat-awn" },
  { id: "kahvaltilik", name: "Kahvaltılık", icon: "fa-solid fa-mug-hot" },
  { id: "atistirmalik", name: "Atıştırmalık", icon: "fa-solid fa-cookie" },
  { id: "hazir-yemek", name: "Hazır Yemek", icon: "fa-solid fa-bowl-food" },
  { id: "firin-pastane", name: "Fırın, Pastane", icon: "fa-solid fa-bread-slice" },
  { id: "icecek", name: "İçecek", icon: "fa-solid fa-bottle-water" },
  { id: "bebek-cocuk", name: "Bebek, Çocuk", icon: "fa-solid fa-baby" },
  { id: "ozel-beslenme", name: "Özel Beslenme", icon: "fa-solid fa-heart-pulse" },
  { id: "dondurma", name: "Dondurma", icon: "fa-solid fa-ice-cream" },
  { id: "ev-yasam", name: "Ev, Yaşam", icon: "fa-solid fa-house" },
  { id: "kisisel-bakim", name: "Kişisel Bakım, Kozmetik", icon: "fa-solid fa-spa" },
  { id: "temizlik", name: "Deterjan, Temizlik", icon: "fa-solid fa-spray-can-sparkles" },
  { id: "bitki-cicek", name: "Canlı Bitki, Çiçek", icon: "fa-solid fa-seedling" },
  { id: "patili", name: "Patili Dostlarımıza", icon: "fa-solid fa-paw" },
  { id: "giyim", name: "Giyim", icon: "fa-solid fa-shirt" },
];

// ==================== DELIVERY DAYS ====================
export const DELIVERY_DAYS = [
  { day: "Pazartesi", region: "İstanbul Avrupa", areas: "Kadıköy, Beşiktaş, Şişli" },
  { day: "Salı", region: "İstanbul Anadolu", areas: "Üsküdar, Ataşehir, Beykoz" },
  { day: "Çarşamba", region: "Ankara", areas: "Çankaya, Keçiören, Yenimahalle" },
  { day: "Perşembe", region: "İzmir", areas: "Konak, Bornova, Karşıyaka" },
  { day: "Cuma", region: "Bursa & Eskişehir", areas: "Nilüfer, Odunpazarı" },
  { day: "Cumartesi", region: "Antalya & Muğla", areas: "Konyaaltı, Bodrum, Fethiye" },
];
