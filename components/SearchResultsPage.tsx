"use client";

import { useState, useMemo } from "react";
import { PRODUCTS, PRODUCERS, BoxItem } from "@/lib/data";
import { Search, SlidersHorizontal, X, ArrowUpDown, Star } from "lucide-react";

interface SearchResultsPageProps {
  query: string;
  onNavigate: (page: string, data?: any) => void;
  onAddToCart: (item: BoxItem) => void;
  onClose: () => void;
}

export default function SearchResultsPage({ query, onNavigate, onAddToCart, onClose }: SearchResultsPageProps) {
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc" | "rating">("name");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  const results = useMemo(() => {
    let items = PRODUCTS.filter((p) => {
      const matchesQuery = query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = filterCategory === "all" || p.category === filterCategory;
      const matchesOrganic = !filterOrganic || p.organic;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesQuery && matchesCategory && matchesOrganic && matchesPrice;
    });

    items.sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.producerId - a.producerId;
        default: return a.name.localeCompare(b.name, "tr");
      }
    });

    return items;
  }, [query, filterCategory, filterOrganic, priceRange, sortBy]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {query ? `"${query}" için sonuçlar` : "Tüm Ürünler"}
          </h1>
          <p className="text-sm text-gray-500">{results.length} ürün bulundu</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filters Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-4">
            <div className="flex items-center gap-2 font-semibold text-sm text-gray-800">
              <SlidersHorizontal className="w-4 h-4" /> Filtreler
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Kategori</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#80A541]"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Maks. Fiyat: ₺{priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="200"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-[#80A541]"
              />
            </div>

            {/* Organic */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filterOrganic}
                onChange={(e) => setFilterOrganic(e.target.checked)}
                className="w-4 h-4 accent-[#80A541] rounded"
              />
              <span className="text-sm text-gray-700">🌿 Sadece Organik</span>
            </label>

            {/* Sort */}
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Sırala</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#80A541]"
              >
                <option value="name">İsim (A-Z)</option>
                <option value="price-asc">Fiyat (Düşükten)</option>
                <option value="price-desc">fıyat (Yüksekten)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          {results.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">🔍</div>
              <p className="text-gray-500 font-medium">Sonuç bulunamadı</p>
              <p className="text-sm text-gray-400 mt-1">Farklı arama terimleri veya filtreler deneyin</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((product) => {
                const producer = PRODUCERS.find((p) => p.id === product.producerId);
                return (
                  <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-[#80A541] transition-all group cursor-pointer" onClick={() => { onClose(); onNavigate("product-detail", { productId: product.id }); }}>
                    <div className="h-28 bg-gray-50 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform relative">
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
                      <div className="text-[10px] text-[#80A541] font-semibold mb-1">{producer?.name}</div>
                      <div className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">{product.name}</div>
                      <div className="text-xs text-gray-400 mb-2">{product.weight}</div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-[#5a7a2e]">₺{product.price.toFixed(2)}</div>
                        <button
                          onClick={(e) => { e.stopPropagation(); onAddToCart({ product: { id: String(product.id), name: product.name, category: product.category as any, unit: product.weight, price: product.price, emoji: product.icon }, quantity: 1 }); }}
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
          )}
        </div>
      </div>
    </div>
  );
}
