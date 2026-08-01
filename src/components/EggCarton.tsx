import React from 'react';
import { SelectedEgg, CartonCapacity, Hen } from '../types';
import { Egg, Trash2, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

interface EggCartonProps {
  selectedEggs: SelectedEgg[];
  cartonCapacity: CartonCapacity;
  onCapacityChange: (capacity: CartonCapacity) => void;
  onRemoveEggAtSlot: (slotIndex: number) => void;
  onClearCarton: () => void;
  onOpenCheckout: () => void;
  totalPrice: number;
  priceDerivation: string;
}

export const EggCarton: React.FC<EggCartonProps> = ({
  selectedEggs,
  cartonCapacity,
  onCapacityChange,
  onRemoveEggAtSlot,
  onClearCarton,
  onOpenCheckout,
  totalPrice,
  priceDerivation,
}) => {
  // Map slots array [0..cartonCapacity-1]
  const slots = Array.from({ length: cartonCapacity }, (_, i) => i);
  const filledCount = selectedEggs.length;
  const isFull = filledCount === cartonCapacity;

  return (
    <div className="bg-gradient-to-b from-amber-100/60 to-farm-wood-200/50 rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200/80 relative overflow-hidden">
      {/* Decorative Carton Texture / Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-300/60">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest bg-amber-200/60 px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Dein individueller Karton</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-farm-wood-900">
            Eierkarton-Mix ({filledCount}/{cartonCapacity} Eier)
          </h2>
          <p className="text-xs text-amber-900/80 mt-1">
            Klicke auf ein Ei, um es aus der Schachtel zu nehmen.
          </p>
        </div>

        {/* Carton Size Selector */}
        <div className="flex items-center space-x-2 bg-white/80 backdrop-blur p-1.5 rounded-2xl border border-amber-200 shadow-sm self-start md:self-auto">
          <span className="text-xs font-bold text-slate-600 px-2">Größe:</span>
          {([6, 10, 12] as CartonCapacity[]).map((cap) => (
            <button
              key={cap}
              onClick={() => onCapacityChange(cap)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                cartonCapacity === cap
                  ? 'bg-farm-blue-900 text-white shadow-md scale-105'
                  : 'bg-transparent text-slate-700 hover:bg-amber-100/80'
              }`}
            >
              {cap}er Box
            </button>
          ))}
        </div>
      </div>

      {/* Visual Egg Carton Grid */}
      <div className="my-8">
        <div className={`grid gap-4 sm:gap-6 ${
          cartonCapacity === 6 
            ? 'grid-cols-3 sm:grid-cols-6' 
            : cartonCapacity === 10 
            ? 'grid-cols-5 sm:grid-cols-5' 
            : 'grid-cols-4 sm:grid-cols-6'
        }`}>
          {slots.map((slotIdx) => {
            const eggInSlot = selectedEggs.find((e) => e.slotIndex === slotIdx);

            return (
              <div
                key={slotIdx}
                className="relative aspect-square flex flex-col items-center justify-center"
              >
                {/* Empty Slot Holder */}
                <div className={`w-full h-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${
                  eggInSlot 
                    ? 'border-transparent bg-white/40 shadow-inner' 
                    : 'border-amber-400/50 bg-white/20 hover:bg-white/40'
                }`}>
                  {eggInSlot ? (
                    /* Placed Egg */
                    <button
                      onClick={() => onRemoveEggAtSlot(slotIdx)}
                      className="group/egg relative w-full h-full p-2 flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                      title={`${eggInSlot.hen.name}s Ei entfernen`}
                    >
                      {/* Realistic 3D Egg Shape */}
                      <div className={`relative w-12 h-16 sm:w-14 sm:h-18 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-lg border-2 flex items-center justify-center transition-all duration-300 egg-color-${eggInSlot.hen.eggColor}`}>
                        {/* Miniature Hen Avatar */}
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white shadow-md transform -translate-y-1">
                          <img
                            src={eggInSlot.hen.image}
                            alt={eggInSlot.hen.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Hover remove indicator overlay */}
                        <div className="absolute inset-0 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-red-600/80 text-white opacity-0 group-hover/egg:opacity-100 flex items-center justify-center transition-opacity">
                          <Trash2 className="w-5 h-5 animate-pulse" />
                        </div>
                      </div>

                      {/* Hen Label under Egg */}
                      <span className="mt-1 text-[11px] font-extrabold text-slate-800 truncate max-w-full px-1">
                        {eggInSlot.hen.name}
                      </span>
                    </button>
                  ) : (
                    /* Empty Placeholder Slot */
                    <div className="text-center text-amber-700/60 p-2">
                      <Egg className="w-6 h-6 mx-auto opacity-30 stroke-1" />
                      <span className="text-[10px] font-bold block mt-1">Platz {slotIdx + 1}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carton Footer & Price Derivation */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-5 border border-amber-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-amber-900 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
            <span>Preisberechnung &amp; Herleitung:</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-serif mt-0.5">
            {totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-xs text-slate-600 font-mono mt-0.5">
            {priceDerivation}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          {filledCount > 0 && (
            <button
              onClick={onClearCarton}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-red-600 hover:border-red-300 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Leeren
            </button>
          )}

          <button
            onClick={onOpenCheckout}
            disabled={filledCount === 0}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
          >
            <Egg className="w-4 h-4 fill-slate-950" />
            <span>Jetzt bestellen ({filledCount} Eier)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
