import React from 'react';
import { ShoppingBag, ShieldCheck, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-base">
                আ
              </div>
              <span className="text-lg font-extrabold text-white">আমারদোকান</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {language === 'bn'
                ? 'বাংলাদেশের ১ম এআই পাওয়ারড ই-কমার্স মার্কেটপ্লেস। রূপগঞ্জের ঐতিহ্যবাহী জামদানি শাড়ি, রাজশাহীর রেশম সিল্ক ও প্রাকৃতিক হস্তশিল্পের ১ নম্বর প্লাটফর্ম।'
                : 'Bangladesh 1st AI-powered e-commerce marketplace for authentic traditional products.'}
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-3">ক্যাটাগরি</h4>
            <ul className="space-y-2">
              <li><a href="#sarees" className="hover:text-emerald-400 transition">ঢাকাই জামদানি শাড়ি</a></li>
              <li><a href="#panjabi" className="hover:text-emerald-400 transition">কটন ও সিল্ক পাঞ্জাবি</a></li>
              <li><a href="#honey" className="hover:text-emerald-400 transition">সুন্দরবনের খাঁটি মধু</a></li>
              <li><a href="#crafts" className="hover:text-emerald-400 transition">হাতে সেলাই নকশী কাঁথা</a></li>
              <li><a href="#leather" className="hover:text-emerald-400 transition">চামড়ার ওয়ালেট ও ব্যাগ</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-3">গ্রাহক সেবা</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400" /> +৮৮০ ১৭১১-০০০০০০</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400" /> support@amardokan.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> গুলশান ১, ঢাকা - ১২১২, বাংলাদেশ</li>
            </ul>
          </div>

          {/* Col 4: Payments */}
          <div>
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px] mb-3">পেমেন্ট মেথড</h4>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="bg-slate-900 border border-slate-800 text-pink-400 px-2.5 py-1 rounded-md">bKash</span>
              <span className="bg-slate-900 border border-slate-800 text-orange-400 px-2.5 py-1 rounded-md">Nagad</span>
              <span className="bg-slate-900 border border-slate-800 text-emerald-400 px-2.5 py-1 rounded-md">Cash on Delivery</span>
            </div>
            <p className="mt-3 text-slate-500 text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>১০০% সেফ ও সিকিউর্ড কেনাকাটা</span>
            </p>
          </div>

        </div>

        <div className="pt-6 text-center text-slate-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© ২০২৬ আমারদোকান (AmarDokan) এআই মার্কেটপ্লেস। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for Bangladeshi Heritage</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
