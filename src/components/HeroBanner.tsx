import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Camera, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { handleImageError } from '../utils/imageUtils';

const DEFAULT_BANNER_IMAGE = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80';

interface HeroBannerProps {
  language: Language;
  onOpenSmartSearch: () => void;
  onOpenAIChat: () => void;
  isAdmin?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  onOpenSmartSearch,
  onOpenAIChat,
  isAdmin = false,
}) => {
  const [bannerImg, setBannerImg] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('amar_dokan_hero_banner_img');
      if (saved) return saved;
    } catch (e) {}
    return DEFAULT_BANNER_IMAGE;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert(language === 'bn' ? 'অনুগ্রহ করে সঠিক ইমেজ ফাইল সিলেক্ট করুন।' : 'Please select a valid image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setBannerImg(result);
          localStorage.setItem('amar_dokan_hero_banner_img', result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    setBannerImg(DEFAULT_BANNER_IMAGE);
    localStorage.removeItem('amar_dokan_hero_banner_img');
  };

  return (
    <div className="relative bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white overflow-hidden py-10 md:py-16">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>
                {language === 'bn'
                  ? 'বাংলাদেশের ১ম এআই ভেরিফাইড ই-কমার্স মার্কেটপ্লেস'
                  : "Bangladesh's 1st AI-Verified E-Commerce Marketplace"}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {language === 'bn' ? (
                <>
                  খাঁটি দেশি পণ্যের ভরসা <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                    এআই পাওয়ারড মার্কেটপ্লেসে
                  </span>
                </>
              ) : (
                <>
                  Authentic Bangladeshi Goods <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                    Powered by Smart AI
                  </span>
                </>
              )}
            </h1>

            {/* Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {language === 'bn'
                ? 'রূপগঞ্জের ১০০ কাউন্ট ঢাকাই জামদানি শাড়ি, রাজশাহীর আসল সিল্ক, কিংবা সুন্দরবনের চাকের খাঁটি মধু — সব পাবেন এআই ভেরিফাইড কোয়ালিটি ও ক্যাশ অন ডেলিভারি সুবিধায়।'
                : 'From Rupganj 100-count Jamdani sarees and Rajshahi silk to raw Sundarban honey — get 100% authentic local heritage with AI-verified quality assurance.'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenSmartSearch}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-slate-900" />
                <span>{language === 'bn' ? 'এআই ভিজ্যুয়াল সার্চ' : 'AI Visual Search'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAIChat}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-slate-800/80 hover:bg-slate-700 text-white font-bold rounded-xl text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 transition"
              >
                <span>{language === 'bn' ? 'কেনাকাটায় এআই সাহায্য' : 'Shopping Assistant'}</span>
              </button>
            </div>

            {/* Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-300 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{language === 'bn' ? 'এআই মান যাচাই' : 'AI Verified'}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400 flex-shrink-0" />
                <span className="truncate">{language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery'}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">{language === 'bn' ? '৭ দিনের রিটার্ন' : '7 Days Return'}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate">{language === 'bn' ? '১০০% দেশি পণ্য' : '100% Authentic'}</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Card with Image Change Option */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl bg-gradient-to-b from-slate-800 to-slate-900 p-2 group">
              <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden">
                <img
                  src={bannerImg}
                  alt="Featured Heritage Banner"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => handleImageError(e, 'sarees-attire', 'ঢাকাই জামদানি শাড়ি')}
                />

                {/* Direct Banner Image Change Controls (Only for Logged-In Admin) */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                    <label
                      className="bg-slate-900/90 hover:bg-emerald-600 text-white p-2 rounded-full border border-amber-400/50 backdrop-blur-md cursor-pointer transition shadow-lg flex items-center gap-1.5 px-3 text-xs font-semibold"
                      title={language === 'bn' ? 'এডমিন: ছবি পরিবর্তন / আপলোড করুন' : 'Admin: Upload Banner Image'}
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-300" />
                      <span>{language === 'bn' ? 'ছবি চেঞ্জ (Admin)' : 'Change Img'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {bannerImg !== DEFAULT_BANNER_IMAGE && (
                      <button
                        onClick={handleResetImage}
                        className="bg-slate-900/80 hover:bg-red-600 text-white p-2 rounded-full border border-white/20 backdrop-blur-md cursor-pointer transition shadow-lg text-xs"
                        title={language === 'bn' ? 'ডিফল্ট ছবি রিসেট করুন' : 'Reset to default'}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-amber-400 text-slate-950 font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                      {language === 'bn' ? 'হট সেলিং' : 'Hot Item'}
                    </span>
                    <span className="text-emerald-400 text-xs font-semibold">
                      ৳ ১৪,৫০০
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-100">
                    {language === 'bn'
                      ? 'আসল রূপগঞ্জের ১০০ কাউন্ট ঢাকাই জামদানি'
                      : 'Authentic 100-Count Dhakai Jamdani'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    {language === 'bn'
                      ? 'এআই ভেরিফাইড তাঁতের মিহি সুতা'
                      : 'AI Verified Pure Handloom Threadwork'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
