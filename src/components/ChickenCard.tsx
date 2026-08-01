import React from 'react';
import { Hen } from '../types';
import { Plus, Minus, Egg } from 'lucide-react';

interface ChickenCardProps {
  hen: Hen;
  selectedCount: number;
  onAddEgg: (hen: Hen) => void;
  onRemoveEgg: (hen: Hen) => void;
  isCartonFull: boolean;
}

export const ChickenCard: React.FC<ChickenCardProps> = ({
  hen,
  selectedCount,
  onAddEgg,
  onRemoveEgg,
  isCartonFull
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between">
      {/* Chicken Photo Header */}
      <div className="relative h-56 sm:h-64 w-full bg-slate-100 overflow-hidden">
        <img
          src={hen.image}
          alt={hen.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        
        {/* Egg color badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full shadow text-[11px] font-bold text-slate-800 flex items-center space-x-1.5 border border-white/60">
          <span className={`w-3 h-3 rounded-full border egg-color-${hen.eggColor}`} />
          <span>{hen.eggColorName}</span>
        </div>

        {/* Selected count pill badge */}
        {selectedCount > 0 && (
          <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow border border-amber-300 flex items-center space-x-1">
            <Egg className="w-3.5 h-3.5 fill-slate-950" />
            <span>{selectedCount}x</span>
          </div>
        )}

        {/* Hen Name & Breed */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
          <div className="text-[11px] font-medium text-amber-300 uppercase tracking-wider">
            {hen.breed}
          </div>
          <h3 className="text-2xl font-black font-serif leading-tight">
            {hen.name}
          </h3>
        </div>
      </div>

      {/* Content & Ordering Control */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            {hen.description}
          </p>

          <div className="flex items-center justify-between text-xs py-1.5 px-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 font-medium">Größe: <strong className="text-slate-900">{hen.eggSize}</strong></span>
            <span className="text-amber-900 font-bold bg-amber-100/80 px-2 py-0.5 rounded-md">
              {hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} / Ei
            </span>
          </div>
        </div>

        {/* Minimalist Touch Counter (+ / -) */}
        <div className="flex items-center justify-between bg-slate-900 p-1 rounded-xl shadow">
          <button
            onClick={() => onRemoveEgg(hen)}
            disabled={selectedCount === 0}
            className="w-10 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white flex items-center justify-center transition-all active:scale-95 touch-manipulation"
            title="Ein Ei abziehen"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="font-bold text-amber-300 text-sm">
            {selectedCount} Ei{selectedCount !== 1 ? 'er' : ''}
          </span>

          <button
            onClick={() => onAddEgg(hen)}
            disabled={isCartonFull}
            className="w-10 h-9 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-30 text-slate-950 font-black flex items-center justify-center shadow transition-all active:scale-95 touch-manipulation"
            title={isCartonFull ? "Karton voll" : "Ei hinzufügen"}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
