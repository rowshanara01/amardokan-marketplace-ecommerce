import React from 'react';
import { X, Printer, CheckCircle2, ShoppingBag, Download, ArrowLeft } from 'lucide-react';
import { Order, Language } from '../types';

interface InvoiceModalProps {
  order: Order | null;
  language: Language;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, language, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative p-6 sm:p-8">
        
        {/* Actions bar */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 print:hidden">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'bn' ? 'ফিরে যান' : 'Back'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'bn' ? 'প্রিন্ট / ডাউনলোড' : 'Print Invoice'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Content */}
        <div className="space-y-6">
          
          {/* Top header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
                  আ
                </div>
                <span className="text-xl font-extrabold text-slate-900">আমারদোকান</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">এআই ভেরিফাইড ই-কমার্স মার্কেটপ্লেস</p>
              <p className="text-[11px] text-slate-400">গুলশান ১, ঢাকা - ১২১২, বাংলাদেশ</p>
            </div>

            <div className="text-right">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full mb-2">
                অর্ডার ইনভয়েস
              </span>
              <p className="text-xs font-bold text-slate-800">অর্ডার আইডি: #{order.id}</p>
              <p className="text-xs text-slate-500">তারিখ: {order.date}</p>
            </div>
          </div>

          {/* Customer info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs">
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">গ্রাহকের তথ্য</p>
              <p className="font-extrabold text-slate-900">{order.customerName}</p>
              <p className="text-slate-600">{order.phone}</p>
            </div>
            <div>
              <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">ডেলিভারি ঠিকানা</p>
              <p className="font-semibold text-slate-800">{order.address}</p>
              <p className="text-slate-600">{order.city}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5 rounded-l-lg">পণ্য</th>
                  <th className="p-2.5 text-center">পরিমাণ</th>
                  <th className="p-2.5 text-right">একক মূল্য</th>
                  <th className="p-2.5 text-right rounded-r-lg">মোট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2.5 font-bold text-slate-800">{item.productName}</td>
                    <td className="p-2.5 text-center font-semibold">{item.quantity}</td>
                    <td className="p-2.5 text-right">৳ {item.price.toLocaleString('bn-BD')}</td>
                    <td className="p-2.5 text-right font-bold text-emerald-700">
                      ৳ {(item.price * item.quantity).toLocaleString('bn-BD')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="border-t border-slate-200 pt-4 flex justify-between items-end">
            <div className="text-xs space-y-1">
              <p className="font-bold text-slate-700">
                পেমেন্ট পদ্ধতি: <span className="uppercase text-emerald-700">{order.paymentMethod}</span>
              </p>
              <p className="text-slate-500">স্ট্যাটাস: {order.paymentStatus === 'paid' ? 'পরিশোধিত' : 'ক্যাশ অন ডেলিভারি'}</p>
            </div>

            <div className="text-right space-y-1 text-xs">
              <div className="flex justify-between gap-8 text-slate-600">
                <span>ডেলিভারি ফি:</span>
                <span className="font-semibold">৳ {order.deliveryFee.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between gap-8 text-slate-900 text-sm font-extrabold pt-1 border-t border-slate-200">
                <span>সর্বমোট পরিশোধযোগ্য:</span>
                <span className="text-emerald-700">৳ {order.totalAmount.toLocaleString('bn-BD')}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-dashed border-slate-200 text-slate-400 text-[11px]">
            <p>আমারদোকান এআই মার্কেটপ্লেস ব্যবহারের জন্য আপনাকে ধন্যবাদ!</p>
          </div>

        </div>

      </div>
    </div>
  );
};
