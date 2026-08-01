import React from 'react';
import { ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import { TITLE_IMAGE } from '../data/chickens';

interface HeaderProps {
  cartCount: number;
  cartonCapacity: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, cartonCapacity, onOpenCart }) => {
  return (
    <header className="relative w-full bg-slate-950 text-white overflow-hidden">
      {/* Background Cover Image with Soft Gradient Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={TITLE_IMAGE}
          alt="La Maison Bleue"
          className="w-full h-full object-cover object-center filter brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/90 to-slate-950" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-md">
              🏠
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold font-serif tracking-tight text-white">
                La Maison Bleue
              </span>
              <div className="flex items-center text-[11px] text-slate-400 font-medium">
                <MapPin className="w-3 h-3 text-amber-400 mr-1 shrink-0" /> Bio-Freilandhof
              </div>
            </div>
          </div>

          <button
            onClick={onOpenCart}
            className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold px-4 py-2 rounded-full text-xs sm:text-sm shadow-md transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Karton ({cartCount}/{cartonCapacity})</span>
          </button>
        </div>

        {/* Hero Title */}
        <div className="mt-8 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-white/10 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Frische Bio-Eier direkt vom Huhn</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif text-white tracking-tight leading-tight">
            Wähle dein Huhn. <br />
            <span className="text-amber-300">Stelle deinen Karton zusammen.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed pt-1">
            Jedes Ei auf La Maison Bleue stammt von einem glücklichen Huhn mit eigenem Charakter. Suche dir aus, von welchem Huhn du dein Ei haben möchtest!
          </p>
        </div>
      </div>
    </header>
  );
};
