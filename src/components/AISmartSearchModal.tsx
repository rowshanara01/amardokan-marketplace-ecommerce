import React, { useState } from 'react';
import { X, Sparkles, Camera, Mic, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { Language, Product } from '../types';

interface AISmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSearchApply: (term: string) => void;
}

export const AISmartSearchModal: React.FC<AISmartSearchModalProps> = ({
  isOpen,
  onClose,
  language,
  onSearchApply,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  if (!isOpen) return null;

  const sampleSearchQueries = [
    'রূপগঞ্জের অরিজিনাল ১০০ কাউন্ট জামদানি শাড়ি',
    'ঈদের জন্য পিওর কটন এমব্রয়ডারি পাঞ্জাবি',
    'সুন্দরবনের চাকের ভেজালমুক্ত কাঁচা মধু',
    'যশোরের হাতে সেলাই করা কিংসাইজ নকশী কাঁথা',
    'হাজারীবাগের ১০০% ফুল গ্রেইন চামড়ার মানিব্যাগ',
  ];

  const handleSimulateVisualSearch = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      onSearchApply('জামদানি');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-emerald-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h2 className="font-extrabold text-base">
              {language === 'bn' ? 'আমারদোকান এআই স্মার্ট সার্চ' : 'AmarDokan AI Smart Search'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Visual Search Box */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center shadow-md">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-xs text-slate-900">
                {language === 'bn' ? 'ছবি দিয়ে পণ্য খুঁজুন (এআই ফটো রিকগনিশন)' : 'Search by Product Image (AI Image Recognition)'}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1">
                {language === 'bn' ? 'যেকোনো শাড়ি, হস্তশিল্প বা কাপড়ের ছবি আপলোড করলে এআই হুবহু পণ্য খুঁজে বের করবে।' : 'Upload any cloth or craft photo to match authentic artisans.'}
              </p>
            </div>

            <button
              onClick={handleSimulateVisualSearch}
              disabled={analyzing}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{analyzing ? 'এআই ফটো অ্যানালাইসিস চলছে...' : 'ডেমো ইমেজ অ্যানালাইসিস করুন'}</span>
            </button>
          </div>

          {/* Prompt Suggestions */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700">
              {language === 'bn' ? 'জনপ্রিয় এআই সার্চ কুয়েরি:' : 'Popular AI Prompts:'}
            </h4>
            <div className="space-y-2">
              {sampleSearchQueries.map((query, i) => (
                <button
                  key={i}
                  onClick={() => {
                    onSearchApply(query);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 transition flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{query}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
