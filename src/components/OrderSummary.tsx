import React from 'react';
import { SelectedEgg, Hen } from '../types';
import { ShoppingBag, Check } from 'lucide-react';

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
  const countsByHen: { [henId: string]: number } = {};
  selectedEggs.forEach((item) => {
    countsByHen[item.hen.id] = (countsByHen[item.hen.id] || 0) + 1;
  });

  return (
    <div className="modern-card rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-serif text-slate-950">
            Zusammenfassung deiner Auswahl
          </h3>
          <p className="text-xs text-slate-500">
            Übersicht aller Eier in deinem individuellen Karton
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {chickens.map((hen) => {
          const count = countsByHen[hen.id] || 0;
          if (count === 0) return null;
          const subtotal = count * hen.pricePerEgg;

          return (
            <div
              key={hen.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
            >
              <div className="flex items-center space-x-3">
                <img src={hen.image} alt={hen.name} className="w-9 h-9 rounded-full object-cover border border-amber-300" />
                <div>
                  <div className="font-bold text-slate-950 text-sm flex items-center gap-1.5">
                    {hen.name}
                    <span className={`w-2.5 h-2.5 rounded-full border egg-color-${hen.eggColor}`} />
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {count} Ei{count > 1 ? 'er' : ''} × {hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-slate-950 text-sm">
                  {subtotal.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </span>
                <div className="text-[10px] text-slate-400 font-mono">
                  ({count} × {hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-950 text-white rounded-2xl p-4 space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-xs text-slate-300 font-medium">Gesamtbetrag</span>
          <span className="text-2xl font-black text-amber-300 font-serif">
            {totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
          </span>
        </div>
        <div className="text-xs text-slate-300 font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <span className="text-amber-300 font-bold block mb-0.5">Formel / Herleitung:</span>
          {priceDerivation}
        </div>
      </div>
    </div>
  );
};
