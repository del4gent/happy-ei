import React from 'react';
import { Hen } from '../types';
import { X, Egg, Award } from 'lucide-react';

interface ChickenDetailModalProps {
  hen: Hen | null;
  onClose: () => void;
  onAddEgg: (hen: Hen) => void;
  henEggCount: number;
}

export const ChickenDetailModal: React.FC<ChickenDetailModalProps> = ({
  hen,
  onClose,
  onAddEgg,
  henEggCount
}) => {
  if (!hen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-60 w-full bg-slate-100">
          <img
            src={hen.image}
            alt={hen.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
              {hen.breed}
            </span>
            <h2 className="text-3xl font-black font-serif">
              {hen.name}
            </h2>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-4 text-sm text-slate-700">
          <p className="leading-relaxed">
            {hen.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Eierfarbe</div>
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full border egg-color-${hen.eggColor}`} />
                {hen.eggColorName}
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Ei-Größe &amp; Preis</div>
              <div className="font-bold text-slate-900">
                Größe {hen.eggSize} ({hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-600">
            Im Karton: <strong className="text-slate-900">{henEggCount} Eier</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold"
            >
              Schließen
            </button>
            <button
              onClick={() => {
                onAddEgg(hen);
                onClose();
              }}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs shadow flex items-center gap-1.5"
            >
              <Egg className="w-3.5 h-3.5 fill-slate-950" />
              <span>Ei wählen ({hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
