import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Üreten Elden - Abonelik Kutusu",
  description: "Köyden kapınıza taze süt, yumurta ve doğal ürünler. Hazır paketler veya kendi kutunuzu oluşturun.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
