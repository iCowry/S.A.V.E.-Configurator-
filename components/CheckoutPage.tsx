import React, { useMemo, useState } from 'react';
import { ArrowLeft, CreditCard, ShoppingBag, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ConfigState, CategoryId, Language, Product } from '../types';
import { PRODUCTS, UI_STRINGS } from '../constants';

interface CheckoutPageProps {
  selections: ConfigState;
  lang: Language;
  onBack: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ selections, lang, onBack }) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate order details (reused logic)
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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsOrderComplete(true);
    }, 1500);
  };

  if (isOrderComplete) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-fadeIn">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">{UI_STRINGS.orderCompleteTitle[lang]}</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">{UI_STRINGS.orderCompleteDesc[lang]}</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-colors"
        >
          {UI_STRINGS.returnHome[lang]}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col animate-fadeIn">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1800px] mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} />
            {UI_STRINGS.backToConfig[lang]}
          </button>
          <div className="font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck size={18} className="text-green-600" />
            {UI_STRINGS.secureCheckout[lang]}
          </div>
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>
      </header>

      <main className="flex-grow max-w-[1800px] mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Shipping Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <Truck className="text-blue-600" size={24} />
              {UI_STRINGS.shippingDetails[lang]}
            </h2>
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">{UI_STRINGS.fullName[lang]}</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 uppercase">{UI_STRINGS.phone[lang]}</label>
                <input required type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">{UI_STRINGS.email[lang]}</label>
                <input required type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">{UI_STRINGS.address[lang]}</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
            </form>
          </section>

          {/* Payment Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
              <CreditCard className="text-blue-600" size={24} />
              {UI_STRINGS.paymentMethod[lang]}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <label className="cursor-pointer border-2 border-blue-600 bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all">
                <input type="radio" name="payment" className="hidden" defaultChecked />
                <span className="font-bold text-gray-900">{UI_STRINGS.wechatPay[lang]}</span>
              </label>
              <label className="cursor-pointer border border-gray-200 hover:border-blue-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all opacity-60">
                <input type="radio" name="payment" className="hidden" disabled />
                <span className="font-medium text-gray-600">{UI_STRINGS.alipay[lang]}</span>
              </label>
              <label className="cursor-pointer border border-gray-200 hover:border-blue-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all opacity-60">
                <input type="radio" name="payment" className="hidden" disabled />
                <span className="font-medium text-gray-600">{UI_STRINGS.creditCard[lang]}</span>
              </label>
            </div>
          </section>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5">
           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center justify-between">
                <span>{UI_STRINGS.checkoutTitle[lang]}</span>
                <span className="text-sm font-normal text-gray-500">{items.length} {UI_STRINGS.itemLabel[lang]}</span>
              </h2>

              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <div className="text-xs text-blue-600 font-semibold mb-0.5">{item.categoryName}</div>
                      <div className="text-sm font-medium text-gray-900">{item.product.name[lang]}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[180px]">{item.product.description[lang]}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">¥{item.product.price.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 mb-6">
                 <div className="flex justify-between text-gray-500 text-sm">
                    <span>{UI_STRINGS.totalEstimate[lang]}</span>
                    <span>¥{totalPrice.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-gray-900 text-2xl font-bold">
                    <span>{UI_STRINGS.totalLabel[lang]}</span>
                    <span>¥{totalPrice.toLocaleString()}</span>
                 </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <ShoppingBag size={20} />
                    {UI_STRINGS.placeOrder[lang]}
                  </>
                )}
              </button>
           </div>
        </div>
      </main>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};