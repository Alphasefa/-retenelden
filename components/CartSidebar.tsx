"use client";

import { CartItem } from "@/lib/data";
import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

interface CartSidebarProps {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartSidebar({ items, total, isOpen, onClose, onUpdateQty, onRemove, onCheckout }: CartSidebarProps) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-50" onClick={onClose} />}
      <div className={`fixed top-0 right-0 h-full w-[380px] max-w-[90vw] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-farm-600" /> Sepetim ({items.length})
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">🛒</div>
              <p className="text-gray-400 text-sm">Sepetiniz boş</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">{item.name}</div>
                    <div className="text-xs text-gray-500">₺{item.price.toFixed(2)} / {item.unit}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-sm font-bold">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-farm-300 hover:text-farm-600 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-sm font-bold text-farm-700 w-16 text-right">₺{(item.price * item.qty).toFixed(2)}</div>
                  <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Ara Toplam</span><span>₺{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-farm-600 mb-2">
              <span>Teslimat</span><span className="font-semibold">Ücretsiz</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-2 mb-3">
              <span>Toplam</span><span className="text-farm-700">₺{total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} className="w-full bg-farm-500 text-white py-3 rounded-xl font-bold hover:bg-farm-600 active:scale-[0.98] transition-all">
              Siparişi Tamamla
            </button>
          </div>
        )}
      </div>
    </>
  );
}
