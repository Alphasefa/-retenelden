"use client";

import { useState, useEffect } from "react";
import { PRODUCTS, PRODUCERS, BoxItem } from "@/lib/data";
import { ArrowRight } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
  onAddToCart: (item: BoxItem) => void;
  activeCategory?: string;
}

const HERO_SLIDES = [
  {
    badge: "YENİ",
    title: "Taze Ürünler\nKapınıza Gelsin",
    desc: "Çiftlikten taze sebze ve meyveler",
    btn: "Hemen Alışverişe Başla",
    gradient: "from-[#2d6a1e] via-[#4a8c3f] to-[#6aaa5a]",
    icon: "fa-solid fa-carrot",
  },
  {
    badge: "KAMPANYA",
    title: "İndirimli\nÜrünler",
    desc: "Haftanın en iyi fırsatlarını kaçırmayın",
    btn: "Kampanyaları Keşfet",
    gradient: "from-[#1a5276] via-[#2980b9] to-[#5dade2]",
    icon: "fa-solid fa-percent",
  },
  {
    badge: "ÖZEL",
    title: "Organik\nÜrünler",
    desc: "Doğal ve organik ürün seçenekleri",
    btn: "Organik Keşfet",
    gradient: "from-[#7d3c98] via-[#a569bd] to-[#d2b4de]",
    icon: "fa-solid fa-leaf",
  },
];

export default function HomePage({ onNavigate, onAddToCart, activeCategory = "all" }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const filteredProducts = activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);
  const popularProducts = filteredProducts.slice(0, 8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Hero Slider */}
      <section className="relative rounded-2xl overflow-hidden">
        <div className="relative">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${slide.gradient} text-white rounded-2xl transition-all duration-500 ${
                idx === currentSlide ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center px-8 py-12 sm:px-12 sm:py-16">
                <div className="flex-1">
                  <span className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    {slide.badge}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-white/80 text-sm mb-5">{slide.desc}</p>
                  <button className="bg-white text-gray-800 px-5 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg transition-shadow">
                    {slide.btn}
                  </button>
                </div>
                <div className="hidden sm:flex w-32 h-32 lg:w-40 lg:h-40 bg-white/15 rounded-full items-center justify-center flex-shrink-0">
                  <i className={`${slide.icon} text-5xl lg:text-6xl`}></i>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? "w-8 bg-[#80A541]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Campaign Banners */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "%25'e Varan İndirim", title: "Kahvaltılık Ürünler", gradient: "from-[#f39c12] to-[#e67e22]", icon: "fa-solid fa-egg" },
          { label: "Taze Teslimat", title: "Sebze & Meyve", gradient: "from-[#27ae60] to-[#2ecc71]", icon: "fa-solid fa-apple-whole" },
          { label: "Kampanya", title: "Et & Tavuk", gradient: "from-[#e74c3c] to-[#c0392b]", icon: "fa-solid fa-drumstick-bite" },
        ].map((banner, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${banner.gradient} rounded-2xl p-5 text-white cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all`}
          >
            <div className="text-xs font-semibold opacity-90 uppercase">{banner.label}</div>
            <h3 className="text-lg font-bold mt-1 mb-2">{banner.title}</h3>
            <a href="#" className="text-xs font-semibold flex items-center gap-1 opacity-90 hover:opacity-100">
              Hemen Al <ArrowRight className="w-3 h-3" />
            </a>
            <i className={`${banner.icon} text-4xl absolute right-4 bottom-4 opacity-20`}></i>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: "fa-solid fa-truck-fast", title: "Hızlı Teslimat", desc: "Aynı gün kapınıza kadar" },
          { icon: "fa-solid fa-shield-halved", title: "Güvenli Alışveriş", desc: "256-bit SSL ile güvenli" },
          { icon: "fa-solid fa-rotate-left", title: "Kolay İade", desc: "14 gün içinde ücretsiz" },
          { icon: "fa-solid fa-headset", title: "7/24 Destek", desc: "Her zaman yanınızda" },
        ].map((f, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 text-center hover:shadow-md transition-shadow">
            <i className={`${f.icon} text-2xl text-[#80A541] mb-2`}></i>
            <div className="font-bold text-sm text-gray-800">{f.title}</div>
            <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
          </div>
        ))}
      </section>

      {/* Popular Products */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Çok Satanlar</h2>
          <button className="text-[#80A541] text-sm font-semibold flex items-center gap-1 hover:underline">
            Tümünü Gör <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularProducts.map((product) => {
            const producer = PRODUCERS.find((p) => p.id === product.producerId);
            return (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-[#80A541] transition-all group cursor-pointer" onClick={() => onNavigate("product-detail", { productId: product.id })}>
                <div className="h-32 bg-gray-50 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform relative">
                  {product.icon}
                  {product.badge && (
                    <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      product.badgeClass === "organic" ? "bg-[#80A541] text-white" : "bg-red-500 text-white"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-[10px] text-[#80A541] font-semibold mb-1">
                    {producer?.name}
                  </div>
                  <div className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 min-h-[36px]">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-400 mb-2">{product.weight}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#5a7a2e]">₺{product.price.toFixed(2)}</div>
                    <button
                      onClick={() => onAddToCart({ product: { id: String(product.id), name: product.name, category: product.category as any, unit: product.weight, price: product.price, emoji: product.icon }, quantity: 1 })}
                      className="w-8 h-8 rounded-full bg-[#80A541] text-white flex items-center justify-center text-sm hover:bg-[#5a7a2e] active:scale-90 transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
