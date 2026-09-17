"use client";

import { PRODUCTS, PRODUCERS, BoxItem } from "@/lib/data";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

interface FavoritesPageProps {
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onNavigate: (page: string, data?: any) => void;
  onAddToCart: (item: BoxItem) => void;
}

export default function FavoritesPage({ favorites, onToggleFavorite, onNavigate, onAddToCart }: FavoritesPageProps) {
  const favoriteProducts = PRODUCTS.filter((p) => favorites.includes(p.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">❤️ Favorilerim</h1>

      {favoriteProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Henüz favori eklemediniz</p>
          <p className="text-sm text-gray-400 mt-1">Ürünlerin kalp simgesine tıklayarak favorilere ekleyin</p>
          <button onClick={() => onNavigate("home")} className="mt-4 text-[#80A541] font-semibold hover:underline">
            Alışverişe Başla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favoriteProducts.map((product) => {
            const producer = PRODUCERS.find((p) => p.id === product.producerId);
            return (
              <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                <div className="h-32 bg-gray-50 flex items-center justify-center text-5xl relative cursor-pointer" onClick={() => onNavigate("product-detail", { productId: product.id })}>
                  {product.icon}
                  <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }} className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors">
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </button>
                </div>
                <div className="p-3">
                  <div className="text-[10px] text-[#80A541] font-semibold mb-1">{producer?.name}</div>
                  <div className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">{product.name}</div>
                  <div className="text-xs text-gray-400 mb-2">{product.weight}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-[#5a7a2e]">₺{product.price.toFixed(2)}</div>
                    <button
                      onClick={() => onAddToCart({ product: { id: String(product.id), name: product.name, category: product.category as any, unit: product.weight, price: product.price, emoji: product.icon }, quantity: 1 })}
                      className="w-8 h-8 rounded-full bg-[#80A541] text-white flex items-center justify-center text-sm hover:bg-[#5a7a2e] active:scale-90 transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
