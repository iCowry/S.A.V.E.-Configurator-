import React, { useState, useMemo, useEffect } from 'react';
import { ConfigState, CategoryId, Language } from './types';
import { INITIAL_STATE, PRODUCTS, UI_STRINGS } from './constants';
import { PreviewArea } from './components/PreviewArea';
import { ConfiguratorPanel } from './components/ConfiguratorPanel';
import { SummaryBar } from './components/SummaryBar';
import { CheckoutModal } from './components/CheckoutModal';
import { Sparkles, Globe } from 'lucide-react';

const App = () => {
  const [selections, setSelections] = useState<ConfigState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Trigger simple entry animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSelectionChange = (categoryId: CategoryId, productId: string) => {
    setSelections(prev => {
      const newState = { ...prev };

      if (categoryId === CategoryId.ACCESSORIES) {
        // Toggle logic for multi-select
        const currentAccessories = newState.accessories;
        if (currentAccessories.includes(productId)) {
          newState.accessories = currentAccessories.filter(id => id !== productId);
        } else {
          newState.accessories = [...currentAccessories, productId];
        }
      } else {
        // Single select replacement logic
        // Use type assertion to satisfy TypeScript index signature for specific keys
        (newState as any)[categoryId] = productId;
      }

      return newState;
    });
  };

  const { totalPrice, summaryText } = useMemo(() => {
    let total = 0;
    const summaryParts: string[] = [];

    // Helper to find name and price
    const findAndAdd = (catId: CategoryId, itemId: string) => {
      const category = PRODUCTS.find(c => c.id === catId);
      const item = category?.items.find(i => i.id === itemId);
      if (item) {
        total += item.price;
        summaryParts.push(item.name[lang]); // Use localized name
      }
    };

    findAndAdd(CategoryId.DESK, selections.desk);
    findAndAdd(CategoryId.LIGHT, selections.light);
    findAndAdd(CategoryId.TERMINAL, selections.terminal);
    
    selections.accessories.forEach(accId => {
       findAndAdd(CategoryId.ACCESSORIES, accId);
    });

    return { totalPrice: total, summaryText: summaryParts.join(' + ') };
  }, [selections, lang]);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
               <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">S.A.V.E.</span>
            <span className="hidden sm:inline-block text-gray-400 mx-2">|</span>
            <span className="hidden sm:inline-block text-sm text-gray-500 font-medium">{UI_STRINGS.headerSubtitle[lang]}</span>
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setLang(l => l === 'en' ? 'zh' : 'en')}
               className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
             >
                <Globe size={14} />
                {lang === 'en' ? 'EN' : '中文'}
             </button>
             <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                BETA v1.1
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 md:px-6 lg:px-8 gap-6 grid grid-cols-1 lg:grid-cols-12 items-start relative">
        
        {/* Left Column: Preview (Sticky on Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-[calc(100vh-160px)] min-h-[400px]">
          <PreviewArea selections={selections} lang={lang} />
        </div>

        {/* Right Column: Controls */}
        <div className="lg:col-span-7 h-full min-h-[500px]">
          <ConfiguratorPanel 
            selections={selections} 
            onSelectionChange={handleSelectionChange} 
            lang={lang}
          />
        </div>
      </main>

      {/* Sticky Bottom Bar */}
      <SummaryBar 
        totalPrice={totalPrice} 
        summaryText={summaryText} 
        lang={lang} 
        onBuyClick={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        selections={selections} 
        lang={lang} 
      />
    </div>
  );
};

export default App;