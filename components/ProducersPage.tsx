"use client";

import { PRODUCERS } from "@/lib/data";
import { Star, MapPin, Package } from "lucide-react";

interface ProducersPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function ProducersPage({ onNavigate }: ProducersPageProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-gray-900 mb-2">🚜 Üreticilerimiz</h1>
        <p className="text-gray-500">Sizlere hizmet veren çiftliklerimiz ve üreticilerimiz</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PRODUCERS.map((producer) => (
          <button
            key={producer.id}
            onClick={() => onNavigate("producer-shop", { producerId: producer.id })}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-farm-200 transition-all text-left group"
          >
            <div className="h-20 flex items-center justify-center text-white text-4xl" style={{ background: producer.color }}>
              🚜
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900 group-hover:text-farm-700 transition-colors">{producer.name}</h3>
                <div className="flex items-center gap-1 text-sm flex-shrink-0">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{producer.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                <MapPin className="w-3.5 h-3.5" /> {producer.location}
              </div>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{producer.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {producer.tags.map((t) => (
                    <span key={t} className="text-xs bg-farm-50 text-farm-700 px-2 py-0.5 rounded-full font-medium">{t}</span>
                  ))}
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Package className="w-3 h-3" /> {producer.productCount} ürün
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
