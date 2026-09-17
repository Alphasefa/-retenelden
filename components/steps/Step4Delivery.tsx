"use client";

import { Check, Truck, Clock, Percent } from "lucide-react";

interface Step4DeliveryProps {
  frequency: "haftalik" | "iki-haftalik";
  onFrequencyChange: (f: "haftalik" | "iki-haftalik") => void;
}

export default function Step4Delivery({ frequency, onFrequencyChange }: Step4DeliveryProps) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Teslimat Sıklığı & İndirim</h3>
        <p className="text-sm text-gray-500">Ne sıklıkta teslimat istersin?</p>
      </div>

      <div className="space-y-4 max-w-lg">
        {/* Frequency Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Haftalık */}
          <button
            onClick={() => onFrequencyChange("haftalik")}
            className={`relative rounded-2xl border-2 p-6 text-left transition-all ${
              frequency === "haftalik"
                ? "border-farm-400 bg-farm-50 shadow-md"
                : "border-gray-200 bg-white hover:border-farm-200"
            }`}
          >
            {frequency === "haftalik" && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-farm-500 rounded-full flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-farm-100 flex items-center justify-center mb-3">
              <Truck className="w-6 h-6 text-farm-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">Her Hafta</h4>
            <p className="text-sm text-gray-500 mb-3">
              Her hafta düzenli taze teslimat
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                <Percent className="w-3 h-3" />
                %3 İndirim
              </span>
              <span className="text-xs text-gray-400">Otomatik uygulanır</span>
            </div>
          </button>

          {/* 2 Haftada Bir */}
          <button
            onClick={() => onFrequencyChange("iki-haftalik")}
            className={`relative rounded-2xl border-2 p-6 text-left transition-all ${
              frequency === "iki-haftalik"
                ? "border-farm-400 bg-farm-50 shadow-md"
                : "border-gray-200 bg-white hover:border-farm-200"
            }`}
          >
            {frequency === "iki-haftalik" && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-farm-500 rounded-full flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-1">2 Haftada Bir</h4>
            <p className="text-sm text-gray-500 mb-3">
              İki haftada bir teslimat
            </p>
            <div className="text-xs text-gray-400">İndirim yok</div>
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-farm-50 to-green-50 rounded-2xl p-5 border border-farm-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-farm-500 flex items-center justify-center flex-shrink-0">
              <Percent className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-farm-800 mb-1">Abonelik İndirimi</h4>
              <p className="text-sm text-farm-700">
                {frequency === "haftalik" ? (
                  <>
                    Her hafta teslimat seçtiğiniz için <strong>%3 otomatik indirim</strong> uygulanır.
                    Bu indirim sepet toplamından otomatik düşülür.
                  </>
                ) : (
                  <>
                    2 haftada bir teslimat seçtiniz. Her hafta teslimat seçerek <strong>%3 indirim</strong> kazanabilirsiniz.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Days */}
        <div className="bg-gray-50 rounded-2xl p-5">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-farm-500" />
            Teslimat Günleri
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { day: "Pazartesi", region: "İstanbul Avrupa" },
              { day: "Salı", region: "İstanbul Anadolu" },
              { day: "Çarşamba", region: "Ankara" },
              { day: "Perşembe", region: "İzmir" },
              { day: "Cuma", region: "Bursa & Eskişehir" },
              { day: "Cumartesi", region: "Antalya & Muğla" },
            ].map((d) => (
              <div
                key={d.day}
                className="bg-white rounded-xl p-3 border border-gray-100 text-center"
              >
                <div className="text-sm font-bold text-gray-800">{d.day}</div>
                <div className="text-xs text-gray-500 mt-0.5">{d.region}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
