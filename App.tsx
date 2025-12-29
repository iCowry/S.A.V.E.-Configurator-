import React, { useState, useMemo, useEffect } from 'react';
import { ConfigState, CategoryId, Language } from './types';
import { INITIAL_STATE, PRODUCTS, UI_STRINGS } from './constants';
import { PreviewArea } from './components/PreviewArea';
import { ConfiguratorPanel } from './components/ConfiguratorPanel';
import { SummaryBar } from './components/SummaryBar';
import { CheckoutModal } from './components/CheckoutModal';
import { CheckoutPage } from './components/CheckoutPage';
import { Sparkles, Globe } from 'lucide-react';

const App = () => {
  const [selections, setSelections] = useState<ConfigState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState<Language>('zh');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [view, setView] = useState<'configurator' | 'checkout'>('configurator');

  // Trigger simple entry animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSelectionChange = (categoryId: CategoryId, productId: string) => {
    setSelections(prev => {
      const newState = { ...prev };

      // Handle Multi-select categories
      if (
        categoryId === CategoryId.ACCESSORIES || 
        categoryId === CategoryId.WEARABLES || 
        categoryId === CategoryId.COBRANDED
      ) {
        const currentSelection = newState[categoryId] as string[];
        if (currentSelection.includes(productId)) {
          // Remove
          (newState as any)[categoryId] = currentSelection.filter(id => id !== productId);
        } else {
          // Add
          (newState as any)[categoryId] = [...currentSelection, productId];
        }
      } else {
        // Single select replacement logic
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
    
    selections.wearables.forEach(id => findAndAdd(CategoryId.WEARABLES, id));
    selections.cobranded.forEach(id => findAndAdd(CategoryId.COBRANDED, id));
    selections.accessories.forEach(id => findAndAdd(CategoryId.ACCESSORIES, id));

    return { totalPrice: total, summaryText: summaryParts.join(' + ') };
  }, [selections, lang]);

  // Handle View: Checkout Page
  if (view === 'checkout') {
    return (
      <CheckoutPage 
        selections={selections} 
        lang={lang} 
        onBack={() => setView('configurator')} 
      />
    );
  }

  // Handle View: Configurator (Default)
  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
      <main className="flex-grow max-w-[1800px] mx-auto w-full px-4 py-6 md:px-6 lg:px-8 gap-6 grid grid-cols-1 lg:grid-cols-12 items-start relative">
        
        {/* Left Column: Preview (Sticky on Desktop) */}
        {/* Adjusted to 4 cols on XL screens to prioritize right content */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 lg:h-[calc(100vh-160px)] min-h-[400px]">
          <PreviewArea selections={selections} lang={lang} />
        </div>

        {/* Right Column: Controls */}
        {/* Expanded to 8 cols on XL screens to show more modules */}
        <div className="lg:col-span-7 xl:col-span-8 h-full min-h-[500px]">
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
        onConfirm={() => {
          setIsCheckoutOpen(false);
          setView('checkout');
          window.scrollTo(0, 0);
        }}
        selections={selections} 
        lang={lang} 
      />
    </div>
  );
};

export default App;