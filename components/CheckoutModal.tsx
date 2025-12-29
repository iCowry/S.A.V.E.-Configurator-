import React, { useMemo } from 'react';
import { X, Check, Box, Lightbulb, Monitor, Cpu, Watch, Sparkles } from 'lucide-react';
import { ConfigState, CategoryId, Language, Product } from '../types';
import { PRODUCTS, UI_STRINGS } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selections: ConfigState;
  lang: Language;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onConfirm, selections, lang }) => {
  if (!isOpen) return null;

  // Icons helper
  const icons = {
    [CategoryId.DESK]: Box,
    [CategoryId.LIGHT]: Lightbulb,
    [CategoryId.TERMINAL]: Monitor,
    [CategoryId.ACCESSORIES]: Cpu,
    [CategoryId.WEARABLES]: Watch,
    [CategoryId.COBRANDED]: Sparkles
  };

  // Calculate items and total
  const { items, totalPrice } = useMemo(() => {
    const list: { product: Product; categoryId: CategoryId; categoryName: string }[] = [];
    let total = 0;

    const findAndAdd = (catId: CategoryId, itemId: string) => {
      const category = PRODUCTS.find(c => c.id === catId);
      const item = category?.items.find(i => i.id === itemId);
      if (item && category) {
        list.push({ 
          product: item, 
          categoryId: catId, 
          categoryName: category.title[lang] 
        });
        total += item.price;
      }
    };

    findAndAdd(CategoryId.DESK, selections.desk);
    findAndAdd(CategoryId.LIGHT, selections.light);
    findAndAdd(CategoryId.TERMINAL, selections.terminal);
    selections.wearables.forEach(id => findAndAdd(CategoryId.WEARABLES, id));
    selections.cobranded.forEach(id => findAndAdd(CategoryId.COBRANDED, id));
    selections.accessories.forEach(accId => {
      findAndAdd(CategoryId.ACCESSORIES, accId);
    });

    return { items: list, totalPrice: total };
  }, [selections, lang]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fadeInScale">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{UI_STRINGS.checkoutTitle[lang]}</h2>
            <p className="text-xs text-gray-500 mt-1">{UI_STRINGS.checkoutDesc[lang]}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white rounded-full text-gray-400 hover:text-gray-900 shadow-sm border border-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* List Area */}
        <div className="flex-grow overflow-y-auto max-h-[50vh] p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 pl-2">{UI_STRINGS.categoryLabel[lang]}</th>
                <th className="pb-3">{UI_STRINGS.itemLabel[lang]}</th>
                <th className="pb-3 text-right pr-2">{UI_STRINGS.priceLabel[lang]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item, idx) => {
                const Icon = icons[item.categoryId] || Cpu;
                return (
                  <tr key={`${item.categoryId}-${item.product.id}-${idx}`} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="p-1.5 bg-gray-100 rounded-md">
                          <Icon size={14} />
                        </div>
                        <span className="text-sm font-medium hidden sm:inline">{item.categoryName}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">{item.product.name[lang]}</span>
                        <span className="text-xs text-gray-400 line-clamp-1">{item.product.description[lang]}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right pr-2 text-sm font-medium text-gray-700 font-mono">
                      ¥{item.product.price.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer / Total */}
        <div className="px-6 py-6 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <span className="text-base font-medium text-gray-500">{UI_STRINGS.totalLabel[lang]}</span>
            <span className="text-3xl font-bold text-gray-900 tracking-tight">¥{totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-colors"
            >
              {UI_STRINGS.cancel[lang]}
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Check size={18} />
              {UI_STRINGS.confirmOrder[lang]}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
