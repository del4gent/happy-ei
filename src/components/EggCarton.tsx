import React from 'react';
import { SelectedEgg, CartonCapacity } from '../types';
import { Egg, RefreshCw, CheckCircle2 } from 'lucide-react';

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
  const slots = Array.from({ length: cartonCapacity }, (_, i) => i);
  const filledCount = selectedEggs.length;

  return (
    <div className="bg-gradient-to-b from-amber-100/60 to-amber-50 rounded-3xl p-6 sm:p-8 shadow-md border border-amber-200/80 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
        <div>
          <h2 className="text-2xl font-black font-serif text-slate-900">
            Dein Eierkarton ({filledCount}/{cartonCapacity} Eier)
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Klicke auf ein Ei im Karton, um es wieder zu entfernen.
          </p>
        </div>

        {/* Box Size Selector */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-amber-200 shadow-sm self-start sm:self-auto">
          <span className="text-xs font-bold text-slate-500 px-2">Größe:</span>
          {([6, 10, 12] as CartonCapacity[]).map((cap) => (
            <button
              key={cap}
              onClick={() => onCapacityChange(cap)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                cartonCapacity === cap
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-transparent text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cap}er Box
            </button>
          ))}
        </div>
      </div>

      {/* Visual Carton Grid */}
      <div className={`grid gap-3 sm:gap-4 ${
        cartonCapacity === 6 
          ? 'grid-cols-3 sm:grid-cols-6' 
          : cartonCapacity === 10 
          ? 'grid-cols-5 sm:grid-cols-5' 
          : 'grid-cols-4 sm:grid-cols-6'
      }`}>
        {slots.map((slotIdx) => {
          const eggInSlot = selectedEggs.find((e) => e.slotIndex === slotIdx);

          return (
            <div key={slotIdx} className="aspect-square flex items-center justify-center">
              <div className={`w-full h-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${
                eggInSlot ? 'border-transparent bg-white/60 shadow-inner' : 'border-amber-300/60 bg-white/30'
              }`}>
                {eggInSlot ? (
                  <button
                    onClick={() => onRemoveEggAtSlot(slotIdx)}
                    className="w-full h-full p-2 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                    title={`${eggInSlot.hen.name}s Ei entfernen`}
                  >
                    <div className={`relative w-12 h-16 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow border-2 flex items-center justify-center egg-color-${eggInSlot.hen.eggColor}`}>
                      <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white shadow">
                        <img src={eggInSlot.hen.image} alt={eggInSlot.hen.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <span className="mt-1 text-[11px] font-extrabold text-slate-800 truncate max-w-full">
                      {eggInSlot.hen.name}
                    </span>
                  </button>
                ) : (
                  <div className="text-center text-amber-700/50">
                    <Egg className="w-5 h-5 mx-auto opacity-30" />
                    <span className="text-[10px] font-bold block mt-0.5">Frei</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Carton Summary Footer with Formula */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
            <span>Berechneter Gesamtpreis:</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-serif">
            {totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-xs text-slate-500 font-mono mt-0.5">
            {priceDerivation}
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {filledCount > 0 && (
            <button
              onClick={onClearCarton}
              className="px-3 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:text-red-600 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Leeren
            </button>
          )}

          <button
            onClick={onOpenCheckout}
            disabled={filledCount === 0}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-black text-sm shadow transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Egg className="w-4 h-4 fill-slate-950" />
            <span>Jetzt bestellen ({filledCount} Eier)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
