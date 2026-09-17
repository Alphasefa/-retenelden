"use client";

import { useState } from "react";
import { Leaf, Menu, X, ShoppingCart, User, Search, MapPin, Heart, HelpCircle, Store, Truck } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, data?: any) => void;
  cartCount: number;
  onCartClick: () => void;
}

const CATEGORIES = [
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

export default function Navbar({ currentPage, onNavigate, cartCount, onCartClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onNavigate("search", { query: searchQuery.trim() });
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-10">
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-1.5 text-gray-500 hover:text-[#80A541] transition-colors">
              <Store className="w-3.5 h-3.5" />
              <span>Mağazalar</span>
            </a>
            <a href="#" className="flex items-center gap-1.5 text-gray-500 hover:text-[#80A541] transition-colors">
              <Truck className="w-3.5 h-3.5" />
              <span>Teslimat Bölgeleri</span>
            </a>
            <a href="#" className="flex items-center gap-1.5 text-gray-500 hover:text-[#80A541] transition-colors">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Yardım</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-gray-400 hover:text-[#80A541] transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#80A541] transition-colors">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#80A541] transition-colors">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4">
            {/* Mobile Menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <button onClick={() => onNavigate("home")} className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 bg-[#80A541] rounded-full flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-[#5a7a2e] block leading-tight">Üreten Elden</span>
              </div>
            </button>

            {/* Search */}
            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün, marka veya kategori ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border-2 border-[#80A541] rounded-lg text-sm focus:outline-none focus:border-[#5a7a2e] transition-all"
                />
                <button onClick={handleSearch} className="absolute right-0 top-0 h-full px-4 bg-[#80A541] hover:bg-[#5a7a2e] text-white rounded-r-lg transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 mx-4">
              <button onClick={() => onNavigate("home")} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === "home" ? "bg-[#f0f7eb] text-[#5a7a2e]" : "text-gray-600 hover:bg-gray-50 hover:text-[#80A541]"}`}>
                Ana Sayfa
              </button>
              <button onClick={() => onNavigate("subscriptions")} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === "subscriptions" ? "bg-[#f0f7eb] text-[#5a7a2e]" : "text-gray-600 hover:bg-gray-50 hover:text-[#80A541]"}`}>
                Abonelikler
              </button>
              <button onClick={() => onNavigate("box-builder")} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === "box-builder" ? "bg-[#f0f7eb] text-[#5a7a2e]" : "text-gray-600 hover:bg-gray-50 hover:text-[#80A541]"}`}>
                Kutu Oluştur
              </button>
              <button onClick={() => onNavigate("producers")} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === "producers" ? "bg-[#f0f7eb] text-[#5a7a2e]" : "text-gray-600 hover:bg-gray-50 hover:text-[#80A541]"}`}>
                Üreticiler
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Delivery Address - Desktop */}
              <button className="hidden lg:flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:border-[#80A541] transition-colors">
                <MapPin className="w-5 h-5 text-[#80A541]" />
                <div className="text-left">
                  <div className="text-[10px] font-semibold text-gray-400 uppercase">Teslimat Adresi</div>
                  <div className="text-xs font-semibold text-gray-700">Seçmek için tıklayın</div>
                </div>
              </button>

              {/* User - Desktop with dropdown */}
              <div className="hidden lg:block relative group">
                <button className="flex flex-col items-center gap-0.5 px-2 py-1 text-gray-600 hover:text-[#80A541] transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Hesabım</span>
                </button>
                <div className="absolute right-0 top-full pt-1 hidden group-hover:block z-50">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-48">
                    <button onClick={() => onNavigate("my-orders")} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0f7eb] hover:text-[#5a7a2e] transition-colors">
                      📋 Siparişlerim
                    </button>
                    <button onClick={() => onNavigate("my-subscriptions")} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0f7eb] hover:text-[#5a7a2e] transition-colors">
                      🔄 Aboneliklerim
                    </button>
                    <button onClick={() => onNavigate("producer-dashboard")} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f0f7eb] hover:text-[#5a7a2e] transition-colors">
                      🏪 Üretici Paneli
                    </button>
                  </div>
                </div>
              </div>

              {/* Favorites - Desktop */}
              <button onClick={() => onNavigate("favorites")} className="hidden lg:flex flex-col items-center gap-0.5 px-2 py-1 text-gray-600 hover:text-[#80A541] transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-[10px] font-medium">Favorilerim</span>
              </button>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative flex items-center gap-2 bg-[#80A541] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#5a7a2e] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Sepetim</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#80A541] rounded-full flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-[#5a7a2e]">Üreten Elden</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-1">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <User className="w-10 h-10 text-gray-300" />
                <div>
                  <p className="text-sm font-semibold">Giriş Yap veya Üye Ol</p>
                  <a href="#" className="text-xs text-[#80A541] font-medium">Hesabınıza erişin</a>
                </div>
              </div>
            </div>

            <div className="p-3">
              {[
                { icon: <MapPin className="w-4 h-4" />, label: "Teslimat Adresi" },
                { icon: <Heart className="w-4 h-4" />, label: "Favorilerim" },
                { icon: <ShoppingCart className="w-4 h-4" />, label: "Alışveriş Listem" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-400">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="border-t border-gray-100 p-3">
              <div className="text-xs font-semibold text-gray-400 px-3 mb-2">Kategoriler</div>
              {CATEGORIES.slice(1).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setMobileOpen(false);
                    onNavigate("home");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <i className={`${cat.icon} text-gray-400 w-4`}></i>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
