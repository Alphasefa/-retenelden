"use client";

import { BoxItem } from "@/lib/data";
import { Minus, Plus, Trash2, ShoppingCart, Percent, Truck } from "lucide-react";

interface BoxSummaryProps {
  items: BoxItem[];
  subtotal: number;
  discount: number;
  discountAmount: number;
  total: number;
  frequency: "haftalik" | "iki-haftalik";
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddAllToCart: () => void;
}

export default function BoxSummary({ items, subtotal, discount, discountAmount, total, frequency, onUpdateQuantity, onRemoveItem, onAddAllToCart }: BoxSummaryProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-farm-600" /> Kutum
      </h3>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📦</div>
          <p className="text-gray-400 text-sm">Henüz ürün eklemediniz</p>
        </div>
      ) : (
        <>
          <div className="space-y-2 mb-4 max-h-[250px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2.5">
                <span className="text-xl">{item.product.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-gray-800 truncate">{item.product.name}</div>
                  <div className="text-[10px] text-gray-500">{item.selectedOption?.label || item.product.unit}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                    <Minus className="w-2.5 h-2.5" />
                  </button>
                  <span className="w-4 text-center text-xs font-bold">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-farm-600 transition-colors">
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
                <div className="text-xs font-bold text-farm-700 w-14 text-right">₺{(item.product.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => onRemoveItem(item.product.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 space-y-1.5">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Ara Toplam</span><span>₺{subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600 bg-green-50 rounded-lg px-3 py-1.5">
                <span className="flex items-center gap-1"><Percent className="w-3 h-3" /> Abonelik (%{(discount * 100).toFixed(0)})</span>
                <span>-₺{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-farm-500" /> Teslimat</span>
              <span className="text-farm-600 font-semibold">Ücretsiz</span>
            </div>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900">Toplam</span>
                <span className="text-xl font-bold text-farm-700">₺{total.toFixed(2)}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">
                {frequency === "haftalik" ? "Her hafta" : "2 haftada bir"} • Ücretsiz teslimat
              </div>
            </div>
            <button onClick={onAddAllToCart} className="w-full mt-3 bg-farm-500 text-white py-3 rounded-xl font-bold text-sm hover:bg-farm-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Sepete Ekle
            </button>
          </div>
        </>
      )}
    </div>
  );
}
