import React from 'react';
import { Hen } from '../types';
import { Egg, Plus, Minus, Info, Sparkles } from 'lucide-react';

interface ChickenCardProps {
  hen: Hen;
  selectedCount: number;
  onAddEgg: (hen: Hen) => void;
  onRemoveEgg: (hen: Hen) => void;
  onOpenDetails: (hen: Hen) => void;
  isCartonFull: boolean;
}

export const ChickenCard: React.FC<ChickenCardProps> = ({
  hen,
  selectedCount,
  onAddEgg,
  onRemoveEgg,
  onOpenDetails,
  isCartonFull
}) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-amber-100 flex flex-col justify-between hover:-translate-y-1">
      {/* Profile Picture Banner */}
      <div 
        className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-100 cursor-pointer touch-manipulation" 
        onClick={() => onOpenDetails(hen)}
      >
        <img
          src={hen.image}
          alt={hen.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
        
        {/* Egg color badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md flex items-center space-x-1.5 text-xs font-bold text-slate-800 border border-white/50">
          <span className={`w-3.5 h-3.5 rounded-full border egg-color-${hen.eggColor} shadow-inner`} />
          <span>{hen.eggColorName}</span>
        </div>

        {/* Selected count pill badge */}
        {selectedCount > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border border-amber-300 animate-popIn flex items-center space-x-1">
            <Egg className="w-3.5 h-3.5 fill-slate-950" />
            <span>{selectedCount}x</span>
          </div>
        )}

        {/* Name and title at bottom of image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
          <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1 mb-0.5">
            <Sparkles className="w-3 h-3" /> {hen.breed}
          </div>
          <h3 className="text-2xl font-extrabold font-serif leading-tight drop-shadow">
            {hen.name}
          </h3>
          <p className="text-xs text-slate-200 line-clamp-1 italic font-light">
            "{hen.title}"
          </p>
        </div>
      </div>

      {/* Card Content & Features */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-amber-50/20 space-y-3">
        <div>
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-2">
            {hen.description}
          </p>

          <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-slate-50 rounded-xl border border-slate-200/70">
            <span className="text-slate-600 font-medium">Größe: <strong className="text-slate-900">{hen.eggSize}</strong></span>
            <span className="text-amber-800 font-bold bg-amber-100/80 px-2 py-0.5 rounded-md">
              {hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} / Ei
            </span>
          </div>
        </div>

        {/* Action Controls - Optimized for Mobile Taps */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            {/* Quick Info Button */}
            <button
              onClick={() => onOpenDetails(hen)}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 touch-manipulation min-h-[44px]"
            >
              <Info className="w-4 h-4 text-farm-blue-900" />
              <span>Info</span>
            </button>

            {/* Counter Control (+ / -) */}
            <div className="flex-1 flex items-center justify-between bg-farm-blue-950 p-1 rounded-xl shadow min-h-[44px]">
              <button
                onClick={() => onRemoveEgg(hen)}
                disabled={selectedCount === 0}
                className="w-10 h-9 rounded-lg bg-farm-blue-900 hover:bg-farm-blue-800 disabled:opacity-40 text-white flex items-center justify-center transition-all active:scale-90 touch-manipulation"
                title="Ein Ei abziehen"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="font-bold text-amber-300 text-sm px-2">
                {selectedCount} Ei{selectedCount !== 1 ? 'er' : ''}
              </span>

              <button
                onClick={() => onAddEgg(hen)}
                disabled={isCartonFull}
                className="w-10 h-9 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-black flex items-center justify-center shadow transition-all active:scale-90 touch-manipulation"
                title={isCartonFull ? "Karton ist voll!" : "Ei hinzufügen"}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
