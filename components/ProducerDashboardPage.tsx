"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/data";
import { Plus, Pen, Trash2, Package, Settings, BarChart3 } from "lucide-react";

export default function ProducerDashboardPage() {
  const [activeTab, setActiveTab] = useState<"products" | "add" | "settings">("products");
  const [products, setProducts] = useState(PRODUCTS.slice(0, 8));

  const [form, setForm] = useState({
    name: "", category: "", price: "", unit: "Adet", stock: "", icon: "🥚", desc: "", organic: false, featured: false,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 100,
      name: form.name,
      weight: `1 ${form.unit}`,
      price: parseFloat(form.price),
      icon: form.icon,
      badge: form.organic ? "Organik" : "",
      badgeClass: form.organic ? "organic" : "",
      category: form.category,
      producerId: 1,
      organic: form.organic,
    };
    setProducts([newProduct, ...products]);
    setForm({ name: "", category: "", price: "", unit: "Adet", stock: "", icon: "🥚", desc: "", organic: false, featured: false });
    setActiveTab("products");
  };

  const handleDelete = (id: number) => {
    if (confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const tabs = [
    { id: "products" as const, label: "Ürünlerim", icon: Package },
    { id: "add" as const, label: "Ürün Ekle", icon: Plus },
    { id: "settings" as const, label: "Mağaza Ayarları", icon: Settings },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-gray-900 mb-6">🏪 Üretici Paneli</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id ? "bg-farm-500 text-white shadow-md" : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "products" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Mağazamdaki Ürünler ({products.length})</h2>
            <button onClick={() => setActiveTab("add")} className="flex items-center gap-1.5 bg-farm-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-farm-600 transition-colors">
              <Plus className="w-4 h-4" /> Yeni Ürün
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p) => (
              <div key={p.id} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl border border-gray-100 flex-shrink-0">{p.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 truncate">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.weight} • ₺{p.price.toFixed(2)}</div>
                </div>
                <div className="flex gap-1">
                  <button className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-farm-600 hover:border-farm-300 transition-colors">
                    <Pen className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "add" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-xl">
          <h2 className="font-bold text-gray-900 mb-4">Yeni Ürün Ekle</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ürün Adı *</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300" placeholder="ör: Köy Yumurtası" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori *</label>
                <select required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300">
                  <option value="">Seçin</option>
                  <option value="sut-urunleri">Süt Ürünleri</option>
                  <option value="yumurta">Yumurta</option>
                  <option value="sebze-meyve">Sebze & Meyve</option>
                  <option value="et">Et & Tavuk</option>
                  <option value="tahil">Tahıl</option>
                  <option value="bal">Bal</option>
                  <option value="temizlik">Temizlik</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Fiyat (₺) *</label>
                <input required type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Birim</label>
                <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300">
                  <option>Adet</option><option>Kg</option><option>Litre</option><option>Paket</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">İkon</label>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300">
                  <option>🥚</option><option>🥛</option><option>🧀</option><option>🍅</option><option>🍎</option><option>🍗</option><option>🌾</option><option>🍯</option><option>🧈</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Açıklama</label>
              <textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300" placeholder="Ürün hakkında..." />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" checked={form.organic} onChange={(e) => setForm({ ...form, organic: e.target.checked })} className="w-4 h-4 rounded text-farm-500 focus:ring-farm-300" />
                Organik Ürün
              </label>
              <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-4 h-4 rounded text-farm-500 focus:ring-farm-300" />
                Öne Çıkar
              </label>
            </div>
            <button type="submit" className="bg-farm-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-farm-600 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" /> Ürün Ekle
            </button>
          </form>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-xl">
          <h2 className="font-bold text-gray-900 mb-4">Mağaza Ayarları</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Kaydedildi!"); }}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mağaza Adı</label>
              <input className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300" placeholder="Çiftliğimizin Adı" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Açıklama</label>
              <textarea rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300" placeholder="Hakkımızda..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Konum</label>
                <input className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300" placeholder="ör: Bolu, Mengen" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">İletişim</label>
                <input className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-farm-300" placeholder="Telefon veya e-posta" />
              </div>
            </div>
            <button type="submit" className="bg-farm-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-farm-600 transition-colors">
              Kaydet
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
