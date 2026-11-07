import React from 'react';
import { categories } from '../data/categories';
import { Language } from '../types';
import { LayoutGrid, Sparkles, Shirt, Apple, Palette, ShoppingBag } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  language: Language;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Apple: <Apple className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  ShoppingBag: <ShoppingBag className="w-4 h-4" />,
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  language,
}) => {
  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const icon = ICON_MAP[cat.icon] || <LayoutGrid className="w-4 h-4" />;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-600 ring-offset-1'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{icon}</span>
                <span>{language === 'bn' ? cat.nameBn : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
