import React from 'react';
import { Egg, ShoppingBag, MapPin } from 'lucide-react';
import { TITLE_IMAGE } from '../data/chickens';

interface HeaderProps {
  cartCount: number;
  cartonCapacity: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, cartonCapacity, onOpenCart }) => {
  return (
    <header className="relative w-full bg-slate-900 text-white overflow-hidden shadow-md">
      {/* Background Cover Image with Soft Gradient */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={TITLE_IMAGE}
          alt="La Maison Bleue"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-900" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg">
              🏠
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                La Maison Bleue
              </h1>
              <p className="text-xs text-amber-200/80 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" /> Hof-Direktverkauf • Bio-Freilandeier
              </p>
            </div>
          </div>

          {/* Quick Cart Pill */}
          <button
            onClick={onOpenCart}
            className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-2 rounded-full shadow-lg transition-all active:scale-95 text-xs sm:text-sm"
          >
            <Egg className="w-4 h-4 fill-slate-950" />
            <span>Karton ({cartCount}/{cartonCapacity})</span>
          </button>
        </div>

        {/* Minimalist Subtitle */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
            Frische Eier direkt vom Huhn bestellen.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            Wähle deine Lieblingshühner und stelle deinen individuellen Eierkarton zusammen.
          </p>
        </div>
      </div>
    </header>
  );
};
