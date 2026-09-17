"use client";

import { Order } from "@/components/AppShell";

interface MyOrdersPageProps {
  orders: Order[];
  onNavigate: (page: string) => void;
}

export default function MyOrdersPage({ orders, onNavigate }: MyOrdersPageProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Henüz siparişiniz yok</h3>
        <p className="text-gray-500 mb-5">Alışverişe başlayın</p>
        <button onClick={() => onNavigate("home")} className="bg-farm-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-farm-600 transition-colors">
          Alışverişe Başla
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-gray-900 mb-6">📋 Siparişlerim</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
              <span className="font-bold text-gray-900">{order.id}</span>
              <span className="text-sm text-gray-500">{order.date} • {order.deliveryDay} teslimat</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {order.status === "pending" ? "Hazırlanıyor" : "Teslim Edildi"}
              </span>
            </div>
            <div className="space-y-1 mb-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-600">
                  <span>{item.name} x{item.qty}</span>
                  <span>₺{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
              <span>Toplam</span>
              <span className="text-farm-700">₺{order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
