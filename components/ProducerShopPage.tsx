"use client";

import { PRODUCERS, PRODUCTS, BoxItem } from "@/lib/data";
import { Star, MapPin, ArrowLeft } from "lucide-react";

interface ProducerShopPageProps {
  producerId: number;
  onNavigate: (page: string) => void;
  onAddToCart: (item: BoxItem) => void;
}

export default function ProducerShopPage({ producerId, onNavigate, onAddToCart }: ProducerShopPageProps) {
  const producer = PRODUCERS.find((p) => p.id === producerId);
  const producerProducts = PRODUCTS.filter((p) => p.producerId === producerId);

  if (!producer) return <div className="text-center py-20 text-gray-400">Üretici bulunamadı</div>;

  return (
    <div>
      <button onClick={() => onNavigate("producers")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-farm-600 mb-5 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Üreticilere Dön
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
        <div className="h-28 flex items-center justify-center text-white text-5xl" style={{ background: producer.color }}>🚜</div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold font-heading text-gray-900">{producer.name}</h1>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-bold">{producer.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-2"><MapPin className="w-3.5 h-3.5" /> {producer.location}</div>
          <p className="text-gray-600 text-sm mb-3">{producer.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {producer.tags.map((t) => (
              <span key={t} className="text-xs bg-farm-50 text-farm-700 px-2.5 py-1 rounded-full font-semibold">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">Ürünler ({producerProducts.length})</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {producerProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-farm-200 transition-all group">
            <div className="h-28 bg-farm-50 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform relative">
              {product.icon}
              {product.badge && (
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${product.badgeClass === "organic" ? "bg-farm-500 text-white" : "bg-red-500 text-white"}`}>
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-3">
              <div className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 min-h-[36px]">{product.name}</div>
              <div className="text-xs text-gray-400 mb-2">{product.weight}</div>
              <div className="flex items-center justify-between">
                <div className="font-bold text-farm-700">₺{product.price.toFixed(2)}</div>
                <button
                  onClick={() => onAddToCart({ product: { id: String(product.id), name: product.name, category: product.category as any, unit: product.weight, price: product.price, emoji: product.icon }, quantity: 1 })}
                  className="w-8 h-8 rounded-full bg-farm-500 text-white flex items-center justify-center text-sm hover:bg-farm-600 active:scale-90 transition-all"
                >+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
