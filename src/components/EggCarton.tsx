import React from 'react';
import { SelectedEgg, CartonCapacity } from '../types';
import { Egg, RefreshCw, CheckCircle2, ShoppingBag } from 'lucide-react';

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
    <div className="modern-card rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Header & Size Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-black font-serif text-slate-950">
            Dein Eierkarton ({filledCount}/{cartonCapacity} Eier)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Klicke auf ein Ei im Karton, um es herauszunehmen.
          </p>
        </div>

        {/* Capacity pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
          <span className="text-xs font-bold text-slate-500 px-2">Größe:</span>
          {([6, 10, 12] as CartonCapacity[]).map((cap) => (
            <button
              key={cap}
              onClick={() => onCapacityChange(cap)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                cartonCapacity === cap
                  ? 'bg-slate-950 text-white shadow-md'
                  : 'bg-transparent text-slate-600 hover:bg-white'
              }`}
            >
              {cap}er Box
            </button>
          ))}
        </div>
      </div>

      {/* Modern Egg Grid */}
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
                eggInSlot ? 'border-amber-300 bg-amber-50/50 shadow-sm' : 'border-slate-200 bg-slate-50/50'
              }`}>
                {eggInSlot ? (
                  <button
                    onClick={() => onRemoveEggAtSlot(slotIdx)}
                    className="w-full h-full p-2 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                    title={`${eggInSlot.hen.name}s Ei entfernen`}
                  >
                    <div className={`relative w-11 h-14 sm:w-12 sm:h-16 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow border-2 flex items-center justify-center egg-color-${eggInSlot.hen.eggColor}`}>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-white shadow">
                        <img src={eggInSlot.hen.image} alt={eggInSlot.hen.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <span className="mt-1 text-[11px] font-extrabold text-slate-900 truncate max-w-full">
                      {eggInSlot.hen.name}
                    </span>
                  </button>
                ) : (
                  <div className="text-center text-slate-400">
                    <Egg className="w-4 h-4 mx-auto opacity-30" />
                    <span className="text-[10px] font-bold block mt-0.5 text-slate-400">Pl. {slotIdx + 1}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtotal & Formula Box */}
      <div className="bg-slate-950 text-white rounded-2xl p-5 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
            <span>Berechneter Gesamtpreis:</span>
          </div>
          <div className="text-3xl font-black text-amber-300 font-serif mt-0.5">
            {totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </div>
          <div className="text-xs text-slate-300 font-mono mt-1 bg-slate-900 p-2 rounded-xl border border-slate-800">
            {priceDerivation}
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {filledCount > 0 && (
            <button
              onClick={onClearCarton}
              className="px-3.5 py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-400/40 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Leeren
            </button>
          )}

          <button
            onClick={onOpenCheckout}
            disabled={filledCount === 0}
            className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-black text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Jetzt bestellen ({filledCount} Eier)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
