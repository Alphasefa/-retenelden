"use client";

import { useState } from "react";
import { PRESET_BOXES, BoxItem } from "@/lib/data";
import PresetBoxes from "./PresetBoxes";
import CustomBoxBuilder from "./CustomBoxBuilder";
import BoxSummary from "./BoxSummary";
import { Package, Puzzle } from "lucide-react";

interface BoxBuilderPageProps {
  onAddToCart: (item: BoxItem) => void;
}

export default function BoxBuilderPage({ onAddToCart }: BoxBuilderPageProps) {
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");
  const [boxItems, setBoxItems] = useState<BoxItem[]>([]);
  const [frequency, setFrequency] = useState<"haftalik" | "iki-haftalik">("haftalik");

  const addToBox = (item: BoxItem) => {
    setBoxItems((prev) => {
      const existing = prev.find((i) => i.product.id === item.product.id);
      if (existing) return prev.map((i) => i.product.id === item.product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, item];
    });
  };

  const removeFromBox = (productId: string) => setBoxItems((prev) => prev.filter((i) => i.product.id !== productId));

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) { removeFromBox(productId); return; }
    setBoxItems((prev) => prev.map((i) => i.product.id === productId ? { ...i, quantity: qty } : i));
  };

  const subtotal = boxItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const discount = frequency === "haftalik" ? 0.03 : 0;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const handleAddAllToCart = () => {
    boxItems.forEach((item) => onAddToCart(item));
    setBoxItems([]);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-heading text-gray-900 mb-2">🧩 Kutunu Oluştur</h1>
        <p className="text-gray-500">Hazır paketlerden seç ya da sıfırdan kendi kutunu oluştur.</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100 flex gap-1">
          <button onClick={() => { setActiveTab("preset"); setBoxItems([]); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "preset" ? "bg-farm-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
            <Package className="w-4 h-4" /> Hazır Paketler
          </button>
          <button onClick={() => { setActiveTab("custom"); setBoxItems([]); }} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === "custom" ? "bg-farm-500 text-white shadow-md" : "text-gray-500 hover:text-gray-700"}`}>
            <Puzzle className="w-4 h-4" /> Kendi Kutunu Oluştur
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {activeTab === "preset" ? (
            <PresetBoxes onAddToBox={addToBox} />
          ) : (
            <CustomBoxBuilder onAddToBox={addToBox} boxItems={boxItems} onUpdateQuantity={updateQuantity} onRemoveItem={removeFromBox} frequency={frequency} onFrequencyChange={setFrequency} />
          )}
        </div>
        <div className="lg:w-[340px] flex-shrink-0">
          <BoxSummary items={boxItems} subtotal={subtotal} discount={discount} discountAmount={discountAmount} total={total} frequency={frequency} onUpdateQuantity={updateQuantity} onRemoveItem={removeFromBox} onAddAllToCart={handleAddAllToCart} />
        </div>
      </div>
    </div>
  );
}
