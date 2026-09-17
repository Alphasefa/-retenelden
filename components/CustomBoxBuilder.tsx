"use client";

import { useState } from "react";
import { BOX_PRODUCTS, BoxItem } from "@/lib/data";
import Step1Basic from "./steps/Step1Basic";
import Step2Deli from "./steps/Step2Deli";
import Step3Seasonal from "./steps/Step3Seasonal";
import Step4Delivery from "./steps/Step4Delivery";
import {
  Wheat,
  Coffee,
  Cherry,
  Calendar,
  Check,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

interface CustomBoxBuilderProps {
  onAddToBox: (item: BoxItem) => void;
  boxItems: BoxItem[];
  onUpdateQuantity: (productId: string, qty: number) => void;
  onRemoveItem: (productId: string) => void;
  frequency: "haftalik" | "iki-haftalik";
  onFrequencyChange: (f: "haftalik" | "iki-haftalik") => void;
}

const steps = [
  { id: 1, label: "Temel Gıda", icon: Wheat, desc: "Süt & Yumurta" },
  { id: 2, label: "Şarküteri", icon: Coffee, desc: "Peynir, Reçel, Tereyağı" },
  { id: 3, label: "Mevsimlik", icon: Cherry, desc: "Taze Meyve & Sebze" },
  { id: 4, label: "Teslimat", icon: Calendar, desc: "Sıklık & İndirim" },
];

export default function CustomBoxBuilder({
  onAddToBox,
  boxItems,
  onUpdateQuantity,
  onRemoveItem,
  frequency,
  onFrequencyChange,
}: CustomBoxBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const nextStep = () => {
    setCompletedSteps((prev) => new Set(prev).add(currentStep));
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const getItemQty = (productId: string): number => {
    const item = boxItems.find((i) => i.product.id === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-heading text-farm-800 mb-1">
          Kendi Kutunu Oluştur
        </h2>
        <p className="text-gray-500 text-sm">
          Adımları takip ederek hayalindeki kutuyu tasarla.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.has(step.id);

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => goToStep(step.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-farm-50 border-2 border-farm-400"
                      : isCompleted
                      ? "bg-green-50 border-2 border-green-300"
                      : "border-2 border-transparent hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isActive
                        ? "bg-farm-500 text-white"
                        : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="text-left hidden sm:block">
                    <div
                      className={`text-sm font-semibold ${
                        isActive ? "text-farm-700" : isCompleted ? "text-green-700" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="text-xs text-gray-400">{step.desc}</div>
                  </div>
                </button>

                {idx < steps.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div
                      className={`h-0.5 rounded-full transition-colors ${
                        isCompleted ? "bg-green-300" : "bg-gray-100"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="step-enter" key={currentStep}>
          {currentStep === 1 && (
            <Step1Basic getItemQty={getItemQty} onAdd={onAddToBox} onRemove={onRemoveItem} />
          )}
          {currentStep === 2 && (
            <Step2Deli getItemQty={getItemQty} onAdd={onAddToBox} onRemove={onRemoveItem} />
          )}
          {currentStep === 3 && (
            <Step3Seasonal getItemQty={getItemQty} onAdd={onAddToBox} onRemove={onRemoveItem} />
          )}
          {currentStep === 4 && (
            <Step4Delivery frequency={frequency} onFrequencyChange={onFrequencyChange} />
          )}
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-100 p-5 flex items-center justify-between bg-gray-50/50">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Geri
          </button>

          <div className="text-sm text-gray-400">
            {currentStep} / 4
          </div>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-farm-500 text-white hover:bg-farm-600 active:scale-95 transition-all"
            >
              İleri
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-sm font-semibold text-farm-600 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Hazır!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
