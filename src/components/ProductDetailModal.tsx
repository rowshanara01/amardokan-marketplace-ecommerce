import React, { useState } from 'react';
import { X, Sparkles, Star, ShoppingBag, ShieldCheck, CheckCircle2, Truck, RefreshCw } from 'lucide-react';
import { Product, Language } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface ProductDetailModalProps {
  product: Product | null;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  language,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');

  if (!product) return null;

  const currentImg = activeImage || product.image;
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              <img
                src={currentImg}
                alt={language === 'bn' ? product.nameBn : product.nameEn}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, product.category, product.nameBn)}
              />
              {product.isAiVerified && (
                <div className="absolute top-3 left-3 bg-slate-900/90 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{language === 'bn' ? 'এআই অরিজিনালিটি ভেরিফাইড' : 'AI Originality Verified'}</span>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      currentImg === img ? 'border-emerald-600 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Details */}
          <div className="space-y-5 flex flex-col justify-between">
            <div>
              {/* Seller info */}
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? product.sellerNameBn : product.sellerNameEn}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{product.origin}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-extrabold text-slate-900 leading-snug">
                {language === 'bn' ? product.nameBn : product.nameEn}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <span className="text-sm font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-400">({product.reviewsCount} {language === 'bn' ? 'টি রিভিউ' : 'reviews'})</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-emerald-700">
                  ৳ {product.price.toLocaleString('bn-BD')}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through">
                    ৳ {product.originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="bg-rose-100 text-rose-700 font-bold text-xs px-2.5 py-0.5 rounded-md">
                    -{product.discountPercentage}% ছাড়
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 mt-4 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                {language === 'bn' ? product.descriptionBn : product.descriptionEn}
              </p>

              {/* Specs */}
              {product.specsBn && (
                <div className="mt-4 space-y-1.5 text-xs">
                  <span className="font-bold text-slate-800 block mb-1">
                    {language === 'bn' ? 'বিশেষ বৈশিষ্ট্যসমূহ:' : 'Specifications:'}
                  </span>
                  {(language === 'bn' ? product.specsBn : product.specsEn || product.specsBn).map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">{s.key}:</span>
                      <span className="font-semibold text-slate-800">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-700">{language === 'bn' ? 'পরিমাণ:' : 'Quantity:'}</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 font-bold text-slate-900 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition hover:scale-[1.01]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'bn' ? 'কার্টে যোগ করুন' : 'Add to Cart'}</span>
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'bn' ? 'সারাদেশে হোম ডেলিভারি' : 'Nationwide Home Delivery'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery Available'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
