import React from 'react';
import { Egg, Sparkles, MapPin, ShieldCheck, Heart, Volume2, HelpCircle } from 'lucide-react';
import { TITLE_IMAGE } from '../data/chickens';

interface HeaderProps {
  cartCount: number;
  cartonCapacity: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartonCapacity,
  onOpenCart,
  onOpenQuiz,
}) => {
  const playSoundEffect = (type: 'cluck' | 'egg' | 'cheer') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (type === 'cluck') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      } else if (type === 'egg') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(880, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      }

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + (type === 'cheer' ? 0.25 : 0.15));
    } catch (e) {}
  };

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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b border-white/15">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 shadow-lg flex items-center justify-center text-farm-blue-950 font-extrabold text-2xl animate-wobble">
              🏠
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight font-serif text-amber-200">
                La Maison Bleue
              </span>
              <div className="flex items-center text-xs text-blue-100/80 font-medium">
                <MapPin className="w-3.5 h-3.5 mr-1 text-amber-300 inline" />
                Hof-Direktverkauf &amp; Freilandeier
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Playful Soundboard Buttons */}
            <div className="hidden md:flex items-center space-x-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs font-bold">
              <span className="text-amber-300 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5" /> Gack-Board:
              </span>
              <button
                onClick={() => playSoundEffect('cluck')}
                className="px-2 py-0.5 rounded bg-white/15 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                title="Gack-Gack!"
              >
                🐔 Gack!
              </button>
              <button
                onClick={() => playSoundEffect('egg')}
                className="px-2 py-0.5 rounded bg-white/15 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                title="Ei gelegt!"
              >
                🥚 Plop!
              </button>
              <button
                onClick={() => playSoundEffect('cheer')}
                className="px-2 py-0.5 rounded bg-white/15 hover:bg-amber-400 hover:text-slate-950 transition-colors"
                title="Jubel!"
              >
                🎉 Jubel!
              </button>
            </div>

            {/* Match Quiz Button */}
            <button
              onClick={onOpenQuiz}
              className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/40 text-xs font-bold px-3.5 py-2.5 rounded-full backdrop-blur-md transition-all flex items-center space-x-1.5"
            >
              <HelpCircle className="w-4 h-4 text-amber-300" />
              <span>Hühner-Quiz</span>
            </button>

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
                Karton ({cartCount}/{cartonCapacity})
              </span>
            </button>
          </div>
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
        </div>
      </div>
    </header>
  );
};
