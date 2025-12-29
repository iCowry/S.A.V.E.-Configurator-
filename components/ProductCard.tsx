import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Product, Language } from '../types';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
  lang: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isSelected, onSelect, lang }) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className={`
        relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group
        ${isSelected 
          ? 'border-blue-500 bg-blue-50/50 shadow-md ring-1 ring-blue-500/20' 
          : 'border-white bg-white hover:border-blue-200 hover:shadow-lg shadow-sm'
        }
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className={`font-semibold text-base ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
            {product.name[lang]}
          </h3>
          {product.badge && (
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
              {product.badge[lang]}
            </span>
          )}
        </div>
        <div className={`
          flex items-center justify-center w-6 h-6 rounded-full transition-colors duration-300
          ${isSelected ? 'text-blue-500' : 'text-gray-300 group-hover:text-blue-300'}
        `}>
          {isSelected ? <CheckCircle2 size={24} fill="currentColor" className="text-white bg-blue-500 rounded-full" /> : <Circle size={24} />}
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px] leading-relaxed">
        {product.description[lang]}
      </p>
      
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
         <span className={`text-lg font-bold ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
          ¥{product.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};