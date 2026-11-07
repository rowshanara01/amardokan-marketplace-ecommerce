import React from 'react';
import { Product, Language } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, PackageX, Plus } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  language: Language;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onOpenAdminPanel: () => void;
  isAdmin?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  language,
  onQuickView,
  onAddToCart,
  onDeleteProduct,
  onOpenAdminPanel,
  isAdmin = false,
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{language === 'bn' ? 'সরাসরি তাঁতি ও কারিগরদের থেকে' : 'Directly from Heritage Artisans'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'bn' ? 'আমাদের বিশেষ প্রোডাক্ট কালেকশন' : 'Featured Product Collection'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            {language === 'bn'
              ? `মোট ${products.length} টি পণ্য পাওয়া গেছে`
              : `${products.length} Products Available`}
          </span>

          {isAdmin && (
            <button
              onClick={onOpenAdminPanel}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition border border-amber-400/40"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'bn' ? 'নতুন পণ্য যোগ করুন (Admin)' : 'Add Product'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8 shadow-sm">
          <PackageX className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">
            {language === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No Products Found'}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {language === 'bn'
              ? 'আপনার অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোনো পণ্য নেই।'
              : 'No products matched your search or category filter.'}
          </p>
          {isAdmin && (
            <button
              onClick={onOpenAdminPanel}
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow hover:bg-emerald-500 transition"
            >
              {language === 'bn' ? 'এডমিন প্যানেলে নতুন পণ্য যোগ করুন' : 'Add New Product in Admin'}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              language={language}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onDeleteProduct={isAdmin ? onDeleteProduct : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
};
