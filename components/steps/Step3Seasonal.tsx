"use client";

import { BOX_PRODUCTS, BoxItem } from "@/lib/data";
import { Minus, Plus, Leaf } from "lucide-react";

interface StepProps {
  getItemQty: (id: string) => number;
  onAdd: (item: BoxItem) => void;
  onRemove: (id: string) => void;
}

export default function Step3Seasonal({ getItemQty, onAdd, onRemove }: StepProps) {
  const seasonalProducts = BOX_PRODUCTS.filter((p) => p.category === "mevsimlik");

  const seasonalLabel = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "İlkbahar";
    if (month >= 5 && month <= 7) return "Yaz";
    if (month >= 8 && month <= 10) return "Sonbahar";
    return "Kış";
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-bold text-gray-900">Mevsimlik & Taze Ürünler</h3>
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
            <Leaf className="w-3 h-3" />
            {seasonalLabel()}
          </span>
        </div>
        <p className="text-sm text-gray-500">Bu haftanın mevsim meyve ve sebze seçkisi</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {seasonalProducts.map((product) => {
          const qty = getItemQty(product.id);

          return (
            <div
              key={product.id}
              className={`rounded-2xl border-2 p-4 transition-all ${
                qty > 0
                  ? "border-farm-400 bg-farm-50/50 shadow-sm"
                  : "border-gray-100 bg-white hover:border-farm-200"
              }`}
            >
              <div className="text-center mb-3">
                <span className="text-4xl block mb-2">{product.emoji}</span>
                <h4 className="font-bold text-gray-900 text-sm">{product.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{product.description}</p>
                <div className="mt-2">
                  <span className="text-sm font-bold text-farm-600">₺{product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>
                </div>
              </div>

              {qty === 0 ? (
                <button
                  onClick={() => onAdd({ product, quantity: 1 })}
                  className="w-full py-2 rounded-xl border-2 border-dashed border-farm-300 text-farm-600 text-xs font-semibold hover:bg-farm-50 hover:border-farm-400 transition-all flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Ekle
                </button>
              ) : (
                <div className="flex items-center justify-between bg-white rounded-xl p-1.5 border border-gray-100">
                  <button
                    onClick={() => onRemove(product.id)}
                    className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-gray-900">{qty}</span>
                  <button
                    onClick={() => onAdd({ product, quantity: 1 })}
                    className="w-8 h-8 rounded-lg bg-farm-50 text-farm-600 flex items-center justify-center hover:bg-farm-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
