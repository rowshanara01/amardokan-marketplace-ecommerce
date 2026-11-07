import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, Language } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  language: Language;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="font-extrabold text-base">
                {language === 'bn' ? 'আপনার শপিং কার্ট' : 'Shopping Cart'} ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="p-5 overflow-y-auto flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <ShoppingBag className="w-16 h-16 mx-auto mb-3 opacity-30" />
                <p className="font-bold text-slate-600 mb-1">
                  {language === 'bn' ? 'আপনার কার্ট খালি!' : 'Your Cart is Empty!'}
                </p>
                <p className="text-xs">
                  {language === 'bn' ? 'হোম পেজ থেকে পছন্দের পণ্য যুক্ত করুন।' : 'Add your favorite products from home.'}
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.nameBn}
                    className="w-16 h-16 object-cover rounded-xl bg-slate-200"
                    onError={(e) => handleImageError(e, item.product.category, item.product.nameBn)}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {language === 'bn' ? item.product.nameBn : item.product.nameEn}
                    </h4>
                    <div className="text-emerald-700 font-extrabold text-xs mt-0.5">
                      ৳ {item.product.price.toLocaleString('bn-BD')}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-slate-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-slate-100 font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="flex justify-between text-sm font-bold text-slate-800">
                <span>{language === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                <span className="text-emerald-700 font-extrabold">
                  ৳ {subtotal.toLocaleString('bn-BD')}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {language === 'bn' ? '* ডেলিভারি চার্জ চেকআউটে যুক্ত হবে।' : '* Delivery charge added at checkout.'}
              </p>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition hover:scale-[1.01]"
              >
                <span>{language === 'bn' ? 'চেকআউটে যান' : 'Proceed to Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'bn' ? '১০০% নিরাপদ লেনদেন ও ক্যাশ অন ডেলিভারি' : '100% Safe Cash on Delivery'}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
