import React, { useState, useEffect, useRef } from 'react';
import { 
  Coffee, ShoppingBag, LayoutDashboard, History, Wallet, 
  BookOpen, Printer, Download, MessageCircle, QrCode, 
  Upload, X, Trash2, Plus, CheckSquare, CheckCircle2,
  Edit2, ImageIcon, Minus, Eye, EyeOff, Package, Lock, Unlock, Star, Settings, FileText, Calculator, ArrowUpRight, ArrowDownLeft, Landmark, Volume2
} from 'lucide-react';

const getImgUrl = (item) => item.image || `https://placehold.co/300x200/1A1A1A/D4AF37?text=${encodeURIComponent(item.name)}`;

const INITIAL_SPECIAL_MENUS = [
  { id: 'special-1', name: 'Nasi Kebuli Spesial La-Tansa', description: 'Hidangan eksklusif Nasi Kebuli dengan daging kambing empuk, kismis, dan rempah pilihan. Porsi besar cocok untuk makan bersama.', price: 45000, category: 'Spesial', image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=800&h=400', isAvailable: true },
  { id: 'special-2', name: 'Ayam Bakar Madu Sultan', description: 'Ayam bakar empuk dengan olesan madu murni bakar khas La-Tansa, disajikan dengan sambal terasi spesial dan lalapan segar.', price: 25000, category: 'Spesial', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800&h=400', isAvailable: true }
];

const INITIAL_PACKAGES = [
  { id: 'pkt-A', name: 'Paket A', price: 10000, description: 'Nasi + Ayam Pilihan + Sayur Pilihan + Es Teh', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=300&h=200', isAvailable: true },
  { id: 'pkt-B', name: 'Paket B', price: 12000, description: 'Nasi + Ayam Spesial + Telur + Sayur + Air Mineral', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=300&h=200', isAvailable: true },
  { id: 'pkt-C', name: 'Paket C', price: 9000, description: 'Nasi + Ikan Lele / Goreng + Tempe/Tahu + Sayur', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=300&h=200', isAvailable: true },
  { id: 'pkt-D', name: 'Paket D', price: 8000, description: 'Nasi + Telur Dadar/Ceplok + Sayur + Gorengan', image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&q=80&w=300&h=200', isAvailable: true },
];

const INITIAL_MENU = [
  { id: 1, name: 'Ayam Kecap', price: 6000, category: 'Ayam', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 2, name: 'Ayam Balado', price: 6000, category: 'Ayam', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 3, name: 'Ayam Opor', price: 6000, category: 'Ayam', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 4, name: 'Ayam Asam Manis', price: 6000, category: 'Ayam', image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 5, name: 'Ayam Kremes', price: 6000, category: 'Ayam', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 6, name: 'Ayam Rica Rica', price: 6000, category: 'Ayam', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 7, name: 'Ayam Serundeng', price: 6000, category: 'Ayam', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 8, name: 'Ayam Krispy', price: 7000, category: 'Ayam', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 9, name: 'Ikan Lele', price: 6000, category: 'Ikan', image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 10, name: 'Ikan Kuah', price: 7000, category: 'Ikan', image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4859?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 11, name: 'Ikan Goreng', price: 7000, category: 'Ikan', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 12, name: 'Telur Dadar', price: 5000, category: 'Telur', image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 13, name: 'Telur Ceplok', price: 5000, category: 'Telur', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 14, name: 'Telur Rebus', price: 5000, category: 'Telur', image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 15, name: 'Sayur Kacang Panjang', price: 3000, category: 'Sayur-sayuran', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 16, name: 'Sayur Kangkung', price: 3000, category: 'Sayur-sayuran', image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 17, name: 'Sayur Capcai', price: 3000, category: 'Sayur-sayuran', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 18, name: 'Sayur Sop', price: 3000, category: 'Sayur-sayuran', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 19, name: 'Sayur Bening Bayam', price: 3000, category: 'Sayur-sayuran', image: 'https://images.unsplash.com/photo-1615486171434-f8623b378eb8?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 20, name: 'Sayur Tumis Toge', price: 3000, category: 'Sayur-sayuran', image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 21, name: 'Mie Kuning', price: 3000, category: 'Makanan Lainnya', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 22, name: 'Mie Hun', price: 3000, category: 'Makanan Lainnya', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 23, name: 'Tempe Oreg', price: 3000, category: 'Makanan Lainnya', image: 'https://images.unsplash.com/photo-1610927845353-832049e7bdf8?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 24, name: 'Oseng Tahu', price: 3000, category: 'Makanan Lainnya', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 25, name: 'Terong Kecap', price: 3000, category: 'Makanan Lainnya', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 26, name: 'Tumis Usus', price: 3000, category: 'Makanan Lainnya', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 27, name: 'Tempe Goreng', price: 1000, category: 'Gorengan', image: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 28, name: 'Tahu Goreng', price: 1000, category: 'Gorengan', image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80&w=300&h=200' },
  { id: 29, name: 'Tempe Mendoan', price: 1000, category: 'Gorengan', image: 'https://images.unsplash.com/photo-1596649281358-8b9eb98b671a?auto=format&fit=crop&q=80&w=300&h=200' }
];

const HIJRI_MONTHS = [
  "Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir", 
  "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban", 
  "Ramadhan", "Syawal", "Dzulqa'dah", "Dzulhijjah"
];

// Speech synthesis notification utility with male voice preference
const speakNotification = (text) => {
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.95;
      utterance.pitch = 0.7;

      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => (v.lang.includes('id') || v.lang.includes('ind')) && (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('pria') || v.name.toLowerCase().includes('damayanti') === false && v.name.toLowerCase().includes('google') === false));
      if (maleVoice) {
        utterance.voice = maleVoice;
      } else {
        const indoVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ind'));
        if (indoVoice) utterance.voice = indoVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.log("Speech synthesis not supported or blocked", e);
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('online'); 
  const [menuItems, setMenuItems] = useState(INITIAL_MENU.map(item => ({...item, isAvailable: item.isAvailable !== false})));
  const [specialMenus, setSpecialMenus] = useState(INITIAL_SPECIAL_MENUS);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [orders, setOrders] = useState([]);
  
  const [transactions, setTransactions] = useState([
    { id: 'TRX-101', date: new Date().toLocaleDateString(), hijriMonth: 'Rabiul Awal', quarter: 'Triwulan I (Q1)', type: 'IN', category: 'PENJUALAN', amount: 150000, note: 'Penjualan Outlet Kasir' },
    { id: 'TRX-102', date: new Date().toLocaleDateString(), hijriMonth: 'Rabiul Awal', quarter: 'Triwulan I (Q1)', type: 'OUT', category: 'BAHAN_BAKU', amount: 50000, note: 'Belanja Ayam & Bumbu Dapur' },
    { id: 'TRX-103', date: new Date().toLocaleDateString(), hijriMonth: 'Rabiul Awal', quarter: 'Triwulan I (Q1)', type: 'OUT', category: 'PERALATAN', amount: 30000, note: 'Pembelian Gas LPG & Wadah Mika' },
    { id: 'TRX-104', date: new Date().toLocaleDateString(), hijriMonth: 'Rabiul Awal', quarter: 'Triwulan I (Q1)', type: 'SAVING', category: 'TABUNGAN_REKENING', amount: 20000, note: 'Setoran Tabungan Harian Toko' }
  ]);

  const [customQrisImage, setCustomQrisImage] = useState(null);
  
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentReceiptData, setCurrentReceiptData] = useState(null);

  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const receiptRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  const btnClass = "bg-gradient-to-r from-[#D4AF37] to-[#AA821C] text-[#050505] py-3 px-6 rounded-md font-bold tracking-wide hover:from-[#E3C365] hover:to-[#C69A27] transition-all disabled:opacity-50 text-sm shadow-[0_4px_15px_rgba(212,175,55,0.2)] border-none hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)]";
  const inputClass = "w-full p-3 bg-[#111111]/80 backdrop-blur-sm border border-[#D4AF37]/30 rounded-md focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all text-sm font-['Inter',sans-serif] text-[#E5E7EB] placeholder-[#6B7280]";
  const cardClass = "bg-[#141414]/90 backdrop-blur-md p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] border border-[#D4AF37]/20 relative z-10";

  const handleTabClick = (tabId) => {
    if (tabId === 'online') {
      setActiveTab('online');
    } else {
      if (isStaffLoggedIn) {
        setActiveTab(tabId);
      } else {
        setPendingTab(tabId);
        setShowLoginModal(true);
        setLoginError('');
        setLoginPassword('');
      }
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginPassword === 'latansacafe123') {
      setIsStaffLoggedIn(true);
      setShowLoginModal(false);
      setActiveTab(pendingTab);
      setPendingTab(null);
    } else {
      setLoginError('Sandi salah! Gunakan sandi yang benar.');
    }
  };

  const handleCreateOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleString(),
      ...orderData
    };
    
    setOrders([newOrder, ...orders]);
    
    if (orderData.total > 0) {
      setTransactions([{
        id: `TRX-${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toLocaleDateString(),
        hijriMonth: 'Rabiul Awal',
        quarter: 'Triwulan I (Q1)',
        type: 'IN',
        category: 'PENJUALAN',
        amount: orderData.total,
        note: `Pendapatan: ${newOrder.id} - ${orderData.type}`
      }, ...transactions]);

      speakNotification("Pemberitahuan: Pesanan masuk. Mohon segera diproses demi kemaslahatan umat.");
      setTimeout(() => {
        speakNotification("Pemberitahuan: Transaksi berhasil. Saldo berkurang, pahala bertambah karena ikut memakmurkan ekonomi pondok.");
      }, 5000);
    } else {
      speakNotification("Pemberitahuan: Pesanan masuk. Mohon segera diproses demi kemaslahatan umat.");
    }

    setCurrentReceiptData(newOrder);
    setShowReceiptModal(true);
  };

  const downloadReceiptImage = () => {
    const receiptElement = receiptRef.current;
    if (!receiptElement) return;

    if (window.html2canvas) {
      window.html2canvas(receiptElement, { backgroundColor: '#FDFBF7', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `Nota-${currentReceiptData.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(err => {
        console.error(err);
        window.print();
      });
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E5E7EB] font-['Inter',sans-serif] flex flex-col md:flex-row overflow-hidden print:bg-[#FDFBF7] print:text-black print:h-auto print:block relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 no-print">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob"></div>
        <div className="absolute top-[40%] right-[-10%] w-[30%] h-[50%] bg-[#AA821C] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          ::-webkit-scrollbar { width: 8px; height: 8px; }
          ::-webkit-scrollbar-track { background: #050505; }
          ::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 4px; }
          
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 10s infinite alternate; }
          .animation-delay-2000 { animation-delay: 2s; }

          .menu-card-3d:hover {
            transform: perspective(1000px) translateZ(10px) translateY(-5px);
            box-shadow: 0 15px 35px rgba(212, 175, 55, 0.15);
          }
          
          @media print {
            .no-print { display: none !important; }
            body { background-color: #FDFBF7 !important; }
            .print-container { display: block !important; width: 100% !important; position: absolute; top: 0; left: 0; background: #FDFBF7; color: #2C2416; }
          }
        `}
      </style>

      {showReceiptModal && currentReceiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto no-print">
          <div className="bg-[#141414] border-2 border-[#D4AF37] p-6 rounded-2xl max-w-lg w-full shadow-[0_0_50px_rgba(212,175,55,0.3)] relative max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#D4AF37]/20">
              <h3 className="text-xl font-serif font-bold text-[#D4AF37]">Nota / Struk Pemesanan</h3>
              <button onClick={() => setShowReceiptModal(false)} className="text-[#9CA3AF] hover:text-[#D4AF37]"><X size={20}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-6 pr-1" ref={receiptRef}>
              <Receipt data={currentReceiptData} />
            </div>

            <div className="flex gap-3 pt-3 border-t border-[#D4AF37]/20">
              <button onClick={() => window.print()} className={`${btnClass} flex-1 flex items-center justify-center gap-2`}>
                <Printer size={16} /> Print Struk
              </button>
              <button onClick={downloadReceiptImage} className="px-5 py-3 bg-[#1A1A1A] border border-[#D4AF37]/40 text-[#D4AF37] font-bold text-sm rounded-md hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2">
                <Download size={16} /> Download
              </button>
              <button onClick={() => setShowReceiptModal(false)} className="px-4 py-3 bg-[#1A1A1A] text-[#9CA3AF] font-bold text-sm rounded-md hover:text-[#D4AF37] transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 no-print">
          <div className="bg-[#141414] border-2 border-[#D4AF37] p-8 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(212,175,55,0.3)] relative">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#D4AF37]"><X size={20}/></button>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                <Lock size={24} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#D4AF37]">Autentikasi Staf</h3>
              <p className="text-xs text-[#9CA3AF] mt-1">Masukkan sandi untuk mengakses Kasir & Dasbor Admin</p>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input 
                  type="password" 
                  autoFocus
                  required
                  placeholder="Masukkan sandi..." 
                  value={loginPassword} 
                  onChange={e => setLoginPassword(e.target.value)} 
                  className={inputClass}
                />
              </div>
              {loginError && <p className="text-xs text-red-500 font-medium text-center">{loginError}</p>}
              <button type="submit" className={`${btnClass} w-full`}>Masuk Sistem</button>
            </form>
          </div>
        </div>
      )}

      <nav className="no-print w-full md:w-64 bg-[#0A0A0A]/80 backdrop-blur-xl border-r border-[#D4AF37]/20 p-8 flex flex-col gap-4 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.8)] relative">
        <div className="mb-10 text-center md:text-left relative">
          <div className="absolute -left-4 top-2 w-1 h-12 bg-[#D4AF37] rounded-r-md hidden md:block shadow-[0_0_10px_#D4AF37]"></div>
          <h1 className="text-4xl font-serif font-bold tracking-tight text-[#D4AF37] leading-none mb-1 drop-shadow-[0_2px_4px_rgba(212,175,55,0.3)]">La-Tansa</h1>
          <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-[#9CA3AF]">Cafe & Resto</h2>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { id: 'online', icon: ShoppingBag, label: 'Pemesanan' },
            { id: 'kasir', icon: Coffee, label: 'Kasir POS (Protected)' },
            { id: 'admin', icon: LayoutDashboard, label: 'Dasbor Admin (Protected)' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-3 p-3 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === tab.id ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38B22] text-[#050505] shadow-[0_0_20px_rgba(212,175,55,0.3)] translate-x-2' : 'text-[#9CA3AF] hover:text-[#D4AF37] hover:bg-[#141414] hover:translate-x-1'}`}
            >
              <tab.icon size={18} /> {tab.label} {tab.id !== 'online' && !isStaffLoggedIn && <Lock size={12} className="ml-auto opacity-60" />}
            </button>
          ))}
        </div>

        {isStaffLoggedIn && (
          <div className="mt-auto pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Mode Staf Aktif</span>
            <button onClick={() => { setIsStaffLoggedIn(false); setActiveTab('online'); }} className="text-red-400 hover:underline">Keluar</button>
          </div>
        )}
      </nav>

      <main className="no-print flex-1 h-screen overflow-y-auto p-6 md:p-10 z-10 relative scroll-smooth">
        {activeTab === 'online' && <OnlineOrdering menuItems={menuItems} specialMenus={specialMenus} packages={packages} onCreateOrder={handleCreateOrder} customQrisImage={customQrisImage} btnClass={btnClass} inputClass={inputClass} cardClass={cardClass} />}
        {activeTab === 'kasir' && <POSKasir menuItems={menuItems} onCreateOrder={handleCreateOrder} btnClass={btnClass} cardClass={cardClass} />}
        {activeTab === 'admin' && <AdminDashboard orders={orders} transactions={transactions} setTransactions={setTransactions} menuItems={menuItems} setMenuItems={setMenuItems} specialMenus={specialMenus} setSpecialMenus={setSpecialMenus} packages={packages} setPackages={setPackages} customQrisImage={customQrisImage} setCustomQrisImage={setCustomQrisImage} btnClass={btnClass} inputClass={inputClass} onViewReceipt={(order) => { setCurrentReceiptData(order); setShowReceiptModal(true); }} />}
      </main>

      <div className="hidden print:block print-container">
         {currentReceiptData && <Receipt data={currentReceiptData} />}
      </div>
    </div>
  );
}

function OnlineOrdering({ menuItems, specialMenus, packages, onCreateOrder, customQrisImage, btnClass, inputClass, cardClass }) {
  const [orderType, setOrderType] = useState('santri');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cart, setCart] = useState([]);
  const [qrisProof, setQrisProof] = useState(null);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState(false);
  
  const [santriForm, setSantriForm] = useState({ 
    namaPemesan: '', 
    namaSantri: '', 
    kelas: '', 
    asrama: '', 
    pilihanNasi: 'Nasi Biasa', 
    waktu: '', 
    catatan: '', 
    selectedPackage: null 
  });
  
  const [ifthorForm, setIfthorForm] = useState({ 
    wali: '', 
    kelas: '', 
    pilihanNasiIfthor: 'Nasi Biasa', 
    hariTanggal: '', 
    catatan: '' 
  });

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeOne = (id) => {
    const existing = cart.find(c => c.id === id);
    if (existing && existing.qty > 1) {
      setCart(cart.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c));
    } else {
      setCart(cart.filter(c => c.id !== id));
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(c => c.id !== id));
  
  const packageTotal = santriForm.selectedPackage ? santriForm.selectedPackage.price : 0;
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalCart = packageTotal + cartTotal;

  const cartDetails = [
    santriForm.selectedPackage ? `*Paket:* ${santriForm.selectedPackage.name} - Rp ${santriForm.selectedPackage.price.toLocaleString('id-ID')} (${santriForm.selectedPackage.description})` : '',
    ...cart.map(c => `${c.name} (${c.qty}x) - Rp ${(c.price * c.qty).toLocaleString('id-ID')}`)
  ].filter(Boolean).join('\n');

  const isSubmitDisabled = (orderType === 'santri' && cart.length === 0 && !santriForm.selectedPackage) || (orderType === 'ifthor' && cart.length === 0);

  const handleSantriSubmit = (e) => {
    e.preventDefault();
    if (isSubmitDisabled) return; 
    const orderData = {
      type: 'Pemesanan Santri',
      customer: `Pemesan (Wali): ${santriForm.namaPemesan}\nPenerima (Santri): ${santriForm.namaSantri}`,
      details: `Kelas: ${santriForm.kelas} | Asrama: ${santriForm.asrama}\nPilihan Nasi: ${santriForm.pilihanNasi}\n\nRincian Pesanan:\n${cartDetails}\n\nWaktu Pengambilan: ${santriForm.waktu}\nCatatan Tambahan: ${santriForm.catatan || '-'}`,
      payment: paymentMethod,
      total: totalCart
    };
    onCreateOrder(orderData);
    setOrderSuccessMsg(true);
    const tempId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    const waUrl = generateWaLink({ id: tempId, date: new Date().toLocaleString(), ...orderData });
    window.open(waUrl, '_blank');
  };

  const handleIfthorSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return; 
    const orderData = {
      type: 'Pemesanan Ifthor Jama\'i',
      customer: `Wali Kelas (Pemesan): ${ifthorForm.wali}`,
      details: `Kelas yang Ifthor: ${ifthorForm.kelas}\nPilihan Nasi: ${ifthorForm.pilihanNasiIfthor}\n\nRincian Menu:\n${cartDetails}\n\nHari & Tanggal: ${ifthorForm.hariTanggal}\nCatatan Tambahan: ${ifthorForm.catatan || '-'}`,
      payment: paymentMethod,
      total: totalCart
    };
    onCreateOrder(orderData);
    setOrderSuccessMsg(true);
    const tempId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    const waUrl = generateWaLink({ id: tempId, date: new Date().toLocaleString(), ...orderData });
    window.open(waUrl, '_blank');
  };

  const handleQrisUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setQrisProof(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const menuByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto py-2 flex flex-col xl:flex-row gap-8 relative z-10">
      <div className="flex-[1.6] h-fit">
        <div className="bg-[#141414]/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl p-6 shadow-xl sticky top-0">
          <div className="text-center mb-6 border-b border-[#D4AF37]/20 pb-4">
            <h2 className="text-2xl font-serif font-bold text-[#D4AF37]">Menu La-Tansa</h2>
            <p className="text-xs text-[#9CA3AF] mt-1">Pilih hidangan dengan menyentuh tanda +</p>
          </div>
          
          <div className="space-y-8 max-h-[650px] overflow-y-auto pr-2">
            <div className="space-y-4 mb-6">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                <div className="w-4 h-px bg-[#D4AF37]/50"></div> Menu Spesial Pilihan <div className="flex-1 h-px bg-[#D4AF37]/20"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialMenus.map((sp, idx) => (
                  <div key={sp.id || idx} className="relative rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)] group bg-[#1A1A1A] flex flex-col justify-between">
                    <div>
                      <div className="absolute top-3 right-3 z-20 bg-[#D4AF37] text-[#050505] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest shadow-lg">Spesial #{idx+1}</div>
                      <div className="h-32 overflow-hidden relative">
                        <img src={getImgUrl(sp)} alt={sp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"></div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-serif font-bold text-lg text-[#D4AF37] mb-1 line-clamp-1">{sp.name}</h4>
                        <p className="text-xs text-[#9CA3AF] line-clamp-2 mb-3">{sp.description}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 flex items-center justify-between">
                      <span className="font-bold text-[#D4AF37]">Rp {sp.price.toLocaleString('id-ID')}</span>
                      {cart.find(c => c.id === sp.id) ? (
                        <div className="flex items-center justify-between bg-[#0A0A0A] border border-[#D4AF37] rounded-md p-1 shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                          <button type="button" onClick={() => removeOne(sp.id)} className="w-7 h-7 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded transition-colors"><Minus size={14}/></button>
                          <span className="text-xs font-bold text-[#E5E7EB] w-5 text-center">{cart.find(c => c.id === sp.id).qty}</span>
                          <button type="button" onClick={() => addToCart(sp)} className="w-7 h-7 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded transition-colors"><Plus size={14}/></button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => addToCart(sp)} className="px-4 py-1.5 bg-[#D4AF37] text-[#050505] font-bold text-xs rounded-md hover:bg-[#E3C365] transition-all shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                          + Pesan
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                <div className="w-4 h-px bg-[#D4AF37]/50"></div> Paket Santri Cepat (Pilih Salah Satu) <div className="flex-1 h-px bg-[#D4AF37]/20"></div>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {packages.map(pkg => {
                  const isSelected = santriForm.selectedPackage?.id === pkg.id;
                  return (
                    <div 
                      key={pkg.id}
                      onClick={() => setSantriForm({...santriForm, selectedPackage: isSelected ? null : pkg})}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex gap-3 items-center ${isSelected ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#141414] border-[#D4AF37]/20 hover:border-[#D4AF37]/50'}`}
                    >
                      <img src={getImgUrl(pkg)} alt={pkg.name} className="w-14 h-14 rounded-lg object-cover border border-[#D4AF37]/30 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="font-bold text-sm text-[#E5E7EB]">{pkg.name}</span>
                          <span className="text-xs font-bold text-[#D4AF37]">Rp {pkg.price.toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-[11px] text-[#9CA3AF] line-clamp-2 leading-tight">{pkg.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {santriForm.selectedPackage && (
                <button type="button" onClick={() => setSantriForm({...santriForm, selectedPackage: null})} className="text-xs text-red-400 underline mt-1 block">Batalkan pilihan paket</button>
              )}
            </div>

            {Object.entries(menuByCategory).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className="w-4 h-px bg-[#D4AF37]/50"></div> {category} <div className="flex-1 h-px bg-[#D4AF37]/20"></div>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {items.map(item => {
                    const qtyInCart = cart.find(c => c.id === item.id)?.qty || 0;
                    const isAvail = item.isAvailable !== false;
                    return (
                      <div 
                        key={item.id} 
                        className={`menu-card-3d bg-[#1A1A1A] rounded-xl overflow-hidden border transition-all duration-300 flex flex-col h-full relative ${qtyInCart > 0 ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]' : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/60'} ${!isAvail ? 'opacity-60 grayscale' : ''}`}
                      >
                        {!isAvail && (
                          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                            <span className="text-red-500 font-bold text-xl tracking-widest border-2 border-red-500 px-3 py-1 rounded transform -rotate-12 bg-black/80">HABIS</span>
                          </div>
                        )}
                        <div className="h-16 overflow-hidden bg-[#0A0A0A] relative">
                          <img src={getImgUrl(item)} alt={item.name} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                          {qtyInCart > 0 && (
                            <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#050505] text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                              {qtyInCart} di keranjang
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#1A1A1A] to-[#111111]">
                          <div>
                            <span className="text-xs font-bold text-[#E5E7EB] block mb-0.5 leading-tight">{item.name}</span>
                            <span className="text-[11px] font-bold text-[#D4AF37] block mb-3">Rp {item.price.toLocaleString('id-ID')}</span>
                          </div>
                          
                          <div className="mt-auto relative z-30">
                            {qtyInCart > 0 ? (
                              <div className="flex items-center justify-between bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-md p-0.5">
                                <button type="button" onClick={() => removeOne(item.id)} className="w-7 h-7 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded transition-colors"><Minus size={14}/></button>
                                <span className="text-xs font-bold text-[#E5E7EB] w-4 text-center">{qtyInCart}</span>
                                <button type="button" disabled={!isAvail} onClick={() => addToCart(item)} className={`w-7 h-7 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded transition-colors ${!isAvail ? 'opacity-50 cursor-not-allowed' : ''}`}><Plus size={14}/></button>
                              </div>
                            ) : (
                              <button type="button" disabled={!isAvail} onClick={() => addToCart(item)} className={`w-full py-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#141414] text-[#D4AF37] border border-[#D4AF37]/30 rounded-md transition-colors shadow-sm ${!isAvail ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#D4AF37] hover:text-[#050505]'}`}>
                                + Tambah
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-[1.2]">
        <div className="mb-6 flex justify-center gap-2 p-1.5 bg-[#111111]/80 backdrop-blur-sm border border-[#D4AF37]/20 rounded-lg w-fit mx-auto shadow-lg relative z-10">
          <button 
            onClick={() => setOrderType('santri')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-300 ${orderType === 'santri' ? 'bg-[#D4AF37] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.4)] transform scale-105' : 'text-[#9CA3AF] hover:text-[#D4AF37]'}`}
          >
            Pemesanan Santri
          </button>
          <button 
            onClick={() => setOrderType('ifthor')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-300 ${orderType === 'ifthor' ? 'bg-[#D4AF37] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.4)] transform scale-105' : 'text-[#9CA3AF] hover:text-[#D4AF37]'}`}
          >
            Ifthor Jama'i
          </button>
        </div>

        <div className={cardClass}>
          <div className="text-center mb-8 relative">
            <h2 className="text-3xl font-serif font-bold text-[#D4AF37] mb-2 drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
              {orderType === 'santri' ? 'Formulir Santri' : 'Formulir Ifthor'}
            </h2>
            <p className="text-sm text-[#9CA3AF]">Silakan isi detail pesanan Anda dengan lengkap.</p>
          </div>

          {orderType === 'santri' && (
            <div className="bg-[#1a1500]/50 border border-[#D4AF37]/50 text-[#D4AF37] p-4 rounded-md mb-8 text-sm flex items-start gap-3 shadow-inner backdrop-blur-sm">
              <span className="text-lg animate-pulse">⚠️</span>
              <p className="font-medium leading-relaxed">Perhatian: Layanan pemesanan ditutup secara otomatis pada hari Senin malam dan Kamis malam.</p>
            </div>
          )}

          {orderSuccessMsg && (
            <div className="bg-[#10B981]/20 border border-[#10B981] text-[#10B981] p-4 rounded-md mb-6 text-sm flex items-center gap-3">
              <CheckCircle2 size={22} className="shrink-0" />
              <p className="font-bold">Pesanan berhasil! WhatsApp admin terbuka dan pesanan telah terdaftar.</p>
            </div>
          )}

          <form onSubmit={orderType === 'santri' ? handleSantriSubmit : handleIfthorSubmit} className="space-y-5 relative z-10">
            {orderType === 'santri' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Nama Pemesan (Wali)</label>
                    <input required value={santriForm.namaPemesan} onChange={e=>setSantriForm({...santriForm, namaPemesan: e.target.value})} className={inputClass} type="text" placeholder="Nama Anda..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Nama Penerima (Santri)</label>
                    <input required value={santriForm.namaSantri} onChange={e=>setSantriForm({...santriForm, namaSantri: e.target.value})} className={inputClass} type="text" placeholder="Nama Santri..." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Kelas</label>
                    <input required value={santriForm.kelas} onChange={e=>setSantriForm({...santriForm, kelas: e.target.value})} className={inputClass} type="text" placeholder="Misal: XII-A" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Asrama</label>
                    <input required value={santriForm.asrama} onChange={e=>setSantriForm({...santriForm, asrama: e.target.value})} className={inputClass} type="text" placeholder="Nama asrama..." />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Pilihan Nasi</label>
                  <select value={santriForm.pilihanNasi} onChange={e=>setSantriForm({...santriForm, pilihanNasi: e.target.value})} className={inputClass}>
                    <option value="Nasi Biasa">Nasi Biasa</option>
                    <option value="Nasi Kuning">Nasi Kuning</option>
                    <option value="Nasi Daun Jeruk">Nasi Daun Jeruk</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Waktu Pengambilan</label>
                  <input required value={santriForm.waktu} onChange={e=>setSantriForm({...santriForm, waktu: e.target.value})} className={inputClass} type="text" placeholder="Misal: Pukul 16:00 (Ba'da Ashar)" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Pesan Tambahan (Opsional)</label>
                  <textarea value={santriForm.catatan} onChange={e=>setSantriForm({...santriForm, catatan: e.target.value})} className={inputClass} rows="2" placeholder="Contoh: Tolong dibungkus rapi, sambal dipisah..."></textarea>
                </div>
              </>
            )}

            {orderType === 'ifthor' && (
              <>
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Nama Wali Kelas (Pemesan)</label>
                  <input required value={ifthorForm.wali} onChange={e=>setIfthorForm({...ifthorForm, wali: e.target.value})} className={inputClass} type="text" placeholder="Masukkan nama Anda..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Kelas (Peserta Ifthor)</label>
                    <input required value={ifthorForm.kelas} onChange={e=>setIfthorForm({...ifthorForm, kelas: e.target.value})} className={inputClass} type="text" placeholder="Misal: Kelas X-B" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Hari & Tanggal Pelaksanaan</label>
                    <input required value={ifthorForm.hariTanggal} onChange={e=>setIfthorForm({...ifthorForm, hariTanggal: e.target.value})} className={inputClass} type="text" placeholder="Misal: Senin, 15 Okt 2024" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Pilihan Nasi (Ifthor Jama'i)</label>
                  <select value={ifthorForm.pilihanNasiIfthor} onChange={e=>setIfthorForm({...ifthorForm, pilihanNasiIfthor: e.target.value})} className={inputClass}>
                    <option value="Nasi Biasa">Nasi Biasa</option>
                    <option value="Nasi Kuning">Nasi Kuning</option>
                    <option value="Nasi Daun Jeruk">Nasi Daun Jeruk</option>
                    <option value="Tanpa Nasi (Lauk Saja)">Tanpa Nasi (Lauk Saja)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 block">Pesan Tambahan (Opsional)</label>
                  <textarea value={ifthorForm.catatan} onChange={e=>setIfthorForm({...ifthorForm, catatan: e.target.value})} className={inputClass} rows="2" placeholder="Contoh: Mohon dikirim tepat waktu..."></textarea>
                </div>
              </>
            )}

            <div className="mt-6 bg-[#0A0A0A]/50 border border-[#D4AF37]/30 rounded-lg p-5 shadow-inner">
              <h3 className="text-sm font-bold text-[#D4AF37] mb-3 flex items-center justify-between">
                <span>Rincian Keranjang</span>
                <span className="text-xs bg-[#D4AF37]/10 px-2 py-1 rounded text-[#D4AF37] border border-[#D4AF37]/20">Ringkasan</span>
              </h3>
              
              {orderType === 'santri' && santriForm.selectedPackage && (
                <div className="flex justify-between items-center text-sm border-b border-[#D4AF37]/10 pb-2 mb-2">
                  <div>
                    <p className="text-[#E5E7EB] font-bold">{santriForm.selectedPackage.name} (Paket)</p>
                    <p className="text-[#D4AF37]/70 text-[10px]">{santriForm.selectedPackage.description}</p>
                  </div>
                  <span className="font-bold text-[#D4AF37]">Rp {santriForm.selectedPackage.price.toLocaleString('id-ID')}</span>
                </div>
              )}

              {cart.length === 0 && (!santriForm.selectedPackage || orderType === 'ifthor') ? (
                <div className="text-center py-6 text-xs text-[#9CA3AF]/60 italic">
                  Belum ada menu satuan atau paket yang dipilih.
                </div>
              ) : (
                <div className="space-y-3 mb-4 max-h-[180px] overflow-y-auto pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm border-b border-[#D4AF37]/10 pb-2">
                      <div className="flex-1">
                        <p className="text-[#E5E7EB] font-medium">{item.name}</p>
                        <p className="text-[#D4AF37]/70 text-[10px]">{item.qty} porsi x Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-[#D4AF37]">Rp {(item.qty * item.price).toLocaleString('id-ID')}</span>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="text-[#9CA3AF] hover:text-[#EF4444] transition-transform hover:scale-110"><X size={16}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t border-[#D4AF37]/20 mt-2">
                <span className="text-sm font-bold text-[#9CA3AF] uppercase tracking-wider">Total Tagihan</span>
                <span className="text-xl font-serif font-bold text-[#D4AF37] drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">Rp {totalCart.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-[#D4AF37]/20">
              <h3 className="text-sm font-serif font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">Metode Pembayaran</h3>
              <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center transition-all ${paymentMethod === 'cash' ? 'bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-transparent'}`}>
                    {paymentMethod === 'cash' && <div className="w-2 h-2 rounded-full bg-[#050505]" />}
                  </div>
                  <input type="radio" name="payment" value="cash" className="hidden" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                  <span className="text-sm font-medium text-[#E5E7EB] group-hover:text-[#D4AF37] transition-colors">Tunai (Cash)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border border-[#D4AF37] flex items-center justify-center transition-all ${paymentMethod === 'qris' ? 'bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-transparent'}`}>
                    {paymentMethod === 'qris' && <div className="w-2 h-2 rounded-full bg-[#050505]" />}
                  </div>
                  <input type="radio" name="payment" value="qris" className="hidden" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} />
                  <span className="text-sm font-medium text-[#E5E7EB] group-hover:text-[#D4AF37] transition-colors">Digital (QRIS)</span>
                </label>
              </div>

              {paymentMethod === 'qris' && (
                <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#D4AF37]/30 flex flex-col items-center text-center gap-4 transition-all shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-5 rounded-full filter blur-[30px] pointer-events-none"></div>
                  
                  {customQrisImage ? (
                    <div className="bg-white p-3 rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.2)] border-2 border-[#D4AF37] w-48 h-48 flex items-center justify-center overflow-hidden">
                      <img src={customQrisImage} alt="QRIS La-Tansa" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="bg-white p-3 rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.2)] border-2 border-[#D4AF37]">
                      <QrCode size={120} strokeWidth={1.2} className="text-[#050505]" />
                    </div>
                  )}

                  <div className="space-y-1 relative z-10">
                    <p className="font-bold text-sm text-[#D4AF37]">Pindai QRIS La-Tansa Cafe</p>
                    <p className="text-xs text-[#9CA3AF]">Selesaikan pembayaran lalu unggah struk/bukti transfer.</p>
                  </div>
                  
                  {qrisProof ? (
                    <div className="w-full mt-3 relative z-10 flex flex-col items-center gap-3">
                      <div className="w-full h-40 rounded-md overflow-hidden border border-[#D4AF37]/50 relative">
                        <img src={qrisProof} alt="Bukti QRIS" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setQrisProof(null)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md shadow-md hover:bg-red-600 transition-colors"><X size={14}/></button>
                      </div>
                      <p className="text-xs text-[#10B981] font-bold">Bukti digital berhasil dilampirkan</p>
                    </div>
                  ) : (
                    <div className="w-full mt-3 relative z-10">
                      <div className="relative group">
                        <input type="file" accept="image/*" required onChange={handleQrisUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        <div className="w-full border-2 border-[#D4AF37]/40 border-dashed bg-[#141414] rounded-md p-4 flex flex-col items-center justify-center gap-2 text-sm text-[#9CA3AF] group-hover:bg-[#1A1A1A] group-hover:border-[#D4AF37] transition-all group-hover:shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                          <Upload size={20} className="text-[#D4AF37]" /> 
                          <span className="font-medium">Pilih Dokumen Bukti (Klik/Tap)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button type="submit" disabled={isSubmitDisabled} className={`${btnClass} w-full mt-6 flex items-center justify-center gap-3 text-base ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Kirim ke WhatsApp & Cetak Struk <MessageCircle size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function POSKasir({ menuItems, onCreateOrder, btnClass, cardClass }) {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('Semua');

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
    else setCart([...cart, { ...item, qty: 1 }]);
  };

  const removeOne = (id) => {
    const existing = cart.find(c => c.id === id);
    if (existing && existing.qty > 1) {
      setCart(cart.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c));
    } else {
      setCart(cart.filter(c => c.id !== id));
    }
  };

  const removeFromCart = (id) => setCart(cart.filter(c => c.id !== id));
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleCheckout = (method) => {
    if (cart.length === 0) return;
    const details = cart.map(c => `${c.name} (${c.qty}x)`).join('\n');
    onCreateOrder({
      type: 'Transaksi Outlet Kasir',
      customer: 'Pelanggan Walk-in',
      details: details,
      payment: method,
      total: total
    });
    setCart([]); 
  };

  const categories = ['Semua', ...new Set(menuItems.map(m => m.category))];
  const filteredMenu = filter === 'Semua' ? menuItems : menuItems.filter(m => m.category === filter);

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full relative z-10">
      <div className="flex-1 overflow-y-auto pr-2 pb-8">
        <div className="mb-6 overflow-x-auto pb-2 flex gap-2">
          {categories.map(cat => (
             <button 
                key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 ${filter === cat ? 'bg-[#D4AF37] text-[#050505] shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'bg-[#141414]/80 text-[#9CA3AF] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}
             >
               {cat}
             </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMenu.map(item => {
            const isAvail = item.isAvailable !== false;
            const qtyInCart = cart.find(c => c.id === item.id)?.qty || 0;
            return (
              <div 
                key={item.id} 
                className={`menu-card-3d bg-[#141414]/90 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 flex flex-col group relative ${qtyInCart > 0 ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]' : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/80'} ${!isAvail ? 'opacity-60 grayscale' : ''}`}
              >
                {!isAvail && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                    <span className="text-red-500 font-bold text-xl tracking-widest border-2 border-red-500 px-2 py-1 rounded transform -rotate-12 bg-black/80">HABIS</span>
                  </div>
                )}
                {qtyInCart > 0 && (
                  <div className="absolute top-2 right-2 z-20 bg-[#D4AF37] text-[#050505] text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                    {qtyInCart}x
                  </div>
                )}
                <div className="h-28 overflow-hidden bg-[#0A0A0A] relative">
                 <img src={getImgUrl(item)} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" />
                 <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#141414] to-transparent">
                   <div className="text-[9px] font-medium uppercase tracking-widest text-[#D4AF37]">{item.category}</div>
                 </div>
              </div>
              <div className="p-3 flex flex-col justify-between flex-1 relative z-10">
                <div className="font-bold text-sm text-[#E5E7EB] mb-2 leading-tight">{item.name}</div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-sm text-[#D4AF37]">
                    Rp {item.price.toLocaleString('id-ID')}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    {qtyInCart > 0 && (
                      <button 
                        onClick={() => removeOne(item.id)}
                        className="w-7 h-7 bg-[#0A0A0A] border border-[#D4AF37]/40 text-[#D4AF37] rounded flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                        title="Kurangi"
                      >
                        <Minus size={12} />
                      </button>
                    )}
                    <button 
                      disabled={!isAvail}
                      onClick={() => addToCart(item)}
                      className={`w-8 h-8 bg-[#D4AF37] text-[#050505] rounded flex items-center justify-center font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)] hover:bg-[#E3C365] transition-transform active:scale-95 ${!isAvail ? 'opacity-50 cursor-not-allowed' : ''}`}
                      title="Tambah"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div className={`${cardClass} w-full lg:w-[350px] flex flex-col sticky top-0 h-fit max-h-[85vh]`}>
        <h3 className="font-serif font-bold text-xl text-[#D4AF37] border-b border-[#D4AF37]/20 pb-4 mb-4 flex items-center justify-between">
          <span>Pesanan Outlet</span>
          <ShoppingBag size={20} className="text-[#D4AF37]" />
        </h3>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 min-h-[250px] pr-2">
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-[#9CA3AF]/50">
              <ShoppingBag size={48} className="mb-4 opacity-30" />
              <p className="font-medium text-sm text-center">Keranjang masih kosong.</p>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center bg-[#1A1A1A]/80 rounded-lg p-3 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-colors">
              <div className="flex-1 text-sm overflow-hidden mr-2">
                <div className="font-bold text-[#E5E7EB] truncate">{item.name}</div>
                <div className="text-xs text-[#D4AF37]/80 mt-0.5">
                  {item.qty} x Rp {item.price.toLocaleString('id-ID')}
                </div>
              </div>
              <div className="font-bold text-sm text-[#D4AF37] pr-2">
                {(item.qty * item.price).toLocaleString('id-ID')}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => removeOne(item.id)} className="text-[#9CA3AF] p-1 hover:text-[#D4AF37] bg-[#0A0A0A] rounded transition-colors border border-[#D4AF37]/20"><Minus size={12}/></button>
                <button onClick={() => addToCart(item)} className="text-[#D4AF37] p-1 hover:bg-[#D4AF37]/20 bg-[#0A0A0A] rounded transition-colors border border-[#D4AF37]/20"><Plus size={12}/></button>
                <button onClick={() => removeFromCart(item.id)} className="text-[#9CA3AF] p-1 hover:text-[#EF4444] bg-[#0A0A0A] rounded transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#D4AF37]/20 pt-5 mt-auto">
          <div className="flex justify-between font-bold text-lg mb-5 text-[#D4AF37]">
            <span className="font-serif tracking-wide">Total</span>
            <span className="drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              disabled={cart.length === 0}
              onClick={() => handleCheckout('cash')}
              className={`${btnClass} !from-[#1A1A1A] !to-[#1A1A1A] !text-[#D4AF37] border border-[#D4AF37]/50 hover:!from-[#D4AF37]/10 hover:!to-[#D4AF37]/10 shadow-none hover:shadow-[0_0_10px_rgba(212,175,55,0.2)]`}
            >
              Tunai
            </button>
            <button 
              disabled={cart.length === 0}
              onClick={() => handleCheckout('qris')}
              className={btnClass}
            >
              QRIS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ orders, transactions, setTransactions, menuItems, setMenuItems, specialMenus, setSpecialMenus, packages, setPackages, customQrisImage, setCustomQrisImage, btnClass, inputClass, onViewReceipt }) {
  const [adminTab, setAdminTab] = useState('riwayat');
  const [newMenu, setNewMenu] = useState({ name: '', price: '', category: 'Ayam', image: '', isAvailable: true });
  const [editId, setEditId] = useState(null);
  
  const [editingSpecial, setEditingSpecial] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);

  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: 'BAHAN_BAKU',
    hijriMonth: 'Rabiul Awal',
    quarter: 'Triwulan I (Q1)',
    note: ''
  });

  const [savingForm, setSavingForm] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    hijriMonth: 'Rabiul Awal',
    quarter: 'Triwulan I (Q1)',
    note: ''
  });

  const [hppForm, setHppForm] = useState({
    bahanBakuTotal: '',
    overhead: '',
    jumlahProduksi: ''
  });
  const [calculatedHpp, setCalculatedHpp] = useState(null);

  const handleAddMenu = (e) => {
    e.preventDefault();
    if (!newMenu.name || !newMenu.price) return;
    
    if (editId) {
      setMenuItems(menuItems.map(m => m.id === editId ? { ...m, name: newMenu.name, price: parseInt(newMenu.price), category: newMenu.category, image: newMenu.image, isAvailable: newMenu.isAvailable } : m));
      setEditId(null);
    } else {
      setMenuItems([...menuItems, { id: Date.now(), name: newMenu.name, price: parseInt(newMenu.price), category: newMenu.category, image: newMenu.image, isAvailable: newMenu.isAvailable }]);
    }
    setNewMenu({ name: '', price: '', category: 'Ayam', image: '', isAvailable: true });
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setNewMenu({ name: item.name, price: item.price, category: item.category, image: item.image || '', isAvailable: item.isAvailable !== false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMenu({ ...newMenu, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setNewMenu({ name: '', price: '', category: 'Ayam', image: '', isAvailable: true });
  };

  const removeMenu = (id) => setMenuItems(menuItems.filter(m => m.id !== id));
  
  const toggleAvailability = (id) => {
    setMenuItems(menuItems.map(m => m.id === id ? { ...m, isAvailable: m.isAvailable === false ? true : false } : m));
  };

  const handleSaveSpecial = (e) => {
    e.preventDefault();
    setSpecialMenus(specialMenus.map(s => s.id === editingSpecial.id ? editingSpecial : s));
    setEditingSpecial(null);
  };

  const handleSpecialImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditingSpecial({ ...editingSpecial, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSavePackage = (e) => {
    e.preventDefault();
    setPackages(packages.map(p => p.id === editingPackage.id ? editingPackage : p));
    setEditingPackage(null);
  };

  const handlePackageImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditingPackage({ ...editingPackage, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAdminQrisUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCustomQrisImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseForm.amount || !expenseForm.note) return;

    const newTrx = {
      id: `TRX-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleDateString(),
      hijriMonth: expenseForm.hijriMonth,
      quarter: expenseForm.quarter,
      type: 'OUT',
      category: expenseForm.category,
      amount: parseInt(expenseForm.amount),
      note: expenseForm.note
    };

    setTransactions([newTrx, ...transactions]);
    setExpenseForm({ amount: '', category: 'BAHAN_BAKU', hijriMonth: 'Rabiul Awal', quarter: 'Triwulan I (Q1)', note: '' });
  };

  const handleAddSaving = (e) => {
    e.preventDefault();
    if (!savingForm.amount) return;

    const formattedDate = savingForm.date ? new Date(savingForm.date).toLocaleDateString() : new Date().toLocaleDateString();

    const newTrx = {
      id: `TRX-${Math.floor(Math.random() * 1000000)}`,
      date: formattedDate,
      hijriMonth: savingForm.hijriMonth,
      quarter: savingForm.quarter,
      type: 'SAVING',
      category: 'TABUNGAN_REKENING',
      amount: parseInt(savingForm.amount),
      note: savingForm.note ? `Tabungan Harian: ${savingForm.note}` : 'Setoran Tabungan Harian ke Rekening Toko'
    };

    setTransactions([newTrx, ...transactions]);
    setSavingForm({ amount: '', date: new Date().toISOString().split('T')[0], hijriMonth: 'Rabiul Awal', quarter: 'Triwulan I (Q1)', note: '' });
  };

  const calculateHpp = (e) => {
    e.preventDefault();
    const bahan = parseFloat(hppForm.bahanBakuTotal) || 0;
    const overhead = parseFloat(hppForm.overhead) || 0;
    const qty = parseFloat(hppForm.jumlahProduksi) || 1;

    const totalBiaya = bahan + overhead;
    const hppPerPorsi = totalBiaya / qty;
    setCalculatedHpp(hppPerPorsi);
  };

  const totalMasuk = transactions.filter(t => t.type === 'IN').reduce((sum, t) => sum + t.amount, 0);
  const totalKeluar = transactions.filter(t => t.type === 'OUT').reduce((sum, t) => sum + t.amount, 0);
  const totalTabungan = transactions.filter(t => t.type === 'SAVING').reduce((sum, t) => sum + t.amount, 0);
  const saldoBersih = totalMasuk - totalKeluar - totalTabungan;

  return (
    <div className="max-w-6xl mx-auto py-4 relative z-10">
      <div className="flex bg-[#141414]/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-lg p-2 mb-8 shadow-sm overflow-x-auto">
        {['riwayat', 'keuangan', 'katalog'].map(tab => (
          <button 
            key={tab}
            onClick={() => setAdminTab(tab)} 
            className={`flex-1 p-3 text-sm font-bold rounded-md flex items-center justify-center gap-2 min-w-[160px] transition-all duration-300 capitalize ${adminTab === tab ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38B22] text-[#050505] shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-[#9CA3AF] hover:text-[#D4AF37] hover:bg-[#1A1A1A]'}`}
          >
            {tab === 'riwayat' && <History size={18} />}
            {tab === 'keuangan' && <Wallet size={18} />}
            {tab === 'katalog' && <BookOpen size={18} />}
            {tab === 'riwayat' ? 'Riwayat Pesanan & Nota' : tab === 'keuangan' ? 'Keuangan, Tabungan Harian & HPP' : 'Kelola Katalog, Paket & QRIS'}
          </button>
        ))}
      </div>

      {adminTab === 'riwayat' && (
        <div className="space-y-6">
          <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl shadow-lg border border-[#D4AF37]/20 overflow-hidden">
            <div className="p-6 border-b border-[#D4AF37]/20 bg-[#1A1A1A]/50 flex justify-between items-center">
               <h3 className="font-serif font-bold text-xl text-[#D4AF37]">Arsip Nota & Riwayat Pembaruan Transaksi</h3>
               <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/30 font-medium">Total: {orders.length} Transaksi</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D4AF37]/20 bg-[#0A0A0A]/50">
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">No. Ref & Waktu</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Layanan</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Pemesan & Penerima</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Rincian Pembelian</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Metode</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Total</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider text-center">Nota / Struk</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan="7" className="p-12 text-center text-sm font-medium text-[#9CA3AF]">Belum ada riwayat nota atau pesanan yang masuk.</td></tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} className="border-b border-[#D4AF37]/10 hover:bg-[#1A1A1A]/80 transition-colors align-top">
                        <td className="p-4">
                          <div className="font-bold text-sm text-[#D4AF37]">{order.id}</div>
                          <div className="text-xs text-[#9CA3AF] mt-1">{order.date}</div>
                        </td>
                        <td className="p-4 text-sm font-medium text-[#E5E7EB]">{order.type}</td>
                        <td className="p-4 text-xs text-[#E5E7EB] whitespace-pre-wrap">{order.customer}</td>
                        <td className="p-4 text-xs text-[#9CA3AF] whitespace-pre-wrap max-w-xs">{order.details}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                            {order.payment}
                          </span>
                        </td>
                        <td className="p-4 text-sm font-bold text-[#D4AF37]">Rp {order.total?.toLocaleString('id-ID')}</td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => onViewReceipt(order)}
                            className="px-3 py-1.5 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#050505] text-xs font-bold rounded transition-all inline-flex items-center gap-1.5 shadow-sm"
                          >
                            <FileText size={14} /> Lihat Nota
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {adminTab === 'keuangan' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-[#141414] to-[#0A0A0A] rounded-xl border border-[#D4AF37]/40 p-5 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">Total Pemasukan</span>
                <ArrowUpRight className="text-[#10B981]" size={18} />
              </div>
              <div className="text-xl font-serif font-bold text-[#10B981]">Rp {totalMasuk.toLocaleString('id-ID')}</div>
            </div>
            <div className="bg-gradient-to-br from-[#141414] to-[#0A0A0A] rounded-xl border border-[#D4AF37]/40 p-5 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">Pengeluaran Bahan/Alat</span>
                <ArrowDownLeft className="text-red-400" size={18} />
              </div>
              <div className="text-xl font-serif font-bold text-red-400">Rp {totalKeluar.toLocaleString('id-ID')}</div>
            </div>
            <div className="bg-gradient-to-br from-[#141414] to-[#0A0A0A] rounded-xl border border-[#D4AF37]/40 p-5 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">Akumulasi Tabungan</span>
                <Landmark className="text-[#D4AF37]" size={18} />
              </div>
              <div className="text-xl font-serif font-bold text-[#D4AF37]">Rp {totalTabungan.toLocaleString('id-ID')}</div>
            </div>
            <div className="bg-gradient-to-br from-[#141414] to-[#0A0A0A] rounded-xl border border-[#D4AF37]/40 p-5 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">Sisa Saldo Kas</span>
                <Wallet className="text-[#D4AF37]" size={18} />
              </div>
              <div className="text-xl font-serif font-bold text-[#D4AF37]">Rp {saldoBersih.toLocaleString('id-ID')}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 p-6 shadow-xl">
              <h3 className="font-serif font-bold text-lg text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3 mb-4 flex items-center gap-2">
                <ArrowDownLeft size={18} /> Catat Pengeluaran (Bahan Baku / Alat)
              </h3>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Nominal (Rp)</label>
                    <input required type="number" placeholder="Contoh: 75000" value={expenseForm.amount} onChange={e=>setExpenseForm({...expenseForm, amount: e.target.value})} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Kategori Keluar</label>
                    <select value={expenseForm.category} onChange={e=>setExpenseForm({...expenseForm, category: e.target.value})} className={inputClass}>
                      <option value="BAHAN_BAKU">Pembelian Bahan Baku</option>
                      <option value="PERALATAN">Pembelian Alat / Perlengkapan</option>
                      <option value="OPERASIONAL">Biaya Operasional Lainnya</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Bulan Hijriah</label>
                    <select value={expenseForm.hijriMonth} onChange={e=>setExpenseForm({...expenseForm, hijriMonth: e.target.value})} className={inputClass}>
                      {HIJRI_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Triwulan / Periode</label>
                    <select value={expenseForm.quarter} onChange={e=>setExpenseForm({...expenseForm, quarter: e.target.value})} className={inputClass}>
                      <option value="Triwulan I (Q1)">Triwulan I (Q1)</option>
                      <option value="Triwulan II (Q2)">Triwulan II (Q2)</option>
                      <option value="Triwulan III (Q3)">Triwulan III (Q3)</option>
                      <option value="Triwulan IV (Q4)">Triwulan IV (Q4)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Keterangan / Catatan</label>
                  <input required type="text" placeholder="Misal: Belanja 5kg beras & minyak goreng..." value={expenseForm.note} onChange={e=>setExpenseForm({...expenseForm, note: e.target.value})} className={inputClass} />
                </div>
                <button type="submit" className={`${btnClass} w-full`}>Simpan Pengeluaran</button>
              </form>
            </div>

            <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 p-6 shadow-xl">
              <h3 className="font-serif font-bold text-lg text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3 mb-4 flex items-center gap-2">
                <Landmark size={18} /> Tabung Uang Harian ke Rekening Toko
              </h3>
              <form onSubmit={handleAddSaving} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Nominal Tabungan Harian (Rp)</label>
                    <input required type="number" placeholder="Contoh: 50000" value={savingForm.amount} onChange={e=>setSavingForm({...savingForm, amount: e.target.value})} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Tanggal Tabungan</label>
                    <input required type="date" value={savingForm.date} onChange={e=>setSavingForm({...savingForm, date: e.target.value})} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Bulan Hijriah</label>
                    <select value={savingForm.hijriMonth} onChange={e=>setSavingForm({...savingForm, hijriMonth: e.target.value})} className={inputClass}>
                      {HIJRI_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Triwulan / Periode</label>
                    <select value={savingForm.quarter} onChange={e=>setSavingForm({...savingForm, quarter: e.target.value})} className={inputClass}>
                      <option value="Triwulan I (Q1)">Triwulan I (Q1)</option>
                      <option value="Triwulan II (Q2)">Triwulan II (Q2)</option>
                      <option value="Triwulan III (Q3)">Triwulan III (Q3)</option>
                      <option value="Triwulan IV (Q4)">Triwulan IV (Q4)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Keterangan / Catatan Tabungan</label>
                  <input type="text" placeholder="Misal: Tabungan hasil penjualan harian..." value={savingForm.note} onChange={e=>setSavingForm({...savingForm, note: e.target.value})} className={inputClass} />
                </div>
                <button type="submit" className={`${btnClass} w-full`}>Catat Tabungan Harian</button>
              </form>
            </div>
          </div>

          <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 p-6 shadow-xl">
            <h3 className="font-serif font-bold text-lg text-[#D4AF37] border-b border-[#D4AF37]/20 pb-3 mb-4 flex items-center gap-2">
              <Calculator size={18} /> Kalkulator Penghitungan HPP Otomatis
            </h3>
            <form onSubmit={calculateHpp} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Total Biaya Bahan Baku (Rp)</label>
                  <input required type="number" placeholder="Misal: 50000" value={hppForm.bahanBakuTotal} onChange={e=>setHppForm({...hppForm, bahanBakuTotal: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Biaya Overhead/Gas/Bumbu (Rp)</label>
                  <input type="number" placeholder="Misal: 5000" value={hppForm.overhead} onChange={e=>setHppForm({...hppForm, overhead: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Jumlah Porsi Yang Dihasilkan</label>
                  <input required type="number" placeholder="Misal: 10" value={hppForm.jumlahProduksi} onChange={e=>setHppForm({...hppForm, jumlahProduksi: e.target.value})} className={inputClass} />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-[#1A1A1A] border border-[#D4AF37] text-[#D4AF37] font-bold text-sm rounded hover:bg-[#D4AF37] hover:text-[#050505] transition-all">
                Hitung HPP Per Porsi
              </button>
              {calculatedHpp !== null && (
                <div className="p-4 bg-[#0A0A0A] border border-[#10B981] rounded text-center">
                  <p className="text-xs text-[#9CA3AF]">Estimasi Harga Pokok Produksi (HPP):</p>
                  <p className="text-xl font-serif font-bold text-[#10B981]">Rp {Math.round(calculatedHpp).toLocaleString('id-ID')} / porsi</p>
                </div>
              )}
            </form>
          </div>

          <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl shadow-lg border border-[#D4AF37]/20 overflow-hidden">
            <div className="p-6 border-b border-[#D4AF37]/20 bg-[#1A1A1A]/50 flex justify-between items-center">
              <h3 className="font-serif font-bold text-xl text-[#D4AF37]">Pencatatan Keuangan (Harian, Tabungan Harian, Bulan Hijriah & Triwulan)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D4AF37]/20 bg-[#0A0A0A]/50">
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Tanggal (Harian)</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Bulan Hijriah</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Triwulan</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Tipe & Kategori</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Keterangan</th>
                    <th className="p-4 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Nominal</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(trx => (
                    <tr key={trx.id} className="border-b border-[#D4AF37]/10 hover:bg-[#1A1A1A]/80 transition-colors">
                      <td className="p-4 text-xs text-[#9CA3AF]">{trx.date}</td>
                      <td className="p-4 text-xs font-medium text-[#E5E7EB]">{trx.hijriMonth || 'Rabiul Awal'}</td>
                      <td className="p-4 text-xs font-medium text-[#E5E7EB]">{trx.quarter || 'Triwulan I (Q1)'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${trx.type === 'IN' ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30' : trx.type === 'SAVING' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30' : 'bg-red-500/20 text-red-400 border border-red-500/35'}`}>
                          {trx.type === 'IN' ? 'Pemasukan' : trx.type === 'SAVING' ? 'Tabungan Harian' : `Keluar (${trx.category})`}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-[#E5E7EB]">{trx.note}</td>
                      <td className={`p-4 text-sm font-bold ${trx.type === 'IN' ? 'text-[#10B981]' : trx.type === 'SAVING' ? 'text-[#D4AF37]' : 'text-red-400'}`}>
                        {trx.type === 'IN' ? '+' : trx.type === 'SAVING' ? '💾' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {adminTab === 'katalog' && (
        <div className="space-y-8">
          <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 p-6 shadow-xl">
            <h3 className="font-serif font-bold text-xl text-[#D4AF37] border-b border-[#D4AF37]/20 pb-4 mb-6 flex items-center gap-2">
              <QrCode size={22} /> Pengaturan Gambar QRIS Cafe
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-40 h-40 bg-white p-2 rounded-xl border-2 border-[#D4AF37] flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                {customQrisImage ? (
                  <img src={customQrisImage} alt="QRIS Active" className="w-full h-full object-contain" />
                ) : (
                  <QrCode size={100} className="text-[#050505]" />
                )}
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-[#9CA3AF]">Unggah gambar QRIS cafe Anda di sini. Gambar ini akan otomatis muncul pada halaman pembayaran QRIS saat pelanggan melakukan pemesanan online.</p>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleAdminQrisUpload} className="w-full text-xs text-[#9CA3AF] file:mr-4 file:py-2.5 file:px-4 file:rounded file:border-0 file:bg-[#D4AF37] file:text-[#050505] file:font-bold bg-[#0A0A0A] rounded border border-[#D4AF37]/30 cursor-pointer" />
                </div>
                {customQrisImage && (
                  <button onClick={() => setCustomQrisImage(null)} className="text-xs text-red-400 underline block">Hapus / Reset QRIS</button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 p-6 shadow-xl">
            <h3 className="font-serif font-bold text-xl text-[#D4AF37] border-b border-[#D4AF37]/20 pb-4 mb-6 flex items-center gap-2">
              <Star size={22} /> Kelola 2 Menu Spesial Pilihan
            </h3>

            {editingSpecial ? (
              <form onSubmit={handleSaveSpecial} className="bg-[#1A1A1A] p-6 rounded-xl border border-[#D4AF37]/50 space-y-4 mb-6">
                <h4 className="font-bold text-sm text-[#D4AF37]">Edit {editingSpecial.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Nama Menu</label>
                    <input required value={editingSpecial.name} onChange={e=>setEditingSpecial({...editingSpecial, name: e.target.value})} className={inputClass} type="text" />
                  </div>
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Harga (Rp)</label>
                    <input required value={editingSpecial.price} onChange={e=>setEditingSpecial({...editingSpecial, price: parseInt(e.target.value) || 0})} className={inputClass} type="number" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Deskripsi</label>
                  <textarea required value={editingSpecial.description} onChange={e=>setEditingSpecial({...editingSpecial, description: e.target.value})} className={inputClass} rows="2" />
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Foto Banner</label>
                  <input type="file" accept="image/*" onChange={handleSpecialImageUpload} className="w-full text-xs text-[#9CA3AF] file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-[#D4AF37]/20 file:text-[#D4AF37] bg-[#0A0A0A] rounded border border-[#D4AF37]/30" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-[#D4AF37] text-[#050505] font-bold text-xs py-2.5 px-6 rounded">Simpan Menu Spesial</button>
                  <button type="button" onClick={() => setEditingSpecial(null)} className="bg-[#141414] border border-[#D4AF37]/30 text-[#9CA3AF] text-xs py-2.5 px-6 rounded">Batal</button>
                </div>
              </form>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specialMenus.map((sp, idx) => (
                <div key={sp.id} className="bg-[#1A1A1A]/80 rounded-xl border border-[#D4AF37]/30 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-32 overflow-hidden bg-[#0A0A0A] relative">
                      <img src={getImgUrl(sp)} alt={sp.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-[#D4AF37] text-[#050505] text-[10px] font-bold px-2 py-0.5 rounded">Spesial #{idx+1}</div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-[#E5E7EB]">{sp.name}</span>
                        <span className="font-bold text-sm text-[#D4AF37]">Rp {sp.price.toLocaleString('id-ID')}</span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] line-clamp-2">{sp.description}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button onClick={() => setEditingSpecial(sp)} className="w-full py-2 bg-[#0A0A0A] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded hover:bg-[#D4AF37] hover:text-[#050505] transition-all flex items-center justify-center gap-1.5">
                      <Edit2 size={14} /> Edit Spesial #{idx+1}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 p-6 shadow-xl">
            <h3 className="font-serif font-bold text-xl text-[#D4AF37] border-b border-[#D4AF37]/20 pb-4 mb-6 flex items-center gap-2">
              <Package size={22} /> Kelola Paket Santri (A, B, C, D)
            </h3>

            {editingPackage ? (
              <form onSubmit={handleSavePackage} className="bg-[#1A1A1A] p-6 rounded-xl border border-[#D4AF37]/50 space-y-4 mb-6">
                <h4 className="font-bold text-sm text-[#D4AF37]">Edit {editingPackage.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Nama Paket</label>
                    <input required value={editingPackage.name} onChange={e=>setEditingPackage({...editingPackage, name: e.target.value})} className={inputClass} type="text" />
                  </div>
                  <div>
                    <label className="text-xs text-[#9CA3AF] mb-1 block">Harga (Rp)</label>
                    <input required value={editingPackage.price} onChange={e=>setEditingPackage({...editingPackage, price: parseInt(e.target.value) || 0})} className={inputClass} type="number" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Rincian / Deskripsi Paket</label>
                  <textarea required value={editingPackage.description} onChange={e=>setEditingPackage({...editingPackage, description: e.target.value})} className={inputClass} rows="2" />
                </div>
                <div>
                  <label className="text-xs text-[#9CA3AF] mb-1 block">Foto Paket</label>
                  <input type="file" accept="image/*" onChange={handlePackageImageUpload} className="w-full text-xs text-[#9CA3AF] file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-[#D4AF37]/20 file:text-[#D4AF37] bg-[#0A0A0A] rounded border border-[#D4AF37]/30" />
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="bg-[#D4AF37] text-[#050505] font-bold text-xs py-2.5 px-6 rounded">Simpan Paket</button>
                  <button type="button" onClick={() => setEditingPackage(null)} className="bg-[#141414] border border-[#D4AF37]/30 text-[#9CA3AF] text-xs py-2.5 px-6 rounded">Batal</button>
                </div>
              </form>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-[#1A1A1A]/80 rounded-xl border border-[#D4AF37]/20 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-28 overflow-hidden bg-[#0A0A0A] relative">
                      <img src={getImgUrl(pkg)} alt={pkg.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm text-[#E5E7EB]">{pkg.name}</span>
                        <span className="font-bold text-sm text-[#D4AF37]">Rp {pkg.price.toLocaleString('id-ID')}</span>
                      </div>
                      <p className="text-xs text-[#9CA3AF] line-clamp-3">{pkg.description}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <button onClick={() => setEditingPackage(pkg)} className="w-full py-2 bg-[#0A0A0A] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold rounded hover:bg-[#D4AF37] hover:text-[#050505] transition-all flex items-center justify-center gap-1.5">
                      <Edit2 size={14} /> Edit Paket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-[#141414]/90 backdrop-blur-md rounded-xl border border-[#D4AF37]/40 p-6 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <h3 className="font-serif font-bold text-xl text-[#D4AF37] border-b border-[#D4AF37]/20 pb-4 mb-5 flex items-center justify-between">
                  <span>{editId ? 'Edit Menu' : 'Tambah Menu'}</span>
                  {editId && <button onClick={cancelEdit} className="text-xs text-[#9CA3AF] underline">Batal</button>}
                </h3>
                
                <form onSubmit={handleAddMenu} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1 block">Nama Menu</label>
                    <input required value={newMenu.name} onChange={e=>setNewMenu({...newMenu, name: e.target.value})} className={inputClass} type="text" placeholder="Nama makanan..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1 block">Harga (Rp)</label>
                    <input required value={newMenu.price} onChange={e=>setNewMenu({...newMenu, price: e.target.value})} className={inputClass} type="number" placeholder="Contoh: 6000" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1 block">Kategori</label>
                    <select value={newMenu.category} onChange={e=>setNewMenu({...newMenu, category: e.target.value})} className={inputClass}>
                      {['Ayam', 'Ikan', 'Telur', 'Sayur-sayuran', 'Makanan Lainnya', 'Gorengan'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1 block">Foto Menu (Dari Perangkat)</label>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-xs text-[#9CA3AF] file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-[#D4AF37]/20 file:text-[#D4AF37] bg-[#0A0A0A] rounded border border-[#D4AF37]/30" />
                    {newMenu.image && <p className="text-[10px] text-[#10B981] mt-1">✓ Gambar siap diunggah</p>}
                  </div>
                  <button type="submit" className={`${btnClass} w-full mt-2`}>
                    {editId ? 'Simpan Perubahan' : 'Tambah ke Katalog'}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map(item => (
                 <div key={item.id} className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-xl border border-[#D4AF37]/20 overflow-hidden flex flex-col hover:border-[#D4AF37] transition-all group shadow-sm hover:shadow-[0_5px_15px_rgba(212,175,55,0.15)]">
                   <div className="h-24 bg-[#0A0A0A] overflow-hidden relative">
                     <img src={getImgUrl(item)} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                     <div className="absolute top-2 right-2 bg-[#050505]/80 px-2 py-1 rounded text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/30 backdrop-blur-sm">
                       {item.category}
                     </div>
                   </div>
                   <div className="p-4 flex justify-between items-center">
                     <div>
                       <div className="font-bold text-sm text-[#E5E7EB] mb-1">{item.name} {item.isAvailable === false && <span className="text-[10px] bg-red-500/20 text-red-500 px-1 py-0.5 rounded ml-1 border border-red-500/50">Habis</span>}</div>
                       <div className="font-bold text-sm text-[#D4AF37]">Rp {item.price.toLocaleString('id-ID')}</div>
                     </div>
                     <div className="flex gap-2">
                       <button onClick={() => toggleAvailability(item.id)} className={`p-2 rounded-md transition-all border ${item.isAvailable !== false ? 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30 hover:border-[#10B981]' : 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30 hover:border-[#EF4444]'}`} title={item.isAvailable !== false ? 'Tandai Habis' : 'Tandai Tersedia'}>
                         {item.isAvailable !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                       </button>
                       <button onClick={() => startEdit(item)} className="text-[#9CA3AF] hover:text-[#D4AF37] p-2 bg-[#0A0A0A] rounded-md transition-all border border-[#D4AF37]/10 hover:border-[#D4AF37]/50" title="Edit"><Edit2 size={16} /></button>
                       <button onClick={() => removeMenu(item.id)} className="text-[#9CA3AF] hover:text-[#EF4444] p-2 bg-[#0A0A0A] rounded-md transition-all border border-[#D4AF37]/10 hover:border-[#EF4444]/30" title="Hapus"><Trash2 size={16} /></button>
                     </div>
                   </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Receipt({ data }) {
  return (
    <div className="bg-[#FDFBF7] p-8 border border-[#E6DFD5] rounded-xl text-[#2C2416] w-full shadow-lg font-['Inter',sans-serif]">
      <div className="text-center mb-8 pb-6 border-b-2 border-dashed border-[#D4AF37]/35 relative">
        <h2 className="text-3xl font-serif font-bold tracking-widest text-[#9A7B20] mb-1">LA-TANSA</h2>
        <p className="text-[10px] text-[#7A6B52] uppercase tracking-[0.25em] mb-6 font-semibold">Cafe & Resto</p>
        <div className="flex justify-between items-center text-xs text-[#4A3F2C] bg-[#F4EFE6] p-3 rounded-lg border border-[#E6DFD5]">
          <span className="font-medium">No: <b className="text-[#1C180E]">{data.id}</b></span>
          <span className="font-medium">{data.date}</span>
        </div>
      </div>

      <div className="mb-8 space-y-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A6B52] mb-2">Informasi Pemesanan</p>
          <p className="font-bold text-sm mb-1 text-[#9A7B20]">{data.type}</p>
          <p className="text-sm font-medium mb-3 text-[#2C2416] whitespace-pre-wrap">{data.customer}</p>
          <p className="text-sm text-[#4A3F2C] whitespace-pre-wrap leading-relaxed bg-[#F4EFE6] p-3 rounded-md border border-[#EBE3D5]">{data.details}</p>
        </div>
        
        {data.total > 0 && (
          <div className="flex justify-between items-center font-bold text-lg border-t border-dashed border-[#E6DFD5] pt-5 mt-4">
            <span className="uppercase tracking-wider text-sm text-[#1C180E]">Total Transaksi</span>
            <span className="font-serif text-2xl text-[#9A7B20]">Rp {data.total.toLocaleString('id-ID')}</span>
          </div>
        )}
        
        <div className="text-xs bg-[#F4EFE6] text-[#4A3F2C] p-3 rounded-md border border-[#E6DFD5] flex justify-between items-center">
          <span className="font-semibold text-[#7A6B52] uppercase tracking-wider">Metode Pembayaran:</span>
          <span className="uppercase font-bold text-[#1C180E]">{data.payment === 'qris' ? 'QRIS Digital' : 'Tunai (Cash)'}</span>
        </div>
      </div>

      <div className="text-center mt-6 pt-6 border-t border-dashed border-[#E6DFD5]">
        <p className="font-serif font-bold text-lg text-[#9A7B20] mb-1">Terima Kasih</p>
        <p className="text-[10px] text-[#7A6B52] uppercase tracking-widest font-medium">La-Tansa Cafe</p>
      </div>
    </div>
  );
}

function generateWaLink(order) {
  const adminPhone = "6288991753641"; 

  let message = `*PEMESANAN LA-TANSA CAFE*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*No. Ref :* ${order.id}\n`;
  message += `*Waktu :* ${order.date}\n`;
  message += `*Tipe :* ${order.type}\n\n`;
  
  message += `*DATA PEMESAN:*\n${order.customer}\n\n`;
  message += `*DETAIL PESANAN:*\n${order.details}\n\n`;

  if (order.total > 0) {
    message += `*TOTAL TAGIHAN:* Rp ${order.total.toLocaleString('id-ID')}\n\n`;
  }

  message += `*METODE:* ${order.payment === 'qris' ? 'QRIS' : 'TUNAI'}\n`;
  if (order.payment === 'qris') {
     message += `_(Mohon lampirkan struk / bukti transfer digital)_\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Tolong segera diproses ya admin, terima kasih.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${adminPhone}?text=${encodedMessage}`;
}