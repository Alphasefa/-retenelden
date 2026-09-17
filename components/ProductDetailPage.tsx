"use client";

import { useState } from "react";
import { PRODUCTS, PRODUCERS, BoxItem } from "@/lib/data";
import { ArrowLeft, Star, Truck, Shield, RotateCcw, Minus, Plus, ShoppingCart, Heart } from "lucide-react";

interface ProductDetailPageProps {
  productId: number;
  onNavigate: (page: string, data?: any) => void;
  onAddToCart: (item: BoxItem) => void;
}

export default function ProductDetailPage({ productId, onNavigate, onAddToCart }: ProductDetailPageProps) {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const product = PRODUCTS.find((p) => p.id === productId);
  const producer = product ? PRODUCERS.find((p) => p.id === product.producerId) : null;
  const relatedProducts = PRODUCTS.filter((p) => p.id !== productId && p.category === product?.category).slice(0, 4);

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Ürün bulunamadı.</p>
        <button onClick={() => onNavigate("home")} className="mt-4 text-[#80A541] font-semibold hover:underline">
          Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button onClick={() => onNavigate("home")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#80A541] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Alışverişe Dön
      </button>

      {/* Main Product */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-12">
            <div className="text-[120px]">{product.icon}</div>
          </div>

          {/* Info */}
          <div className="md:w-1/2 p-6 md:p-8">
            {product.badge && (
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${
                product.badgeClass === "organic" ? "bg-[#80A541] text-white" : "bg-red-500 text-white"
              }`}>
                {product.badge}
              </span>
            )}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-1">{product.weight}</p>
            {product.organic && (
              <span className="inline-flex items-center gap-1 text-xs text-[#80A541] font-semibold mb-3">
                🌿 Organik Ürün
              </span>
            )}

            {/* Producer */}
            {producer && (
              <button onClick={() => onNavigate("producer-shop", { producerId: producer.id })} className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm" style={{ background: producer.color }}>
                  🚜
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-800">{producer.name}</div>
                  <div className="text-xs text-gray-500">📍 {producer.location}</div>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold">{producer.rating}</span>
                </div>
              </button>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-[#5a7a2e]">₺{product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-400">/ {product.weight}</span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-l-xl">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors rounded-r-xl">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 flex gap-2">
                <button
                  onClick={() => {
                    for (let i = 0; i < qty; i++) {
                      onAddToCart({
                        product: { id: String(product.id), name: product.name, category: product.category as any, unit: product.weight, price: product.price, emoji: product.icon },
                        quantity: 1,
                      });
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#80A541] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#5a7a2e] active:scale-[0.98] transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Sepete Ekle
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-all ${
                    liked ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4">
              <span className="text-sm text-gray-500">Toplam ({qty} adet)</span>
              <span className="text-lg font-bold text-[#5a7a2e]">₺{(product.price * qty).toFixed(2)}</span>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: <Truck className="w-4 h-4" />, text: "Hızlı Teslimat" },
                { icon: <Shield className="w-4 h-4" />, text: "Taze Garantisi" },
                { icon: <RotateCcw className="w-4 h-4" />, text: "Kolay İade" },
              ].map((f, i) => (
                <div key={i} className="flex flex-col items-center gap-1 p-2 text-center">
                  <span className="text-[#80A541]">{f.icon}</span>
                  <span className="text-[10px] text-gray-500">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Benzer Ürünler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate("product-detail", { productId: p.id })}
                className="bg-white rounded-2xl border border-gray-100 p-4 text-left hover:shadow-md hover:border-[#80A541] transition-all"
              >
                <div className="h-20 flex items-center justify-center text-4xl mb-2">{p.icon}</div>
                <div className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">{p.name}</div>
                <div className="text-xs text-gray-400 mb-2">{p.weight}</div>
                <div className="font-bold text-[#5a7a2e]">₺{p.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
