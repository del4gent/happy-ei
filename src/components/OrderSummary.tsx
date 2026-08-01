import React from 'react';
import { SelectedEgg, Hen } from '../types';
import { Egg, Check, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';

interface OrderSummaryProps {
  selectedEggs: SelectedEgg[];
  chickens: Hen[];
  totalPrice: number;
  priceDerivation: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedEggs,
  chickens,
  totalPrice,
  priceDerivation,
}) => {
  // Count eggs per hen
  const countsByHen: { [henId: string]: number } = {};
  selectedEggs.forEach((item) => {
    countsByHen[item.hen.id] = (countsByHen[item.hen.id] || 0) + 1;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-serif text-slate-900">
            Zusammenfassung deiner Auswahl
          </h3>
          <p className="text-xs text-slate-500">
            Übersicht aller Eier in deinem individuellen Karton
          </p>
        </div>
      </div>

      {/* List per hen */}
      <div className="space-y-3">
        {chickens.map((hen) => {
          const count = countsByHen[hen.id] || 0;
          if (count === 0) return null;
          const subtotal = count * hen.pricePerEgg;

          return (
            <div
              key={hen.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/40 border border-amber-100/80"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-300 shadow-sm shrink-0">
                  <img src={hen.image} alt={hen.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    {hen.name}
                    <span className={`w-2.5 h-2.5 rounded-full border egg-color-${hen.eggColor}`} />
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {count} Ei{count > 1 ? 'er' : ''} × {hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-slate-900 text-sm">
                  {subtotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  ({count} × {hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})
                </div>
              </div>
            </div>
          );
        })}

        {selectedEggs.length === 0 && (
          <p className="text-sm text-slate-400 text-center py-6 italic">
            Dein Karton ist noch leer. Wähle oben Hühner aus!
          </p>
        )}
      </div>

      {/* Price Derivation Box (User global memory rule adherence) */}
      <div className="bg-farm-blue-900 text-white rounded-2xl p-4 space-y-2 shadow-inner">
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-blue-200 font-medium">Gesamtsumme (inkl. Bio-Standard)</span>
          <span className="text-2xl font-black text-amber-300 font-serif">
            {totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
        </div>
        <div className="text-xs text-blue-100/90 font-mono bg-farm-blue-950/70 p-2.5 rounded-xl border border-blue-700/50">
          <span className="text-amber-300 font-bold block mb-0.5">Herleitung / Formel:</span>
          {priceDerivation}
        </div>
      </div>
    </div>
  );
};
