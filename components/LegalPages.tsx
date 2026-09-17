"use client";

import { ArrowLeft } from "lucide-react";

interface LegalPagesProps {
  page: "about" | "contact" | "faq" | "terms" | "privacy" | "return";
  onNavigate: (page: string) => void;
}

export default function LegalPages({ page, onNavigate }: LegalPagesProps) {
  const content: Record<string, { title: string; body: React.ReactNode }> = {
    about: {
      title: "Hakkımızda",
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p><strong>Üreten Elden</strong>, doğal ve taze ürünleri çiftliktenconsumere ulaştırmak amacıyla kurulmuştur.</p>
          <p>Amacımız, yerel üreticileri destekleyerek sağlıklı gıdaya erişimi kolaylaştırmak ve sürdürülebilir bir gıda zinciri oluşturmaktır.</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">Vizyonumuz</h3>
          <p>Türkiye'nin en güvenilir online gıda alışveriş platformu olmak.</p>
          <h3 className="font-bold text-gray-900 text-base mt-6">Değerlerimiz</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Doğallık:</strong> Kimyasal kullanılmayan ürünler</li>
            <li><strong>Tazelik:</strong> Çiftlikten kapınıza en hızlı teslimat</li>
            <li><strong>Destek:</strong> Yerel üreticileri güçlendirme</li>
            <li><strong>Güven:</strong> Şeffaf tedarik zinciri</li>
          </ul>
        </div>
      ),
    },
    contact: {
      title: "İletişim",
      body: (
        <div className="space-y-6 text-sm text-gray-600">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">📞 Müşteri Hizmetleri</h3>
              <p>0850 123 45 67</p>
              <p>Pazartesi - Cumartesi: 08:00 - 22:00</p>
              <p>Pazar: 10:00 - 18:00</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">📧 E-posta</h3>
              <p>destek@uretenelden.com</p>
              <p>siparis@uretenelden.com</p>
              <p>isbirligi@uretenelden.com</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">📍 Merkez</h3>
              <p>Üreten Elden Gıda A.Ş.</p>
              <p>Levent Mah. Büyükdere Cad. No:185</p>
              <p>34394 Şişli / İstanbul</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">🏢 Vergi Bilgileri</h3>
              <p>Vergi Dairesi: Şişli</p>
              <p>Vergi No: 123 456 7890</p>
              <p>Ticaret Sicil No: 123456</p>
            </div>
          </div>
        </div>
      ),
    },
    faq: {
      title: "Sıkça Sorulan Sorular",
      body: (
        <div className="space-y-4 text-sm text-gray-600">
          {[
            { q: "Sipariş ne zaman ulaşır?", a: "Siparişleriniz ertesi gün veya seçtiğiniz teslimat gününde kapınıza ulaşır. Aynı gün teslimat seçeneği de mevcuttur." },
            { q: "Minimum sipariş tutarı var mı?", a: "Evet, minimum sipariş tutarı 100₺'dir. 150₺ ve üzeri siparişlerde kargo ücretsizdir." },
            { q: "Ürünler taze mi?", a: "Tüm ürünlerimiz çiftlikten taze olarak toplanır ve soğuk zincir ile adresinize ulaştırılır." },
            { q: "İade nasıl yapılır?", a: "Ürünlerinizi teslimattan itibaren 14 gün içinde iade edebilirsiniz. Hasarlı veya bozuk ürünler için tam para iadesi yapılır." },
            { q: "Ödeme seçenekleri nelerdir?", a: "Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz. Tüm ödemeler 256-bit SSL ile güvence altındadır." },
            { q: "Aboneliğimi nasıl iptal ederim?", a: "Hesabım > Aboneliklerim sayfasından aboneliğinizi istediğiniz zaman iptal edebilirsiniz." },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 mb-1">{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      ),
    },
    terms: {
      title: "Kullanım Şartları",
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p><strong>1. Kabul:</strong> Bu web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.</p>
          <p><strong>2. Hizmet:</strong> Üreten Elden, online gıda alışverişi hizmeti sunar. Hizmet ülkemizin belirli bölgelerinde aktiftir.</p>
          <p><strong>3. Üyelik:</strong> Tüm kullanıcılar doğru ve güncel bilgi vermekle yükümlüdür. Sahte bilgi veren hesaplar kapatılabilir.</p>
          <p><strong>4. Siparişler:</strong> Siparişler onay öncesi iptal edilebilir. Onaylanmış siparişler için aşağıdaki iptal politikası geçerlidir.</p>
          <p><strong>5. Fiyatlar:</strong> Tüm fiyatlar KDV dahildir. Fiyatlar önceden haber verilmeksizin değiştirilebilir.</p>
          <p><strong>6. Sorumluluk:</strong> Üreten Elden, force majeur durumlarında teslimat gecikmelerinden sorumlu değildir.</p>
        </div>
      ),
    },
    privacy: {
      title: "Gizlilik Politikası (KVKK)",
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p><strong>Veri Sorumlusu:</strong> Üreten Elden Gıda A.Ş.</p>
          <p><strong>Toplanan Veriler:</strong> Ad, soyad, e-posta, telefon, adres, ödeme bilgileri, sipariş geçmişi.</p>
          <p><strong>Veri Toplama Amacı:</strong> Siparişlerinizi gerçekleştirmek, size ulaşmak, yasal yükümlülüklerimizi yerine getirmek.</p>
          <p><strong>Veri Paylaşımı:</strong> Kişisel verileriniz üçüncü taraflarla yalnızca yasal zorunluluk durumunda paylaşılır (kargo firması, banka vb.).</p>
          <p><strong>Veri Saklama:</strong> Sipariş verileri 10 yıl, iletişim verileri 5 yıl süreyle saklanır.</p>
          <p><strong>Haklarınız:</strong> Kişisel verilerinize erişme, düzeltme, silme ve işlemeye itiraz etme hakkınız vardır.</p>
          <p><strong>Başvuru:</strong> kvkk@uretenelden.com adresinden başvurabilirsiniz.</p>
        </div>
      ),
    },
    return: {
      title: "İade ve Değişim Politikası",
      body: (
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <h3 className="font-bold text-gray-900 text-base">14 Gün İade Hakkı</h3>
          <p>Ürünlerinizi teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz.</p>
          <h3 className="font-bold text-gray-900 text-base mt-4">İade Koşulları</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ürün orijinal ambalajında olmalıdır</li>
            <li>Hasar görmemiş ve kullanılmamış olmalıdır</li>
            <li>Buzdolabı ürünleri (süt, peynir vb.) hijyen nedeniyle yalnızca hasarlıysa iade edilebilir</li>
          </ul>
          <h3 className="font-bold text-gray-900 text-base mt-4">Hasarlı Ürünler</h3>
          <p>Hasarlı veya bozuk gelen ürünler için fotoğraf çekerek müşteri hizmetlerimize bildiriniz. Tam para iadesi yapılır.</p>
          <h3 className="font-bold text-gray-900 text-base mt-4">Para İadesi</h3>
          <p>İade onaylandıktan sonra 3-5 iş günü içinde ödeme yapılan karta iade yapılır.</p>
        </div>
      ),
    },
  };

  const { title, body } = content[page];

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => onNavigate("home")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#80A541] transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
      </button>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
        {body}
      </div>
    </div>
  );
}
