import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { User, Language } from '../types';
import { ADMIN_USER, DEMO_CUSTOMER } from '../data/dashboardMockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim() === 'admin@amardokan.com' || email.trim() === 'admin') {
      onLoginSuccess(ADMIN_USER);
      onClose();
      return;
    }

    // Default Customer Login
    const loggedUser: User = {
      id: `user-${Date.now()}`,
      name: name || 'রওশন আরা বেগম',
      email: email || 'rowshanaraakhter9@gmail.com',
      role: 'customer',
      phone: '01812345678',
    };
    onLoginSuccess(loggedUser);
    onClose();
  };

  const fillAdminCredentials = () => {
    setEmail('admin@amardokan.com');
    setPassword('admin123');
  };

  const fillCustomerCredentials = () => {
    setEmail('rowshanaraakhter9@gmail.com');
    setPassword('user1234');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-emerald-600 rounded-xl text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg">আমারদোকান অ্যাকাউন্ট</span>
          </div>
          <p className="text-xs text-slate-300">
            {isSignUp ? 'নতুন অ্যাকাউন্ট খুলুন' : 'লগইন করুন এডমিন বা গ্রাহক হিসেবে'}
          </p>
        </div>

        {/* Demo Quick Fill Buttons */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-2">
          <div className="font-bold text-slate-700 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>ডেমো লগইন তথ্য (১-ক্লিকে পূরণ করুন):</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="flex-1 py-1.5 px-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-lg text-[11px] border border-amber-300 transition"
            >
              👑 এডমিন লগইন (admin@amardokan.com)
            </button>
            <button
              type="button"
              onClick={fillCustomerCredentials}
              className="flex-1 py-1.5 px-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold rounded-lg text-[11px] border border-emerald-300 transition"
            >
              🛍️ গ্রাহক লগইন (Demo)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">আপনার নাম:</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  required={isSignUp}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল এড্রেস:</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ইমেইল এড্রেস লিখুন"
                required
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">পাসওয়ার্ড:</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড লিখুন"
                required
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition hover:scale-[1.01]"
          >
            {isSignUp ? 'সাইন আপ করুন' : 'লগইন করুন'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-emerald-700 font-bold hover:underline"
            >
              {isSignUp ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন' : 'নতুন অ্যাকাউন্ট তৈরি করতে চান? সাইন আপ করুন'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
