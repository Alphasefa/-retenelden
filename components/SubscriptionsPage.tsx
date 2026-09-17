"use client";

import { useState } from "react";
import { SUBSCRIPTION_PLANS, EXTRA_ITEMS, DELIVERY_DAYS, ExtraItem, CartItem } from "@/lib/data";
import { Check, Calendar, Truck, Plus, Minus, ShoppingCart, X, ChevronDown, ChevronUp } from "lucide-react";

interface SubscriptionsPageProps {
  onNavigate: (page: string, data?: any) => void;
  onAddToCartDirect: (item: CartItem) => void;
}

export default function SubscriptionsPage({ onNavigate, onAddToCartDirect }: SubscriptionsPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<{ [key: string]: { item: ExtraItem; qty: number; option?: { label: string; value: number; priceModifier: number } } }>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const plan = SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlan);

  const extraCategories = [...new Set(EXTRA_ITEMS.map((e) => e.category))];

  const toggleExtra = (item: ExtraItem) => {
    setSelectedExtras((prev) => {
      if (prev[item.id]) {
        const next = { ...prev };
        delete next[item.id];
        return next;
      }
      return { ...prev, [item.id]: { item, qty: 1, option: item.options?.[0] } };
    });
  };

  const updateExtraQty = (itemId: string, qty: number) => {
    if (qty <= 0) {
      setSelectedExtras((prev) => {
        const next = { ...prev };
        delete next[itemId];
        return next;
      });
    } else {
      setSelectedExtras((prev) => ({
        ...prev,
        [itemId]: { ...prev[itemId], qty },
      }));
    }
  };

  const updateExtraOption = (itemId: string, option: { label: string; value: number; priceModifier: number }) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], option },
    }));
  };

  const calculateTotal = () => {
    if (!plan) return 0;
    let total = plan.basePrice;
    Object.values(selectedExtras).forEach(({ item, qty, option }) => {
      const optPrice = option?.priceModifier || 0;
      total += (item.price + optPrice) * qty;
    });
    return total;
  };

  const handleAddToCart = () => {
    if (!plan) return;

    // Add base items with correct prices
    plan.baseItems.forEach((baseItem) => {
      const matchingProduct = EXTRA_ITEMS.find((e) => e.name === baseItem.name);
      if (matchingProduct) {
        const amountNum = parseInt(baseItem.amount) || 1;
        const isMilk = baseItem.name.includes("Süt");
        const isEgg = baseItem.name.includes("Yumurta");
        let price = 0;
        if (isMilk) price = 22.90 * amountNum;
        else if (isEgg) price = 3.50 * amountNum;
        else price = matchingProduct.price;

        onAddToCartDirect({
          id: `sub-${plan.id}-${matchingProduct.id}`,
          name: `${plan.name} - ${baseItem.name}`,
          emoji: baseItem.icon,
          price: price,
          unit: baseItem.amount,
          qty: 1,
        });
      }
    });

    // Add extras
    Object.values(selectedExtras).forEach(({ item, qty, option }) => {
      const optPrice = option?.priceModifier || 0;
      onAddToCartDirect({
        id: `extra-${item.id}-${Date.now()}`,
        name: item.name,
        emoji: item.icon,
        price: item.price + optPrice,
        unit: option?.label || item.unit,
        qty,
      });
    });

    alert("Paket sepete eklendi!");
    onNavigate("home");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Abonelik Paketleri</h1>
        <p className="text-gray-500 text-sm">Paketinizi seçin, ekstra ürünleri dilediğiniz gibi ekleyin.</p>
      </div>

      {/* Step 1: Select Plan */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-7 h-7 bg-[#80A541] text-white rounded-full flex items-center justify-center text-sm">1</span>
          Paket Seçin
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {SUBSCRIPTION_PLANS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlan(p.id)}
              className={`bg-white rounded-2xl border-2 p-5 text-left transition-all relative ${
                selectedPlan === p.id
                  ? "border-[#80A541] shadow-lg shadow-green-100"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-2.5 left-4 bg-[#80A541] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                  EN ÇOK TERCİH EDİLEN
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl`}>
                  {p.icon}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.desc}</div>
                </div>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-2xl font-bold text-[#5a7a2e]">₺{p.basePrice.toFixed(2)}</span>
                <span className="text-gray-400 text-sm">/hafta</span>
              </div>
              <div className="space-y-1.5">
                {p.baseItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{item.icon}</span>
                    <span className="font-medium">{item.amount} {item.name}</span>
                  </div>
                ))}
              </div>
              {selectedPlan === p.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-[#80A541] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Step 2: Select Extras */}
      {selectedPlan && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-[#80A541] text-white rounded-full flex items-center justify-center text-sm">2</span>
            Ekstra Ürünler Seçin (İsteğe Bağlı)
          </h2>
          <p className="text-sm text-gray-500 mb-4">Paketinize ekstra ürün ekleyerek özelleştirebilirsiniz.</p>

          <div className="space-y-3">
            {extraCategories.map((category) => {
              const items = EXTRA_ITEMS.filter((e) => e.category === category);
              const isExpanded = expandedCategory === category;
              const selectedCount = items.filter((e) => selectedExtras[e.id]).length;

              return (
                <div key={category} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm text-gray-800">{category}</span>
                      {selectedCount > 0 && (
                        <span className="bg-[#80A541] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {selectedCount} seçili
                        </span>
                      )}
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isExpanded && (
                    <div className="border-t border-gray-100 p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {items.map((item) => {
                          const isSelected = !!selectedExtras[item.id];
                          const selectedData = selectedExtras[item.id];

                          return (
                            <div
                              key={item.id}
                              className={`rounded-xl border-2 p-3 transition-all ${
                                isSelected ? "border-[#80A541] bg-green-50" : "border-gray-100 hover:border-gray-200"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-gray-800">{item.name}</div>
                                  <div className="text-xs text-gray-500">{item.description}</div>
                                  <div className="text-sm font-bold text-[#5a7a2e] mt-1">
                                    ₺{item.price.toFixed(2)}
                                    <span className="text-gray-400 font-normal"> / {item.unit}</span>
                                  </div>
                                </div>
                                {!isSelected ? (
                                  <button
                                    onClick={() => toggleExtra(item)}
                                    className="w-8 h-8 rounded-full bg-[#80A541] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#5a7a2e] transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => toggleExtra(item)}
                                    className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 hover:bg-red-200 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>

                              {isSelected && selectedData && (
                                <div className="mt-3 pt-3 border-t border-green-200 space-y-2">
                                  {/* Options */}
                                  {item.options && (
                                    <div className="flex flex-wrap gap-1.5">
                                      {item.options.map((opt, i) => (
                                        <button
                                          key={i}
                                          onClick={() => updateExtraOption(item.id, opt)}
                                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                                            selectedData.option?.label === opt.label
                                              ? "bg-[#80A541] text-white"
                                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                          }`}
                                        >
                                          {opt.label}
                                          {opt.priceModifier !== 0 && (
                                            <span className="ml-1">
                                              {opt.priceModifier > 0 ? "+" : ""}₺{opt.priceModifier}
                                            </span>
                                          )}
                                        </button>
                                      ))}
                                    </div>
                                  )}

                                  {/* Quantity */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Adet:</span>
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => updateExtraQty(item.id, selectedData.qty - 1)}
                                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-6 text-center text-sm font-bold">{selectedData.qty}</span>
                                      <button
                                        onClick={() => updateExtraQty(item.id, selectedData.qty + 1)}
                                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Step 3: Delivery Day */}
      {selectedPlan && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-7 h-7 bg-[#80A541] text-white rounded-full flex items-center justify-center text-sm">3</span>
            Teslimat Günü Seçin
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DELIVERY_DAYS.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`rounded-xl p-4 border-2 text-center transition-all ${
                  selectedDay === d.day
                    ? "border-[#80A541] bg-green-50 shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <Truck className={`w-5 h-5 mx-auto mb-2 ${selectedDay === d.day ? "text-[#80A541]" : "text-gray-400"}`} />
                <div className="font-bold text-sm text-gray-800">{d.day}</div>
                <div className="text-xs text-gray-500 mt-0.5">{d.region}</div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Summary & Add to Cart */}
      {selectedPlan && (
        <section className="bg-white rounded-2xl border border-gray-100 p-6 sticky bottom-4 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Sipariş Özeti</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>{plan?.icon}</span>
                  <span className="font-medium">{plan?.name}</span>
                  <span className="text-gray-400">- ₺{plan?.basePrice.toFixed(2)}</span>
                </div>
                {Object.values(selectedExtras).map(({ item, qty, option }) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{option?.label || item.unit} {item.name}</span>
                    <span className="text-gray-400">x{qty}</span>
                    <span className="text-gray-400">- ₺{((item.price + (option?.priceModifier || 0)) * qty).toFixed(2)}</span>
                  </div>
                ))}
                {selectedDay && (
                  <div className="flex items-center gap-2 text-[#80A541]">
                    <Truck className="w-3.5 h-3.5" />
                    <span className="font-medium">{selectedDay} teslimat</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Haftalık Toplam</div>
              <div className="text-2xl font-bold text-[#5a7a2e]">₺{calculateTotal().toFixed(2)}</div>
              <button
                onClick={handleAddToCart}
                disabled={!selectedDay}
                className={`mt-3 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all ${
                  selectedDay
                    ? "bg-[#80A541] text-white hover:bg-[#5a7a2e] active:scale-[0.98]"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                Sepete Ekle
              </button>
              {!selectedDay && <p className="text-xs text-red-500 mt-2">Lütfen teslimat günü seçin</p>}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
