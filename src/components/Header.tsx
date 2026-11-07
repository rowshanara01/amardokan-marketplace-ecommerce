import React from 'react';
import { ShoppingBag, Search, Sparkles, User, ShieldAlert, Bot, Menu, Globe } from 'lucide-react';
import { Language, User as UserType } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  currentUser: UserType | null;
  onOpenAuth: () => void;
  onOpenUserDashboard: () => void;
  onOpenAdminPanel: () => void;
  onOpenSmartSearch: () => void;
  onOpenAIChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageToggle,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  currentUser,
  onOpenAuth,
  onOpenUserDashboard,
  onOpenAdminPanel,
  onOpenSmartSearch,
  onOpenAIChat,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 text-slate-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
        <span>
          {language === 'bn'
            ? 'আমারদোকান এআই মার্কেটপ্লেস — ১০০% অরিজিনাল দেশি পণ্য ও এআই ভেরিফাইড গ্যারান্টি!'
            : 'AmarDokan AI Marketplace — 100% Authentic Bangladeshi Goods & AI Verified Guarantee!'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block leading-tight">
                  আমার<span className="text-emerald-400">দোকান</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                  AI Marketplace
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'খুঁজুন জামদানি শাড়ি, কটন পাঞ্জাবি, সুন্দরবনের মধু...'
                    : 'Search Jamdani saree, cotton panjabi, honey...'
                }
                className="w-full pl-10 pr-24 py-2.5 bg-slate-800/90 border border-slate-700/80 rounded-full text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                onClick={onOpenSmartSearch}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition shadow-md"
              >
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{language === 'bn' ? 'এআই সার্চ' : 'AI Search'}</span>
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={onLanguageToggle}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* AI Assistant Chat Button */}
            <button
              onClick={onOpenAIChat}
              className="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-md"
            >
              <Bot className="w-4 h-4 text-amber-300 animate-bounce" />
              <span className="hidden sm:inline">{language === 'bn' ? 'এআই সহকারী' : 'AI Assistant'}</span>
            </button>

            {/* Admin Panel Button (Exclusive to Admin) */}
            {currentUser?.role === 'admin' ? (
              <button
                onClick={onOpenAdminPanel}
                className="p-2 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg border border-amber-500/40 transition relative shadow"
                title={language === 'bn' ? 'এডমিন কন্ট্রোল প্যানেল' : 'Admin Control Panel'}
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
              </button>
            ) : null}

            {/* User Account Button */}
            {currentUser ? (
              <button
                onClick={onOpenUserDashboard}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold max-w-[90px] truncate hidden sm:inline">
                  {currentUser.name}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 text-xs font-semibold flex items-center gap-1 transition"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold flex items-center transition shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              language === 'bn' ? 'পণ্য খুঁজুন...' : 'Search products...'
            }
            className="w-full pl-9 pr-20 py-2 bg-slate-800 border border-slate-700 rounded-full text-xs text-white placeholder-slate-400 focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <button
            onClick={onOpenSmartSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-emerald-600 text-white rounded-full text-[11px] font-bold"
          >
            এআই সার্চ
          </button>
        </div>
      </div>
    </header>
  );
};
