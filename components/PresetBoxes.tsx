"use client";

import { useState } from "react";
import { PRESET_BOXES, BOX_PRODUCTS, BoxItem } from "@/lib/data";
import { Check, Plus, Star, ChevronDown, ChevronUp, ShoppingCart } from "lucide-react";

interface PresetBoxesProps {
  onAddToBox: (item: BoxItem) => void;
}

export default function PresetBoxes({ onAddToBox }: PresetBoxesProps) {
  const [expandedBox, setExpandedBox] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const extraProducts = BOX_PRODUCTS.filter(
    (p) => p.category === "sarkuteri" || p.category === "mevsimlik"
  );

  const handleAddPreset = (box: typeof PRESET_BOXES[0]) => {
    box.items.forEach((item) => {
      onAddToBox({ ...item });
    });
    setAddedItems((prev) => new Set(prev).add(box.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(box.id);
        return next;
      });
    }, 1500);
  };

  const handleAddExtra = (product: typeof BOX_PRODUCTS[0]) => {
    onAddToBox({ product, quantity: 1 });
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-heading text-farm-800 mb-1">
          Hazır Şablon Paketler
        </h2>
        <p className="text-gray-500 text-sm">
          İhtiyacına uygun paketi seç, dilediğin gibi özelleştir.
        </p>
      </div>

      {/* Preset Cards */}
      <div className="grid gap-5">
        {PRESET_BOXES.map((box) => {
          const isExpanded = expandedBox === box.id;
          const isAdded = addedItems.has(box.id);

          return (
            <div
              key={box.id}
              className={`bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                box.popular
                  ? "border-farm-400 shadow-lg shadow-farm-100"
                  : "border-gray-100 hover:border-farm-200 shadow-sm"
              }`}
            >
              {box.popular && (
                <div className="bg-farm-500 text-white text-xs font-bold px-4 py-1.5 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  EN ÇOK TERCİH EDİLEN
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${box.color} flex items-center justify-center text-3xl flex-shrink-0`}
                  >
                    {box.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{box.name}</h3>
                      <span className="text-xs bg-farm-50 text-farm-700 px-2 py-0.5 rounded-full font-semibold">
                        {box.subtitle}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {box.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-3 py-1.5 text-sm"
                        >
                          <span>{item.product.emoji}</span>
                          <span className="text-gray-700 font-medium">
                            {item.selectedOption?.label || `${item.quantity} ${item.product.unit}`}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-end gap-2">
                      <span className="text-3xl font-bold text-farm-700">
                        ₺{box.basePrice.toFixed(2)}
                      </span>
                      <span className="text-gray-400 text-sm mb-1">/hafta</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleAddPreset(box)}
                      disabled={isAdded}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                        isAdded
                          ? "bg-green-100 text-green-700"
                          : "bg-farm-500 text-white hover:bg-farm-600 active:scale-95"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          Eklendi
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Sepete Ekle
                        </>
                      )}
                    </button>
                    <button
                      onClick={() =>
                        setExpandedBox(isExpanded ? null : box.id)
                      }
                      className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-farm-600 hover:bg-farm-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Özelleştir
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded: Extra Products */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-6">
                  <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-farm-500" />
                    Ekstra Ürün Ekle
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {extraProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleAddExtra(product)}
                        className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 hover:border-farm-300 hover:shadow-sm transition-all text-left group"
                      >
                        <span className="text-2xl">{product.emoji}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-800 truncate group-hover:text-farm-700">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {product.unit} • ₺{product.price.toFixed(2)}
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-gray-300 group-hover:text-farm-500 ml-auto flex-shrink-0" />
                      </button>
                    ))}
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
