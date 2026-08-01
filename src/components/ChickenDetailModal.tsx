import React from 'react';
import { Hen } from '../types';
import { X, Sparkles, Heart, Egg, Volume2, Award, Calendar } from 'lucide-react';

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

  const playCluckSound = () => {
    // Play a friendly synthesized cluck or beep audio effect
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image Background banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
          <img
            src={hen.image}
            alt={hen.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-md transition-all"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hen Title Info */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="inline-flex items-center space-x-1.5 bg-amber-500/90 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full mb-2 shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hen.title}</span>
            </div>
            <h2 className="text-3xl font-extrabold font-serif text-white flex items-center gap-3">
              {hen.name}
              <button
                onClick={playCluckSound}
                title="Huhn gackern lassen!"
                className="text-amber-300 hover:text-amber-200 bg-white/20 p-2 rounded-full hover:scale-110 transition-transform"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </h2>
            <p className="text-amber-200 text-sm font-medium">Rasse: {hen.breed}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          <p className="text-slate-700 leading-relaxed text-base">
            {hen.description}
          </p>

          {/* Key Attributes Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50/60 border border-amber-200/60 p-3.5 rounded-2xl">
              <div className="text-xs text-amber-800 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Egg className="w-3.5 h-3.5 text-amber-600" /> Eierfarbe
              </div>
              <div className="text-slate-900 font-bold text-sm flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full border egg-color-${hen.eggColor} shadow-sm inline-block`} />
                {hen.eggColorName}
              </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-200/60 p-3.5 rounded-2xl">
              <div className="text-xs text-blue-800 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-600" /> Ei-Größe &amp; Preis
              </div>
              <div className="text-slate-900 font-bold text-sm">
                Größe {hen.eggSize} ({hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})
              </div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200/60 p-3.5 rounded-2xl col-span-2 sm:col-span-1">
              <div className="text-xs text-emerald-800 font-semibold uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Tagesleistung
              </div>
              <div className="text-slate-900 font-bold text-sm">
                ca. {hen.eggsPerWeek} Eier / Woche
              </div>
            </div>
          </div>

          {/* Personality & Fun Facts */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-sm text-slate-700">
            <div>
              <strong className="text-slate-900 font-semibold">Lieblingsfutter:</strong> {hen.favoriteFood}
            </div>
            <div>
              <strong className="text-slate-900 font-semibold">Charakter:</strong> {hen.personality}
            </div>
            <div className="text-amber-800 font-medium pt-1 italic flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-400 shrink-0 inline" />
              <span>"{hen.funFact}"</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm font-semibold text-slate-600">
            Im aktuellen Karton: <span className="text-slate-900 font-bold text-base">{henEggCount} Eier</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold hover:bg-slate-200/60 transition-colors"
            >
              Schließen
            </button>
            <button
              onClick={() => {
                onAddEgg(hen);
                playCluckSound();
              }}
              className="bg-farm-blue-900 hover:bg-farm-blue-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-sm active:scale-95"
            >
              <Egg className="w-4 h-4 text-amber-300" />
              Ei von {hen.name} wählen ({hen.pricePerEgg.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
