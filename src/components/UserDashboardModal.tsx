import React from 'react';
import { X, User as UserIcon, Package, MapPin, Phone, Mail, LogOut, FileText } from 'lucide-react';
import { User, Order, Language } from '../types';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  orders: Order[];
  language: Language;
  onLogout: () => void;
  onViewInvoice: (order: Order) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  language,
  onLogout,
  onViewInvoice,
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative p-4 sm:p-8 space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-lg sm:text-xl shadow-md flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h2 className="font-extrabold text-base sm:text-lg text-slate-900 truncate">{user.name}</h2>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="px-2.5 sm:px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl transition flex items-center gap-1 border border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'bn' ? 'লগআউট' : 'Logout'}</span>
            </button>

            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>{user.phone || '০১৮১২৩৪৫৬৭৮'}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{user.address || 'ধানমন্ডি, ঢাকা, বাংলাদেশ'}</span>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-600" />
            <span>আমার অর্ডারসমূহ ({orders.length})</span>
          </h3>

          {orders.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">আপনার কোনো পূর্ববর্তী অর্ডার নেই।</p>
          ) : (
            <div className="space-y-3">
              {orders.map((o: Order) => (
                <div
                  key={o.id}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-900">#{o.id}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {o.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">তারিখ: {o.date}</p>
                    <p className="text-xs font-extrabold text-emerald-700">
                      সর্বমোট: ৳ {o.totalAmount.toLocaleString('bn-BD')}
                    </p>
                  </div>

                  <button
                    onClick={() => onViewInvoice(o)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-center transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ইনভয়েস দেখুন</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
