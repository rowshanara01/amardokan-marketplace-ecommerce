import React, { useState, useRef } from 'react';
import { X, ShieldAlert, Plus, Trash2, Edit3, Package, DollarSign, Users, ShoppingCart, Sparkles, Key, CheckCircle2, Upload, Image as ImageIcon, AlertCircle, HelpCircle } from 'lucide-react';
import { Product, Order, Language } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  language,
  products,
  orders,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'credentials'>('products');

  // New product form state
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState('sarees-attire');
  const [price, setPrice] = useState<number>(1500);
  const [image, setImage] = useState('');
  const [imageType, setImageType] = useState<'file' | 'url'>('file');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [origin, setOrigin] = useState('ঢাকা, বাংলাদেশ');
  const [sellerName, setSellerName] = useState('আমারদোকান অফিসিয়াল');
  const [isProcessingImg, setIsProcessingImg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  // Handle local image file upload & compress into base64 data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে শুধুমাত্র ছবি ফাইল (JPG, PNG, WEBP) সিলেক্ট করুন।');
      return;
    }

    setIsProcessingImg(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize and compress on canvas to ensure reasonable Base64 payload (< 100KB)
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setImage(compressedDataUrl);
        } else {
          setImage(event.target?.result as string);
        }
        setIsProcessingImg(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      alert('ছবি আপলোড করতে সমস্যা হয়েছে।');
      setIsProcessingImg(false);
    };
    reader.readAsDataURL(file);
  };

  const sampleImages = [
    { label: 'শাড়ি', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80' },
    { label: 'পাঞ্জাবি', url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80' },
    { label: 'মধু / ফুড', url: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80' },
    { label: 'হস্তশিল্প', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80' },
    { label: 'লেদার', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameBn || !price) {
      alert('অনুগ্রহ করে পণ্যের নাম ও মূল্য পূরণ করুন।');
      return;
    }

    const defaultImg = image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';

    onAddProduct({
      nameBn,
      nameEn: nameEn || nameBn,
      category,
      price: Number(price),
      rating: 5.0,
      reviewsCount: 1,
      image: defaultImg,
      descriptionBn: descriptionBn || 'এআই ভেরিফাইড অরিজিনাল দেশি পণ্য।',
      descriptionEn: descriptionBn || 'AI Verified Authentic Product.',
      isAiVerified: true,
      inStock: true,
      stockQuantity: 10,
      origin,
      sellerNameBn: sellerName,
      sellerNameEn: sellerName,
      sellerVerified: true,
      isCustom: true,
    });

    // Reset
    setNameBn('');
    setNameEn('');
    setImage('');
    setDescriptionBn('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    alert(language === 'bn' ? 'নতুন পণ্য সফলভাবে যোগ করা হয়েছে!' : 'New product created successfully!');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 sticky top-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="p-2 bg-amber-500 text-slate-950 rounded-xl font-bold flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-extrabold text-sm sm:text-lg flex items-center gap-2 truncate">
                <span className="truncate">আমারদোকান এডমিন কন্ট্রোল প্যানেল</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded flex-shrink-0">Admin</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">প্রোডাক্ট ম্যানেজমেন্ট, অর্ডার ট্র্যাকিং ও সিস্টেম সেটিংস</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 text-xs">
          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg flex-shrink-0"><Package className="w-4 h-4" /></div>
            <div className="min-w-0">
              <p className="text-slate-400 font-semibold text-[11px] sm:text-xs truncate">মোট প্রোডাক্টস</p>
              <p className="font-extrabold text-sm sm:text-base text-slate-900">{products.length} টি</p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 bg-teal-100 text-teal-700 rounded-lg flex-shrink-0"><ShoppingCart className="w-4 h-4" /></div>
            <div className="min-w-0">
              <p className="text-slate-400 font-semibold text-[11px] sm:text-xs truncate">মোট অর্ডার</p>
              <p className="font-extrabold text-sm sm:text-base text-slate-900">{orders.length} টি</p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg flex-shrink-0"><DollarSign className="w-4 h-4" /></div>
            <div className="min-w-0">
              <p className="text-slate-400 font-semibold text-[11px] sm:text-xs truncate">মোট রেভিনিউ</p>
              <p className="font-extrabold text-sm sm:text-base text-slate-900">৳ {totalRevenue.toLocaleString('bn-BD')}</p>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg flex-shrink-0"><Users className="w-4 h-4" /></div>
            <div className="min-w-0">
              <p className="text-slate-400 font-semibold text-[11px] sm:text-xs truncate">সক্রিয় ইউজার</p>
              <p className="font-extrabold text-sm sm:text-base text-slate-900">১৫৮ জন</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Scrollable on small screens) */}
        <div className="flex border-b border-slate-200 px-3 sm:px-6 bg-white text-xs font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'products' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4 flex-shrink-0" />
            <span>প্রোডাক্ট ম্যানেজমেন্ট</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'orders' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShoppingCart className="w-4 h-4 flex-shrink-0" />
            <span>অর্ডার লিস্ট</span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition ${
              activeTab === 'credentials' ? 'border-amber-500 text-amber-700' : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Key className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>এডমিন ও Vercel তথ্য</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
          
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Add product form */}
              <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>নতুন পণ্য যুক্ত করুন</span>
                </h3>

                <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">পণ্যের নাম (বাংলা):</label>
                    <input
                      type="text"
                      value={nameBn}
                      onChange={(e) => setNameBn(e.target.value)}
                      placeholder="যেমন: প্রিমিয়াম টাঙ্গাইল তাঁতের শাড়ি"
                      required
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">পণ্যের নাম (English):</label>
                    <input
                      type="text"
                      value={nameEn}
                      onChange={(e) => setNameEn(e.target.value)}
                      placeholder="e.g. Premium Tangail Handloom Saree"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">মূল্য (৳ BDT):</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ক্যাটাগরি:</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-semibold"
                      >
                        <option value="sarees-attire">জামদানি ও শাড়ি</option>
                        <option value="panjabi">পাঞ্জাবি</option>
                        <option value="organic-food">অর্গানিক ফুড</option>
                        <option value="crafts-decor">হস্তশিল্প</option>
                        <option value="leather-goods">লেদার</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Selector & Upload */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-bold text-slate-700 text-xs">পণ্যের ছবি (Image):</label>
                      <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-[10px] font-bold">
                        <button
                          type="button"
                          onClick={() => setImageType('file')}
                          className={`px-2 py-0.5 rounded-md transition ${imageType === 'file' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'}`}
                        >
                          ফাইল আপলোড (Device)
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageType('url')}
                          className={`px-2 py-0.5 rounded-md transition ${imageType === 'url' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'}`}
                        >
                          পাবলিক লিঙ্ক (URL)
                        </button>
                      </div>
                    </div>

                    {imageType === 'file' ? (
                      <div className="space-y-2">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-emerald-400 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/80 p-3 rounded-xl cursor-pointer text-center transition flex flex-col items-center justify-center gap-1.5"
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <Upload className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-800 text-xs">
                            {isProcessingImg ? 'ছবি প্রসেস হচ্ছে...' : 'মোবাইল বা পিসি থেকে ছবি বেছে নিন'}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            (অটো অপটিমাইজেশন হবে যা সব ব্রাউজারে দ্রুত লোড হয়)
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => setImage(e.target.value)}
                          placeholder="https://images.unsplash.com/... অথবা ImgBB/PostImage লিঙ্ক"
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium text-xs"
                        />
                      </div>
                    )}

                    {/* Preset samples */}
                    <div className="pt-1">
                      <span className="text-[10px] font-bold text-slate-500 block mb-1">অথবা ডেমো ছবি সিলেক্ট করুন:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {sampleImages.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setImage(s.url)}
                            className="px-2 py-1 bg-white border border-slate-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-700 rounded-lg text-[10px] font-medium transition"
                          >
                            + {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Preview Box */}
                    {image && (
                      <div className="p-2 bg-white rounded-xl border border-emerald-200 flex items-center gap-3">
                        <img
                          src={image}
                          alt="Preview"
                          className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ছবি যুক্ত করা হয়েছে
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">
                            {image.startsWith('data:') ? 'লোকাল ফাইল (Base64 কম্প্রেসড)' : image}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setImage('');
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1 text-[11px] font-bold"
                        >
                          মুছুন
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">বিবরণ:</label>
                    <textarea
                      value={descriptionBn}
                      onChange={(e) => setDescriptionBn(e.target.value)}
                      placeholder="পণ্যের গুণগত মান ও বৈশিষ্ট্য..."
                      rows={2}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs transition shadow"
                  >
                    পণ্য প্রকাশ করুন
                  </button>
                </form>
              </div>

              {/* Product list with delete button */}
              <div className="lg:col-span-7 space-y-3">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
                  <span>বিদ্যমান সকল কার্ড / পণ্য ({products.length})</span>
                  <span className="text-xs text-rose-600 font-normal">* যেকোনো কার্ড ডিলিট করতে পাশে ট্র্যাশ আইকনে ক্লিক করুন</span>
                </h3>

                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-sm hover:border-slate-300"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={p.image} alt={p.nameBn} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-slate-900 truncate">{p.nameBn}</h4>
                          <p className="text-[11px] text-emerald-700 font-extrabold">৳ {p.price.toLocaleString('bn-BD')}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`আপনি কি "${p.nameBn}" কার্ডটি স্থায়ীভাবে ডিলিট করতে চান?`)) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                        title="কার্ডটি ডিলিট করুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900">সাম্প্রতিক গ্রাহকদের অর্ডার তালিকা</h3>
              
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 font-bold text-slate-700 uppercase">
                    <tr>
                      <th className="p-3">অর্ডার আইডি</th>
                      <th className="p-3">গ্রাহক</th>
                      <th className="p-3">ফোন নম্বর</th>
                      <th className="p-3">পেমেন্ট</th>
                      <th className="p-3">মোট টাকা</th>
                      <th className="p-3">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="p-3 font-extrabold text-slate-900">#{o.id}</td>
                        <td className="p-3 font-semibold text-slate-800">{o.customerName}</td>
                        <td className="p-3 text-slate-600">{o.phone}</td>
                        <td className="p-3 font-bold uppercase text-emerald-700">{o.paymentMethod}</td>
                        <td className="p-3 font-extrabold text-slate-900">৳ {o.totalAmount.toLocaleString('bn-BD')}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Credentials & Vercel Info Tab */}
          {activeTab === 'credentials' && (
            <div className="space-y-6 max-w-2xl bg-slate-50 p-6 rounded-2xl border border-slate-200">
              
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-amber-500 text-slate-950 rounded-xl font-bold">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">এডমিন ক্রডেনশিয়াল ও ভার্সেল (Vercel) কনফিগারেশন</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    আমাদের সিস্টেমে এডমিন ইমেইল এবং পাসওয়ার্ড দুইভাবে সেটিং রাখা হয়েছে:
                  </p>
                </div>
              </div>

              {/* Box 1: Default Credentials */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  ১. ডিফল্ট এডমিন লগইন তথ্য (Default Admin Login):
                </h4>
                <div className="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-xs space-y-1">
                  <div><strong>Email:</strong> admin@amardokan.com</div>
                  <div><strong>Password:</strong> admin123</div>
                </div>
                <p className="text-slate-500 text-[11px]">
                  * আপনি লগইন উইন্ডোতে ১-ক্লিকে এই ইমেইল পূরণ করে প্রবেশ করতে পারবেন।
                </p>
              </div>

              {/* Box 2: Vercel Deploy Environment Variable Guidance */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-indigo-700">
                  <Sparkles className="w-4 h-4" />
                  ২. Vercel এ ডেপ্লয় করার সময় কাস্টম ইমেইল ও পাসওয়ার্ড দেওয়া:
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  ভার্সেলে (Vercel) আলাদা করে কাস্টম এডমিন ইমেইল বা পাসওয়ার্ড সেট করতে চাইলে, Vercel Dashboard এর <strong>Environment Variables</strong> এ এই দুটি সেট করে দিন:
                </p>
                <div className="bg-slate-900 text-amber-300 p-3 rounded-lg font-mono text-xs space-y-1">
                  <div>VITE_ADMIN_EMAIL = your-email@gmail.com</div>
                  <div>VITE_ADMIN_PASSWORD = your-secret-password</div>
                </div>
                <p className="text-slate-500 text-[11px]">
                  * যদি Vercel এ কোনো Environment Variable না দেওয়া হয়, তবে ডিফল্ট ইমেইল (<code>admin@amardokan.com</code>) কাজ করবে।
                </p>
              </div>

              {/* Box 3: Image Upload & Cross-Device Guide */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  ৩. ইমেজ আপলোড ও অন্য ব্রাউজারে পণ্য দেখা সংক্রান্ত তথ্য:
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  • <strong>ফাইল আপলোড সুবিধা:</strong> এখন এডমিন প্যানেল থেকে সরাসরি আপনার ফোন বা কম্পিউটার থেকে ছবি আপলোড করতে পারবেন। সিস্টেম স্বয়ংক্রিয়ভাবে ছবি সাইজ অপটিমাইজ করে নিবে যাতে কোনো ব্রোকেন ইমেজ এরর না আসে।
                  <br />
                  • <strong>অন্যান্য ডিভাইস / ব্রাউজারে পণ্য দেখাতে:</strong> আপনি ব্রাউজারে যে নতুন পণ্য যোগ করেন তা আপনার ব্রাউজার মেমোরিতে (LocalStorage) সেভ থাকে। অন্য ব্রাউজারে সব ইউজারের জন্য স্থায়ীভাবে দেখাতে চাইলে, আপনি নতুন প্রোডাক্ট অ্যাড করার সময় যেকোনো পাবলিক ইমেজ লিঙ্ক (যেমন: Unsplash, ImgBB বা আপনার ড্রাইভের ডিরেক্ট ইমেজ লিঙ্ক) ব্যবহার করতে পারেন অথবা স্যাম্পল প্রিসেট ব্যবহার করতে পারেন।
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
