import React, { useState } from 'react';
import { CategoryId, ConfigState, Product, Language } from '../types';
import { PRODUCTS, UI_STRINGS } from '../constants';
import { ProductCard } from './ProductCard';
import { Box, Lightbulb, Monitor, Cpu, Watch, Sparkles } from 'lucide-react';

interface ConfiguratorPanelProps {
  selections: ConfigState;
  onSelectionChange: (categoryId: CategoryId, productId: string) => void;
  lang: Language;
}

export const ConfiguratorPanel: React.FC<ConfiguratorPanelProps> = ({ selections, onSelectionChange, lang }) => {
  const [activeTab, setActiveTab] = useState<CategoryId>(CategoryId.DESK);

  const icons = {
    [CategoryId.DESK]: Box,
    [CategoryId.LIGHT]: Lightbulb,
    [CategoryId.TERMINAL]: Monitor,
    [CategoryId.WEARABLES]: Watch,
    [CategoryId.COBRANDED]: Sparkles,
    [CategoryId.ACCESSORIES]: Cpu
  };

  const currentCategory = PRODUCTS.find(c => c.id === activeTab);

  const handleProductSelect = (product: Product) => {
    onSelectionChange(product.categoryId, product.id);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-100 p-2 gap-2 bg-gray-50/50">
        {PRODUCTS.map((category) => {
          const Icon = icons[category.id] || Cpu;
          const isActive = activeTab === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${isActive 
                  ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' 
                  : 'text-gray-500 hover:bg-white/60 hover:text-gray-700'
                }
              `}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {category.title[lang]}
            </button>
          );
        })}
      </div>

      {/* Product Grid Area */}
      <div className="flex-grow p-6 overflow-y-auto bg-gray-50/30">
        <div className="w-full">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">{currentCategory?.title[lang]}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {currentCategory?.multiSelect 
                ? UI_STRINGS.selectMulti[lang]
                : UI_STRINGS.selectSingle[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {currentCategory?.items.map((product) => {
              // Determine if selected based on category type
              let isSelected = false;
              if (currentCategory.id === CategoryId.ACCESSORIES) {
                isSelected = selections.accessories.includes(product.id);
              } else if (currentCategory.id === CategoryId.WEARABLES) {
                isSelected = selections.wearables.includes(product.id);
              } else if (currentCategory.id === CategoryId.COBRANDED) {
                isSelected = selections.cobranded.includes(product.id);
              } else {
                isSelected = selections[currentCategory.id as keyof Omit<ConfigState, 'accessories'|'wearables'|'cobranded'>] === product.id;
              }

              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isSelected={isSelected}
                  onSelect={handleProductSelect}
                  lang={lang}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};