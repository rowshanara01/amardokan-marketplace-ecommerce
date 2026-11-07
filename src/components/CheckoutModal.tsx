import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, CreditCard, Sparkles } from 'lucide-react';
import { CartItem, Language, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  language: Language;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  language,
  onOrderPlaced,
}) => {
  const [name, setName] = useState('রওশন আরা বেগম');
  const [phone, setPhone] = useState('01812345678');
  const [address, setAddress] = useState('বাড়ি #৪৫, রোড #১২, ধানমন্ডি');
  const [city, setCity] = useState('ঢাকা');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const deliveryFee = city === 'ঢাকা' ? 60 : 120;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert(language === 'bn' ? 'অনুগ্রহ করে সকল সঠিক তথ্য প্রদান করুন।' : 'Please fill all required details.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString().split('T')[0],
        customerName: name,
        phone: phone,
        address: address,
        city: city,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        items: cartItems.map((c) => ({
          productId: c.product.id,
          productName: c.product.nameBn,
          price: c.product.price,
          quantity: c.quantity,
          image: c.product.image,
        })),
        totalAmount: grandTotal,
        deliveryFee: deliveryFee,
        status: 'pending',
      };

      setIsSubmitting(false);
      onOrderPlaced(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="font-extrabold text-base">
              {language === 'bn' ? 'অর্ডার সম্পন্ন করুন' : 'Complete Your Order'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          
          {/* Shipping details */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b pb-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Shipping Address'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'গ্রাহকের নাম:' : 'Full Name:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'মোবাইল নম্বর:' : 'Phone Number:'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'সম্পূর্ণ ঠিকানা:' : 'Full Address:'}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'bn' ? 'শহর / জেলা:' : 'City / Area:'}
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="ঢাকা">ঢাকা (ডেলিভারি চার্জ ৳৬০)</option>
                  <option value="চট্টগ্রাম">চট্টগ্রাম (ডেলিভারি চার্জ ৳১২০)</option>
                  <option value="সিলেট">সিলেট (ডেলিভারি চার্জ ৳১২০)</option>
                  <option value="রাজশাহী">রাজশাহী (ডেলিভারি চার্জ ৳১২০)</option>
                  <option value="খুলনা">খুলনা (ডেলিভারি চার্জ ৳১২০)</option>
                  <option value="অন্যান্য">অন্যান্য জেলা (ডেলিভারি চার্জ ৳১২০)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 border-b pb-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}</span>
            </h3>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <label
                className={`p-3 rounded-2xl border-2 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition ${
                  paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="hidden"
                />
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-center font-bold">ক্যাশ অন ডেলিভারি</span>
              </label>

              <label
                className={`p-3 rounded-2xl border-2 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition ${
                  paymentMethod === 'bkash' ? 'border-pink-600 bg-pink-50 text-pink-950 font-bold' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="hidden"
                />
                <span className="font-extrabold text-pink-600 text-sm">bKash</span>
                <span className="text-center font-bold">বিকাশ অনলাইন</span>
              </label>

              <label
                className={`p-3 rounded-2xl border-2 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition ${
                  paymentMethod === 'nagad' ? 'border-orange-600 bg-orange-50 text-orange-950 font-bold' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'nagad'}
                  onChange={() => setPaymentMethod('nagad')}
                  className="hidden"
                />
                <span className="font-extrabold text-orange-600 text-sm">Nagad</span>
                <span className="text-center font-bold">নগদ অনলাইন</span>
              </label>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>পণ্যমূল্য:</span>
              <span className="font-bold">৳ {subtotal.toLocaleString('bn-BD')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ডেলিভারি ফি ({city}):</span>
              <span className="font-bold">৳ {deliveryFee.toLocaleString('bn-BD')}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-200">
              <span>সর্বমোট:</span>
              <span className="text-emerald-700">৳ {grandTotal.toLocaleString('bn-BD')}</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>অর্ডার প্রসেসিং হচ্ছে...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>অর্ডার নিশ্চিত করুন (৳ {grandTotal.toLocaleString('bn-BD')})</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
