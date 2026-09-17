"use client";

import { BOX_PRODUCTS, BoxItem } from "@/lib/data";
import { Minus, Plus } from "lucide-react";

interface StepProps {
  getItemQty: (id: string) => number;
  onAdd: (item: BoxItem) => void;
  onRemove: (id: string) => void;
}

export default function Step2Deli({ getItemQty, onAdd, onRemove }: StepProps) {
  const deliProducts = BOX_PRODUCTS.filter((p) => p.category === "sarkuteri");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Şarküteri & Kahvaltılık</h3>
        <p className="text-sm text-gray-500">Köy peyniri, ev yapımı reçel, tereyağı ve daha fazlası</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {deliProducts.map((product) => {
          const qty = getItemQty(product.id);

          return (
            <div
              key={product.id}
              className={`rounded-2xl border-2 p-5 transition-all ${
                qty > 0
                  ? "border-farm-400 bg-farm-50/50 shadow-sm"
                  : "border-gray-100 bg-white hover:border-farm-200"
              }`}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900">{product.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{product.description}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-sm font-semibold text-farm-600">
                      ₺{product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400">/ {product.unit}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center justify-between">
                {qty === 0 ? (
                  <button
                    onClick={() => onAdd({ product, quantity: 1 })}
                    className="w-full py-2.5 rounded-xl border-2 border-dashed border-farm-300 text-farm-600 text-sm font-semibold hover:bg-farm-50 hover:border-farm-400 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Ekle
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between bg-white rounded-xl p-2 border border-gray-100">
                    <button
                      onClick={() => onRemove(product.id)}
                      className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-gray-900 text-lg">{qty}</span>
                    <button
                      onClick={() => onAdd({ product, quantity: 1 })}
                      className="w-9 h-9 rounded-lg bg-farm-50 text-farm-600 flex items-center justify-center hover:bg-farm-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
