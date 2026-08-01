import React from 'react';
import { Egg, Sparkles, MapPin, Volume2, HelpCircle, Heart } from 'lucide-react';
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
    <header className="relative w-full overflow-hidden bg-farm-blue-900 text-white pb-8 pt-4 shadow-xl">
      {/* Background Hero Image with Blend Overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src={TITLE_IMAGE}
          alt="La Maison Bleue Titelbild"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-farm-blue-950/90 via-farm-blue-900/80 to-amber-950/90 mix-blend-multiply" />
      </div>

      {/* Top Navbar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-white/15">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 p-0.5 shadow-lg flex items-center justify-center text-farm-blue-950 font-extrabold text-xl animate-wobble">
              🏠
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight font-serif text-amber-200">
                La Maison Bleue
              </span>
              <div className="flex items-center text-[11px] text-blue-100/80 font-medium">
                <MapPin className="w-3 h-3 mr-1 text-amber-300 inline" />
                Hof-Direktverkauf &amp; Bio-Eier
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Gack soundboard */}
            <div className="hidden sm:flex items-center space-x-1 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-xs font-bold">
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
            </div>

            {/* Quiz Matcher Button */}
            <button
              onClick={onOpenQuiz}
              className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/40 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md transition-all flex items-center space-x-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
              <span>Hühner-Quiz</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-full shadow-lg transition-all active:scale-95 text-xs sm:text-sm"
            >
              <Egg className="w-4 h-4 fill-amber-200" />
              <span>Karton ({cartCount}/{cartonCapacity})</span>
            </button>
          </div>
        </div>

        {/* Compact Hero Teaser */}
        <div className="mt-4 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Wähle dein Huhn • Stelle deinen Eierkarton zusammen</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Welches Ei soll in deinen Karton?
            </h1>
          </div>

          <div className="text-xs text-blue-100/90 bg-white/10 backdrop-blur px-3 py-1.5 rounded-xl border border-white/15 self-center sm:self-auto shrink-0">
            ✨ 100% Bio &amp; Tagesfrisch vom Hof
          </div>
        </div>
      </div>
    </header>
  );
};
