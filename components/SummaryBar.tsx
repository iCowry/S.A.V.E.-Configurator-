import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { UI_STRINGS } from '../constants';
import { Language } from '../types';

interface SummaryBarProps {
  totalPrice: number;
  summaryText: string;
  lang: Language;
  onBuyClick: () => void;
}

export const SummaryBar: React.FC<SummaryBarProps> = ({ totalPrice, summaryText, lang, onBuyClick }) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] px-4 py-4 md:py-6 safe-area-pb">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Summary Text */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{UI_STRINGS.configuration[lang]}</span>
          <span className="text-sm font-medium text-gray-600 flex flex-wrap justify-center gap-2">
            {summaryText.split('+').map((item, idx, arr) => (
               <span key={idx} className="flex items-center">
                 {item.trim()}
                 {idx < arr.length - 1 && <span className="mx-2 text-gray-300">/</span>}
               </span>
            ))}
          </span>
        </div>

        {/* Right: Price & CTA */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
             <span className="block text-xs font-medium text-gray-500">{UI_STRINGS.totalEstimate[lang]}</span>
             <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
               ¥{totalPrice.toLocaleString()}
             </span>
          </div>

          <button 
            className="group relative flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            onClick={onBuyClick}
          >
            <ShoppingBag size={18} className="group-hover:rotate-12 transition-transform"/>
            <span className="font-semibold text-sm md:text-base">{UI_STRINGS.buyNow[lang]}</span>
            <ChevronRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>
      </div>
    </div>
  );
};