"use client";

import { useState } from "react";
import { CartItem } from "@/lib/data";
import { ArrowLeft, MapPin, CreditCard, CheckCircle, Truck, Shield, Lock } from "lucide-react";

interface CheckoutPageProps {
  items: CartItem[];
  total: number;
  onNavigate: (page: string, data?: any) => void;
  onOrderComplete: () => void;
}

export default function CheckoutPage({ items, total, onNavigate, onOrderComplete }: CheckoutPageProps) {
  const [step, setStep] = useState<"address" | "payment" | "confirm">("address");
  const [address, setAddress] = useState({ title: "", district: "", street: "", building: "", apartment: "", note: "" });
  const [payment, setPayment] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);

  const deliveryFee = total >= 150 ? 0 : 14.90;
  const grandTotal = total + deliveryFee - promoDiscount;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === "ILK10") {
      setPromoDiscount(total * 0.1);
    } else if (promoCode.toUpperCase() === "TAZE20") {
      setPromoDiscount(total * 0.2);
    } else {
      setPromoDiscount(0);
      alert("Geçersiz kupon kodu");
    }
  };

  const handleOrder = () => {
    onOrderComplete();
    setStep("confirm");
  };

  if (step === "confirm") {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Siparişiniz Alındı!</h1>
        <p className="text-gray-500 mb-2">Sipariş numaranız: <strong>SIP-{Date.now().toString().slice(-6)}</strong></p>
        <p className="text-sm text-gray-400 mb-8">En kısa sürede hazırlık süreci başlayacak.</p>
        <button onClick={() => { onNavigate("home"); }} className="bg-[#80A541] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5a7a2e] transition-colors">
          Alışverişe Devam Et
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => onNavigate("home")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#80A541] transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Alışverişe Dön
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Siparişi Tamamla</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { id: "address", label: "Adres", icon: <MapPin className="w-4 h-4" /> },
          { id: "payment", label: "Ödeme", icon: <CreditCard className="w-4 h-4" /> },
        ].map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s.id ? "bg-[#80A541] text-white" : i < ["address", "payment"].indexOf(step) ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
            }`}>
              {i < ["address", "payment"].indexOf(step) ? <CheckCircle className="w-4 h-4" /> : s.icon}
            </div>
            <span className={`text-sm font-medium ${step === s.id ? "text-gray-900" : "text-gray-400"}`}>{s.label}</span>
            {i < 1 && <div className="w-12 h-0.5 bg-gray-200 mx-2"></div>}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <div className="flex-1">
          {step === "address" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#80A541]" /> Teslimat Adresi
              </h2>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Adres Başlığı</label>
                <input value={address.title} onChange={(e) => setAddress({ ...address, title: e.target.value })} placeholder="Örn: Ev, İş" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">İlçe</label>
                  <input value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} placeholder="Kadıköy" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Mahalle / Sokak</label>
                  <input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="Bağdat Cad. No:10" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Bina No</label>
                  <input value={address.building} onChange={(e) => setAddress({ ...address, building: e.target.value })} placeholder="25" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Daire No</label>
                  <input value={address.apartment} onChange={(e) => setAddress({ ...address, apartment: e.target.value })} placeholder="3" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Not (Opsiyonel)</label>
                <textarea value={address.note} onChange={(e) => setAddress({ ...address, note: e.target.value })} placeholder="Kapı şifresi, teslimat notu..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541] h-20 resize-none" />
              </div>
              <button onClick={() => setStep("payment")} className="w-full bg-[#80A541] text-white py-3 rounded-xl font-bold hover:bg-[#5a7a2e] transition-colors">
                Ödemeye Geç
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#80A541]" /> Kart Bilgileri
              </h2>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Kart Üzerindeki İsim</label>
                <input value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} placeholder="Ad Soyad" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Kart Numarası</label>
                <input value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Son Kullanma</label>
                  <input value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} placeholder="MM/YY" maxLength={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">CVV</label>
                  <input value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} placeholder="123" maxLength={4} type="password" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#80A541]" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                <Lock className="w-3.5 h-3.5" /> 256-bit SSL ile güvenli ödeme
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep("address")} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  Geri
                </button>
                <button onClick={handleOrder} className="flex-1 bg-[#80A541] text-white py-3 rounded-xl font-bold hover:bg-[#5a7a2e] transition-colors">
                  ₺{grandTotal.toFixed(2)} Öde
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Sipariş Özeti</h3>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.unit} x{item.qty}</div>
                  </div>
                  <div className="text-sm font-bold text-gray-800">₺{(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Promo Code */}
            <div className="flex gap-2 mb-4">
              <input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Kupon kodu" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#80A541]" />
              <button onClick={handlePromo} className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                Uygula
              </button>
            </div>

            <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between text-gray-600">
                <span>Ara Toplam</span><span>₺{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Kargo</span>
                <span className={deliveryFee === 0 ? "text-[#80A541] font-semibold" : ""}>
                  {deliveryFee === 0 ? "Ücretsiz" : `₺${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Kupon İndirimi</span><span>-₺{promoDiscount.toFixed(2)}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="text-xs text-[#80A541] bg-green-50 p-2 rounded-lg">
                  ₺{(150 - total).toFixed(2)} daha ekleyin, kargo ücretsiz olsun!
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t border-gray-100 pt-2">
                <span>Toplam</span><span className="text-[#5a7a2e]">₺{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
