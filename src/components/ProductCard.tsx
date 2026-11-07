import React from 'react';
import { Sparkles, ShoppingBag, Eye, Star, Trash2, CheckCircle2 } from 'lucide-react';
import { Product, Language } from '../types';
import { handleImageError } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
  language: Language;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDeleteProduct?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onQuickView,
  onAddToCart,
  onDeleteProduct,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={language === 'bn' ? product.nameBn : product.nameEn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => handleImageError(e, product.category, product.nameBn)}
        />

        {/* AI Verified Badge */}
        {product.isAiVerified && (
          <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{language === 'bn' ? 'এআই ভেরিফাইড' : 'AI Verified'}</span>
          </div>
        )}

        {/* Discount Badge */}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded-md text-[10px] shadow">
            -{product.discountPercentage}%
          </div>
        )}

        {/* Quick View Floating Button */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 bg-white text-slate-800 rounded-full shadow-lg hover:bg-emerald-600 hover:text-white transition transform scale-90 group-hover:scale-100"
            title={language === 'bn' ? 'বিস্তারিত দেখুন' : 'Quick View'}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Delete Option if handler passed */}
          {onDeleteProduct && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(language === 'bn' ? 'আপনি কি এই প্রোডাক্ট কার্ডটি ডিলিট করতে চান?' : 'Are you sure you want to delete this product card?')) {
                  onDeleteProduct(product.id);
                }
              }}
              className="p-2.5 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 transition transform scale-90 group-hover:scale-100"
              title={language === 'bn' ? 'কার্ড মুছে ফেলুন' : 'Delete Card'}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Seller / Origin */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="truncate max-w-[150px] font-medium text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              {language === 'bn' ? product.sellerNameBn : product.sellerNameEn}
            </span>
            <span className="text-slate-400 font-normal">{product.origin}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-emerald-600 cursor-pointer transition mb-2"
          >
            {language === 'bn' ? product.nameBn : product.nameEn}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-800">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-base font-extrabold text-slate-900">
              ৳ {product.price.toLocaleString('bn-BD')}
            </div>
            {product.originalPrice && (
              <div className="text-[11px] text-slate-400 line-through">
                ৳ {product.originalPrice.toLocaleString('bn-BD')}
              </div>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm hover:shadow-emerald-600/30"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'কার্টে রাখুন' : 'Add'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
