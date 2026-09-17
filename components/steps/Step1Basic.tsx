"use client";

import { BOX_PRODUCTS, BoxItem } from "@/lib/data";
import { Minus, Plus, Check } from "lucide-react";

interface StepProps {
  getItemQty: (id: string) => number;
  onAdd: (item: BoxItem) => void;
  onRemove: (id: string) => void;
}

export default function Step1Basic({ getItemQty, onAdd, onRemove }: StepProps) {
  const basicProducts = BOX_PRODUCTS.filter((p) => p.category === "sut" || p.category === "yumurta");

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Temel Gıda & Gramaj Seçimi</h3>
        <p className="text-sm text-gray-500">Süt ve yumurta miktarını belirle</p>
      </div>

      <div className="space-y-6">
        {basicProducts.map((product) => {
          const qty = getItemQty(product.id);

          return (
            <div key={product.id} className="bg-gray-50 rounded-2xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{product.emoji}</span>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-sm font-semibold text-farm-600 mt-1">
                    ₺{product.price.toFixed(2)} / {product.unit}
                  </p>
                </div>
              </div>

              {/* Size Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.options?.map((opt) => {
                  const isSelected = qty > 0 && opt.value <= qty * (product.id === "sut-1" ? 1 : 1);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => {
                        if (qty === 0) {
                          onAdd({ product, quantity: 1, selectedOption: opt });
                        } else {
                          onRemove(product.id);
                          onAdd({ product, quantity: 1, selectedOption: opt });
                        }
                      }}
                      className={`relative rounded-xl p-3 border-2 transition-all text-center ${
                        qty > 0
                          ? "border-farm-400 bg-farm-50 shadow-sm"
                          : "border-gray-200 bg-white hover:border-farm-200"
                      }`}
                    >
                      {qty > 0 && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-farm-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="text-2xl mb-1">{product.emoji}</div>
                      <div className="text-sm font-bold text-gray-800">{opt.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        ₺{(product.price * opt.value + opt.priceModifier).toFixed(2)}
                      </div>
                      {opt.priceModifier < 0 && (
                        <div className="text-xs text-green-600 font-semibold mt-0.5">
                          {opt.priceModifier}₺ Tasarruf
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quantity Control */}
              {qty > 0 && (
                <div className="mt-4 flex items-center justify-between bg-white rounded-xl p-3 border border-gray-100">
                  <span className="text-sm text-gray-600">
                    Seçilen: <strong>{basicProducts.find(p => p.id === product.id)?.options?.find(o => qty > 0)?.label || `${qty} ${product.unit}`}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onRemove(product.id)}
                      className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-gray-900 w-6 text-center">{qty}</span>
                    <button
                      onClick={() => onAdd({ product, quantity: 1 })}
                      className="w-8 h-8 rounded-lg bg-farm-50 text-farm-600 flex items-center justify-center hover:bg-farm-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
