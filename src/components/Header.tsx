import React from 'react';
import { Egg, Sparkles, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { TITLE_IMAGE } from '../data/chickens';

interface HeaderProps {
  cartCount: number;
  cartonCapacity: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, cartonCapacity, onOpenCart }) => {
  return (
    <header className="relative w-full overflow-hidden bg-farm-blue-900 text-white pb-12 pt-6 shadow-2xl">
      {/* Background Hero Image with Blend Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src={TITLE_IMAGE}
          alt="La Maison Bleue Titelbild"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-farm-blue-950/80 via-farm-blue-900/60 to-amber-950/90 mix-blend-multiply" />
      </div>

      {/* Top Navbar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 border-b border-white/15">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 shadow-lg flex items-center justify-center text-farm-blue-950 font-extrabold text-2xl">
              🏠
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight font-serif text-amber-200">
                La Maison Bleue
              </span>
              <div className="flex items-center text-xs text-blue-100/80 font-medium">
                <MapPin className="w-3.5 h-3.5 mr-1 text-amber-300 inline" />
                Hof-Direktverkauf & Freilandeier
              </div>
            </div>
          </div>

          {/* Cart Quick Button */}
          <button
            onClick={onOpenCart}
            className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 active:scale-95"
          >
            <div className="relative">
              <Egg className="w-5 h-5 text-slate-950 fill-amber-200 group-hover:rotate-12 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce border-2 border-amber-500">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-sm font-semibold">
              Mein Karton ({cartCount}/{cartonCapacity})
            </span>
          </button>
        </div>

        {/* Hero Main Banner Content */}
        <div className="mt-12 md:mt-16 max-w-3xl text-left">
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>100% Bio &amp; Artgerechte Freilandhaltung</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight leading-tight text-white drop-shadow-md">
            Wähle dein Huhn. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
              Genieße dein Ei.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-blue-100/90 font-light leading-relaxed max-w-2xl">
            Bei uns auf <strong className="text-amber-200 font-semibold">La Maison Bleue</strong> hat jedes Huhn einen Namen, einen eigenen Charakter und ein einzigartiges Ei. Stelle deinen Eierkarton ganz individuell Ei für Ei von deinen Lieblingshühnern zusammen!
          </p>

          {/* Quality Features Badges */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs font-medium">
            <div className="flex items-center space-x-2 text-amber-100 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Tagesfrisch gesammelt</span>
            </div>
            <div className="flex items-center space-x-2 text-amber-100 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <Heart className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Grünland-Freilauf mit Liebe</span>
            </div>
            <div className="flex items-center space-x-2 text-amber-100 bg-white/5 p-2.5 rounded-xl border border-white/10">
              <Egg className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span>Auswahl nach Hühner-Profil</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
