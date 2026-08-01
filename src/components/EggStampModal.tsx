import React from 'react';
import { SelectedEgg } from '../types';
import { X, Sparkles, Check } from 'lucide-react';

export interface Stamp {
  id: string;
  emoji: string;
  text: string;
}

export const STAMPS: Stamp[] = [
  { id: 'love', emoji: '❤️', text: 'Mit Liebe gelegt' },
  { id: 'sun', emoji: '☀️', text: 'Guten Morgen!' },
  { id: 'luck', emoji: '🍀', text: 'Glücks-Ei' },
  { id: 'crown', emoji: '👑', text: 'Königliches Ei' },
  { id: 'power', emoji: '🏋️', text: 'Power-Protein' },
  { id: 'chick', emoji: '🐣', text: 'Hof-Liebling' },
];

interface EggStampModalProps {
  egg: SelectedEgg | null;
  currentStamp?: Stamp;
  onClose: () => void;
  onApplyStamp: (slotIndex: number, stamp?: Stamp) => void;
  onRemoveEgg: (slotIndex: number) => void;
}

export const EggStampModal: React.FC<EggStampModalProps> = ({
  egg,
  currentStamp,
  onClose,
  onApplyStamp,
  onRemoveEgg,
}) => {
  if (!egg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200 animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-farm-blue-900 text-white p-6 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-1 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ei-Personalisierung</span>
          </div>
          <h3 className="text-xl font-extrabold font-serif">
            {egg.hen.name}s Ei auf Platz {egg.slotIndex + 1}
          </h3>
          <p className="text-xs text-blue-100/80">
            Wähle einen Stempel für dieses Ei oder nimm es aus dem Karton.
          </p>
        </div>

        {/* 3D Egg Preview with Stamp */}
        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className={`relative w-20 h-28 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-xl border-4 flex flex-col items-center justify-center egg-color-${egg.hen.eggColor} transition-transform hover:scale-105`}>
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md mb-1">
                <img src={egg.hen.image} alt={egg.hen.name} className="w-full h-full object-cover" />
              </div>

              {currentStamp && (
                <div className="bg-white/90 backdrop-blur px-2 py-0.5 rounded-full border border-amber-400 text-[10px] font-black text-slate-900 flex items-center gap-1 shadow-md animate-popIn">
                  <span>{currentStamp.emoji}</span>
                  <span className="truncate max-w-[80px]">{currentStamp.text}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stamp Options */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 text-center">
              Wähle einen Stempel-Aufdruck:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {STAMPS.map((s) => {
                const isSelected = currentStamp?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onApplyStamp(egg.slotIndex, isSelected ? undefined : s)}
                    className={`p-3 rounded-2xl border text-left flex items-center space-x-2 text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-100 text-amber-950 shadow-md ring-2 ring-amber-400'
                        : 'border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-slate-800'
                    }`}
                  >
                    <span className="text-xl">{s.emoji}</span>
                    <span className="flex-1">{s.text}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={() => {
                onRemoveEgg(egg.slotIndex);
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
            >
              Ei entfernen
            </button>

            <button
              onClick={onClose}
              className="flex-1 px-5 py-2.5 rounded-xl bg-farm-blue-900 text-white font-bold text-xs hover:bg-farm-blue-800 transition-all shadow"
            >
              Fertig &amp; Speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
