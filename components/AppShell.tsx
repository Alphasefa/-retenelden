"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import ProducersPage from "./ProducersPage";
import ProducerShopPage from "./ProducerShopPage";
import ProductDetailPage from "./ProductDetailPage";
import SearchResultsPage from "./SearchResultsPage";
import CheckoutPage from "./CheckoutPage";
import FavoritesPage from "./FavoritesPage";
import LegalPages from "./LegalPages";
import SubscriptionsPage from "./SubscriptionsPage";
import MySubscriptionsPage from "./MySubscriptionsPage";
import MyOrdersPage from "./MyOrdersPage";
import ProducerDashboardPage from "./ProducerDashboardPage";
import BoxBuilderPage from "./BoxBuilderPage";
import CartSidebar from "./CartSidebar";
import { BoxItem, CartItem } from "@/lib/data";

export interface Subscription {
  id: string;
  planId: string;
  price: number;
  deliveryDay: string;
  status: "active" | "cancelled";
  startDate: string;
}

export interface Order {
  id: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  date: string;
  deliveryDay: string;
  status: "pending" | "delivered";
}

export default function AppShell() {
  const [currentPage, setCurrentPage] = useState("home");
  const [pageData, setPageData] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const navigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (item: BoxItem) => {
    const optPrice = item.selectedOption?.priceModifier || 0;
    const finalPrice = item.product.price + optPrice;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.product.id);
      if (existing) return prev.map((c) => c.id === item.product.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, {
        id: item.product.id,
        name: item.product.name,
        emoji: item.product.emoji,
        price: finalPrice,
        unit: item.selectedOption?.label || item.product.unit,
        qty: 1,
      }];
    });
    setCartOpen(true);
  };

  const addToCartDirect = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, item];
    });
    setCartOpen(true);
  };

  const updateCartQty = (id: string, qty: number) => {
    if (qty <= 0) { setCart((prev) => prev.filter((c) => c.id !== id)); return; }
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty } : c));
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c.id !== id));
  const clearCart = () => setCart([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  const handleSubscribe = (planId: string, price: number) => {
    const sub: Subscription = {
      id: "ABO-" + Date.now().toString().slice(-6),
      planId, price, deliveryDay: "Pazartesi",
      status: "active", startDate: new Date().toLocaleDateString("tr-TR"),
    };
    setSubscriptions((prev) => [...prev, sub]);
    alert(`${planId} aboneliği başlatıldı!`);
  };

  const handleCancelSub = (id: string) => {
    if (!confirm("Aboneliğinizi iptal etmek istediğinize emin misiniz?")) return;
    setSubscriptions((prev) => prev.map((s) => s.id === id ? { ...s, status: "cancelled" } : s));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const order: Order = {
      id: "SIP-" + Date.now().toString().slice(-6),
      items: cart.map((c) => ({ name: c.name, qty: c.qty, price: c.price })),
      total: cartTotal,
      date: new Date().toLocaleDateString("tr-TR"),
      deliveryDay: "Pazartesi",
      status: "pending",
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    setCartOpen(false);
    alert(`Siparişiniz alındı! ${order.id}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} onAddToCart={addToCart} activeCategory={activeCategory} />;
      case "producers":
        return <ProducersPage onNavigate={navigate} />;
      case "producer-shop":
        return <ProducerShopPage producerId={pageData?.producerId || 1} onNavigate={navigate} onAddToCart={addToCart} />;
      case "product-detail":
        return <ProductDetailPage productId={pageData?.productId || 1} onNavigate={navigate} onAddToCart={addToCart} />;
      case "search":
        return <SearchResultsPage query={pageData?.query || ""} onNavigate={navigate} onAddToCart={addToCart} onClose={() => navigate("home")} />;
      case "checkout":
        return <CheckoutPage items={cart} total={cartTotal} onNavigate={navigate} onOrderComplete={handleCheckout} />;
      case "favorites":
        return <FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} onNavigate={navigate} onAddToCart={addToCart} />;
      case "about":
      case "contact":
      case "faq":
      case "terms":
      case "privacy":
      case "return-policy":
        return <LegalPages page={currentPage as any} onNavigate={navigate} />;
      case "subscriptions":
        return <SubscriptionsPage onNavigate={navigate} onAddToCartDirect={addToCartDirect} />;
      case "box-builder":
        return <BoxBuilderPage onAddToCart={addToCart} />;
      case "my-subscriptions":
        return <MySubscriptionsPage subscriptions={subscriptions} onCancel={handleCancelSub} onNavigate={navigate} />;
      case "my-orders":
        return <MyOrdersPage orders={orders} onNavigate={navigate} />;
      case "producer-dashboard":
        return <ProducerDashboardPage />;
      default:
        return <HomePage onNavigate={navigate} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <Navbar currentPage={currentPage} onNavigate={navigate} cartCount={cartCount} onCartClick={() => setCartOpen(!cartOpen)} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex gap-4">
        {/* Sol Kategori Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-3 sticky top-24">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Kategoriler</h3>
            <nav className="space-y-0.5">
              {[
                { id: "all", name: "Tümü", icon: "fa-solid fa-list" },
                { id: "sebze-meyve", name: "Sebze, Meyve", icon: "fa-solid fa-apple-whole" },
                { id: "kadin-kooperatifleri", name: "Kadın Kooperatifleri", icon: "fa-solid fa-people-group" },
                { id: "et-tavuk", name: "Et, Tavuk", icon: "fa-solid fa-drumstick-bite" },
                { id: "balik", name: "Balık, Deniz Ürünleri", icon: "fa-solid fa-fish" },
                { id: "peynir-sut", name: "Peynir, Süt Ürünleri", icon: "fa-solid fa-cheese" },
                { id: "temel-gida", name: "Temel Gıda", icon: "fa-solid fa-wheat-awn" },
                { id: "kahvaltilik", name: "Kahvaltılık", icon: "fa-solid fa-mug-hot" },
                { id: "atistirmalik", name: "Atıştırmalık", icon: "fa-solid fa-cookie" },
                { id: "hazir-yemek", name: "Hazır Yemek", icon: "fa-solid fa-bowl-food" },
                { id: "firin-pastane", name: "Fırın, Pastane", icon: "fa-solid fa-bread-slice" },
                { id: "icecek", name: "İçecek", icon: "fa-solid fa-bottle-water" },
                { id: "bebek-cocuk", name: "Bebek, Çocuk", icon: "fa-solid fa-baby" },
                { id: "ozel-beslenme", name: "Özel Beslenme", icon: "fa-solid fa-heart-pulse" },
                { id: "dondurma", name: "Dondurma", icon: "fa-solid fa-ice-cream" },
                { id: "ev-yasam", name: "Ev, Yaşam", icon: "fa-solid fa-house" },
                { id: "kisisel-bakim", name: "Kişisel Bakım, Kozmetik", icon: "fa-solid fa-spa" },
                { id: "temizlik", name: "Deterjan, Temizlik", icon: "fa-solid fa-spray-can-sparkles" },
                { id: "bitki-cicek", name: "Canlı Bitki, Çiçek", icon: "fa-solid fa-seedling" },
                { id: "patili", name: "Patili Dostlarımıza", icon: "fa-solid fa-paw" },
                { id: "giyim", name: "Giyim", icon: "fa-solid fa-shirt" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); setCurrentPage("home"); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                    activeCategory === cat.id
                      ? "bg-[#80A541] text-white font-semibold"
                      : "text-gray-600 hover:bg-[#f0f7eb] hover:text-[#5a7a2e]"
                  }`}
                >
                  <i className={`${cat.icon} w-4 text-center text-xs`}></i>
                  <span>{cat.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Ana İçerik */}
        <main className="flex-1 min-w-0">
          {renderPage()}
        </main>
      </div>
      <CartSidebar items={cart} total={cartTotal} isOpen={cartOpen} onClose={() => setCartOpen(false)} onUpdateQty={updateCartQty} onRemove={removeFromCart} onCheckout={() => { setCartOpen(false); navigate("checkout"); }} />
    </div>
  );
}
