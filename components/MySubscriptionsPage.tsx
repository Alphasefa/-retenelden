"use client";

import { Subscription } from "@/components/AppShell";
import { SUBSCRIPTION_PLANS } from "@/lib/data";
import { X, RotateCcw } from "lucide-react";

interface MySubscriptionsPageProps {
  subscriptions: Subscription[];
  onCancel: (id: string) => void;
  onNavigate: (page: string) => void;
}

export default function MySubscriptionsPage({ subscriptions, onCancel, onNavigate }: MySubscriptionsPageProps) {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz aboneliğiniz yok</h3>
        <p className="text-gray-500 mb-5">Çeşitli abonelik paketlerimizi inceleyin</p>
        <button onClick={() => onNavigate("subscriptions")} className="bg-farm-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-farm-600 transition-colors">
          Abonelikleri Gör
        </button>
      </div>
    );
  }

  const planIcons: Record<string, string> = { kucuk: "🧑", orta: "👨‍👩‍👧", buyuk: "👨‍👩‍👧‍👦" };
  const planColors: Record<string, string> = { kucuk: "#16A34A", orta: "#D97706", buyuk: "#DC2626" };

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-gray-900 mb-6">🔄 Aboneliklerim</h1>
      <div className="space-y-4">
        {subscriptions.map((sub) => {
          const plan = SUBSCRIPTION_PLANS.find((p) => p.id === sub.planId);
          return (
            <div key={sub.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-white flex-shrink-0" style={{ background: planColors[sub.planId] || "#666" }}>
                {planIcons[sub.planId] || "📦"}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900">{plan?.name || sub.planId}</h4>
                <p className="text-sm text-gray-500">₺{sub.price}/hafta • {sub.deliveryDay} teslimat</p>
                <p className="text-xs text-gray-400 mt-0.5">Başlangıç: {sub.startDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${sub.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {sub.status === "active" ? "Aktif" : "İptal"}
                </span>
                {sub.status === "active" && (
                  <button onClick={() => onCancel(sub.id)} className="flex items-center gap-1 text-xs text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    <X className="w-3 h-3" /> İptal Et
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
