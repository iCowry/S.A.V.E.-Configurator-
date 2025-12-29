import React, { useMemo } from 'react';
import { ConfigState, CategoryId, Language } from '../types';
import { PRODUCTS, UI_STRINGS } from '../constants';
import { Monitor, Lamp, AppWindow, Cpu, Box, Gamepad2, Disc } from 'lucide-react';

interface PreviewAreaProps {
  selections: ConfigState;
  lang: Language;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({ selections, lang }) => {
  // Helper to get full product object
  const getProduct = (catId: CategoryId, itemId: string) => {
    return PRODUCTS.find(c => c.id === catId)?.items.find(i => i.id === itemId);
  };

  const desk = getProduct(CategoryId.DESK, selections.desk);
  const light = getProduct(CategoryId.LIGHT, selections.light);
  const terminal = getProduct(CategoryId.TERMINAL, selections.terminal);
  
  // Memoize accessories list
  const activeAccessories = useMemo(() => {
    const accCategory = PRODUCTS.find(c => c.id === CategoryId.ACCESSORIES);
    if (!accCategory) return [];
    return accCategory.items.filter(item => selections.accessories.includes(item.id));
  }, [selections.accessories]);

  // Check for specific cockpit accessories
  const hasRacingWheel = activeAccessories.some(a => a.id === 'A12');
  const hasJoystick = activeAccessories.some(a => a.id === 'A11');
  const hasCockpitScreen = terminal?.id === 'T6';

  return (
    <div className={`h-full w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col overflow-hidden relative isolate transition-colors duration-700 ${hasCockpitScreen ? 'bg-slate-900 border-slate-800' : 'bg-white'}`}>
      
      {/* Background Decorative Elements - Dynamic based on mode */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-10 opacity-60 translate-x-1/3 -translate-y-1/3 transition-colors duration-700 ${hasCockpitScreen ? 'bg-cyan-900' : 'bg-blue-50'}`}></div>
      <div className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl -z-10 opacity-60 -translate-x-1/3 translate-y-1/3 transition-colors duration-700 ${hasCockpitScreen ? 'bg-purple-900' : 'bg-indigo-50'}`}></div>

      <div className="flex-none mb-8 relative z-10">
        <h2 className={`text-3xl font-bold tracking-tight transition-colors duration-500 ${hasCockpitScreen ? 'text-white' : 'text-gray-900'}`}>{UI_STRINGS.yourSpace[lang]}</h2>
        <p className={`mt-2 transition-colors duration-500 ${hasCockpitScreen ? 'text-cyan-400' : 'text-gray-500'}`}>{UI_STRINGS.visualization[lang]}</p>
      </div>

      {/* Visual Composition Area */}
      <div className="flex-grow flex items-center justify-center relative perspective-1000 min-h-[300px]">
        <div className="relative w-64 h-80 flex flex-col items-center justify-end">
          
          {/* Light Module */}
          <div 
             className={`
              absolute top-0 z-30 transition-all duration-700 ease-spring
              ${light ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}
            `}
          >
             <div className="relative flex flex-col items-center">
                {/* Lamp Head */}
                <div className={`w-48 h-2 rounded-full shadow-lg relative overflow-hidden ${hasCockpitScreen ? 'bg-cyan-500 shadow-cyan-500/50' : 'bg-gray-800'}`}>
                   {/* Light Beam Effect */}
                   <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent blur-sm"></div>
                </div>
                {/* Lamp Arm/Stand abstract */}
                <div className="w-1 h-32 bg-gray-400 -mt-1 rounded-full opacity-50"></div>
                <div className="absolute -top-12 bg-white/90 backdrop-blur border border-gray-200 px-3 py-1 rounded-full shadow-sm text-xs font-semibold text-gray-600 flex items-center gap-1 whitespace-nowrap">
                  <Lamp size={12} className="text-amber-500"/> {light?.name[lang] || UI_STRINGS.noLight[lang]}
                </div>
             </div>
          </div>

          {/* Terminal Module */}
          <div 
            className={`
              absolute bottom-24 z-20 transition-all duration-500 ease-out
              ${terminal ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
            `}
          >
            <div className="flex flex-col items-center">
               {/* Screen Representation */}
               <div className={`
                 relative bg-gray-900 rounded-lg shadow-2xl border-4 border-gray-800 flex items-center justify-center overflow-hidden transition-all duration-500
                 ${hasCockpitScreen 
                    ? 'w-72 h-32 rounded-3xl border-slate-900 ring-2 ring-cyan-500/50' // Cockpit Size
                    : (terminal?.id.includes('T4') || terminal?.id.includes('T5') ? 'w-48 h-32' : 'w-40 h-24') // Normal Sizes
                 }
               `}>
                 <div className={`absolute inset-0 opacity-50 bg-gradient-to-tr ${hasCockpitScreen ? 'from-cyan-900 via-blue-900 to-purple-900' : 'from-indigo-900 to-blue-900'}`}></div>
                 
                 {/* Screen Content Simulation */}
                 {hasCockpitScreen ? (
                    <div className="flex gap-1 items-center opacity-30">
                        <div className="w-16 h-20 border border-cyan-400/50 rounded flex items-center justify-center"><div className="w-8 h-8 rounded-full border border-cyan-400/50"></div></div>
                        <div className="w-32 h-24 border border-cyan-400/80 rounded flex items-center justify-center"><div className="w-10 h-1 bg-cyan-400/50"></div></div>
                        <div className="w-16 h-20 border border-cyan-400/50 rounded flex items-center justify-center"><div className="w-8 h-8 rounded-full border border-cyan-400/50"></div></div>
                    </div>
                 ) : (
                    <Monitor className="text-white/20 w-12 h-12" />
                 )}
                 
                 {/* Screen Glow */}
                 <div className={`absolute inset-0 blur-xl ${hasCockpitScreen ? 'bg-cyan-500/20' : 'bg-blue-500/10'}`}></div>
               </div>
               
               {/* Stand */}
               <div className="w-12 h-8 bg-gray-700 mt-[-2px]"></div>
               <div className="w-20 h-2 bg-gray-800 rounded-full"></div>

               <div className="absolute -right-24 top-1/2 bg-white/90 backdrop-blur border border-gray-200 px-3 py-1 rounded-full shadow-sm text-xs font-semibold text-gray-600 flex items-center gap-1 whitespace-nowrap">
                  <AppWindow size={12} className="text-blue-500"/> {terminal?.name[lang] || UI_STRINGS.noTerminal[lang]}
                </div>
            </div>
          </div>

          {/* Desk Module + Cockpit Accessories */}
          <div 
            className={`
              absolute bottom-0 z-10 w-full transition-all duration-500 ease-out
              ${desk ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
             <div className="relative flex flex-col items-center">
                {/* Racing Wheel visual */}
                {hasRacingWheel && (
                  <div className="absolute -top-16 z-40 animate-fadeIn">
                     <div className="w-20 h-20 rounded-full border-4 border-gray-800 relative flex items-center justify-center bg-gray-900/10">
                        <div className="w-20 h-2 bg-gray-800"></div>
                        <div className="w-2 h-20 bg-gray-800"></div>
                        <div className="w-4 h-4 rounded-full bg-red-600 absolute"></div>
                        <div className="absolute -top-6 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded-full">Wheel</div>
                     </div>
                     <div className="w-2 h-10 bg-gray-800 mx-auto -mt-2"></div>
                  </div>
                )}

                {/* Joystick visual */}
                {hasJoystick && !hasRacingWheel && (
                  <div className="absolute -top-14 right-10 z-40 animate-fadeIn">
                     <div className="w-4 h-16 bg-gray-800 rounded-t-lg relative transform rotate-12 origin-bottom">
                       <div className="w-6 h-8 bg-gray-700 rounded-t-lg absolute -top-2 -left-1"></div>
                       <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 left-2"></div>
                     </div>
                     <div className="w-12 h-2 bg-gray-600 rounded-full mt-0"></div>
                     <div className="absolute -top-8 -right-4 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded-full">Stick</div>
                  </div>
                )}

                {/* Desk Surface */}
                <div className={`w-64 h-4 rounded-lg shadow-xl border-b-4 relative transition-colors duration-500 ${hasCockpitScreen ? 'bg-slate-800 border-slate-900' : 'bg-amber-100 border-amber-200'}`}>
                   {/* Wood texture hint or Carbon Fiber hint */}
                   <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
                </div>
                {/* Legs */}
                <div className="w-56 flex justify-between">
                   <div className={`w-3 h-24 rounded-b-md ${hasCockpitScreen ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
                   <div className={`w-3 h-24 rounded-b-md ${hasCockpitScreen ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
                </div>
                 <div className="absolute -left-20 top-10 bg-white/90 backdrop-blur border border-gray-200 px-3 py-1 rounded-full shadow-sm text-xs font-semibold text-gray-600 flex items-center gap-1 whitespace-nowrap">
                  <Box size={12} className="text-amber-700"/> {desk?.name[lang] || UI_STRINGS.noDesk[lang]}
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Accessories Floating Chips */}
      <div className={`flex-none min-h-[80px] pt-4 border-t transition-colors duration-500 ${hasCockpitScreen ? 'border-slate-800' : 'border-gray-100'}`}>
        <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 ${hasCockpitScreen ? 'text-slate-500' : 'text-gray-400'}`}>{UI_STRINGS.installedModules[lang]}</h3>
        <div className="flex flex-wrap gap-2">
          {activeAccessories.length === 0 && (
             <span className="text-sm text-gray-300 italic">{UI_STRINGS.noAccessories[lang]}</span>
          )}
          {activeAccessories.map(acc => (
            <div key={acc.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-xs font-medium text-gray-600 animate-fadeIn">
              {acc.id === 'A12' ? <Disc size={12} className="text-red-500"/> : 
               acc.id === 'A11' ? <Gamepad2 size={12} className="text-red-500"/> :
               <Cpu size={12} className="text-indigo-500"/>}
              {acc.name[lang]}
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .ease-spring { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};