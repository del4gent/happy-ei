import React, { useState } from 'react';
import { Hen } from '../types';
import { CHICKENS } from '../data/chickens';
import { Sparkles, X, Heart, Egg, RefreshCw, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHen: (hen: Hen) => void;
}

interface Question {
  id: number;
  text: string;
  options: { label: string; henId: string; icon: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Wie startest du am liebsten in den Tag?",
    options: [
      { label: "Früh aufstehen und als Erstes die Sonne begrüßen", henId: "henriette", icon: "🌅" },
      { label: "Majestätisch schlendern & den Tag in Ruhe planen", henId: "blanche", icon: "👑" },
      { label: "Erstmal gemütlich im Bett kuscheln & frühstücken", henId: "rosie", icon: "🛌" },
      { label: "Spontan auf Abenteuerreise gehen!", henId: "pippa", icon: "🎒" },
      { label: "Mit einem riesigen Lächeln & guter Laune", henId: "lotte", icon: "😄" },
    ],
  },
  {
    id: 2,
    text: "Was ist dein absoluter Lieblings-Snack?",
    options: [
      { label: "Knusprige Sonnenblumenkerne & Bio-Nüsse", henId: "henriette", icon: "🌻" },
      { label: "Süße, erfrischende Wassermelone", henId: "blanche", icon: "🍉" },
      { label: "Herzhafte Leckereien & Hafer", henId: "rosie", icon: "🌾" },
      { label: "Zarte Erbsen & knackige Kräuter", henId: "pippa", icon: "🫛" },
      { label: "Süßer Apfel & Bio-Maiskörner", henId: "lotte", icon: "🍎" },
    ],
  },
  {
    id: 3,
    text: "Welche Eierfarbe macht dein Frühstück am glücklichsten?",
    options: [
      { label: "Klassisches, warmes Schokoladenbraun", henId: "henriette", icon: "🤎" },
      { label: "Edles, strahlendes Schneeweiß (XXL)", henId: "blanche", icon: "🤍" },
      { label: "Tiefes, rustikales Kastanienbraun", henId: "rosie", icon: "🌰" },
      { label: "Magisches Pastell-Türkis/Grün", henId: "pippa", icon: "💚" },
      { label: "Zartes Seiden-Creme", henId: "lotte", icon: "💛" },
    ],
  },
];

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onSelectHen }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<{ [henId: string]: number }>({});
  const [resultHen, setResultHen] = useState<Hen | null>(null);

  if (!isOpen) return null;

  const handleAnswer = (henId: string) => {
    const newScores = { ...scores, [henId]: (scores[henId] || 0) + 1 };
    setScores(newScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Determine winner
      let maxHenId = 'henriette';
      let maxScore = -1;
      Object.entries(newScores).forEach(([id, score]) => {
        if (score > maxScore) {
          maxScore = score;
          maxHenId = id;
        }
      });
      const winner = CHICKENS.find((c) => c.id === maxHenId) || CHICKENS[0];
      setResultHen(winner);
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setScores({});
    setResultHen(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200 animate-popIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-farm-blue-900 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hühner-Seelen-Match</span>
          </div>
          <h2 className="text-2xl font-extrabold font-serif text-white">
            Welches Huhn passt zu dir?
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            Finde in 3 kurzen Fragen dein persönliches Hof-Match!
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!resultHen ? (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span>Frage {currentStep + 1} von {QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-lg font-bold text-slate-900 text-center font-serif py-2">
                {QUESTIONS[currentStep].text}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.henId)}
                    className="w-full p-4 rounded-2xl border-2 border-amber-100 bg-amber-50/30 hover:bg-amber-100/80 hover:border-amber-400 text-left font-medium text-sm text-slate-800 transition-all flex items-center space-x-3 group active:scale-98"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform">{opt.icon}</span>
                    <span className="flex-1">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center space-y-6 py-2">
              <div className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 font-extrabold text-xs px-4 py-1.5 rounded-full">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Perfektes Match gefunden!</span>
              </div>

              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl animate-wobble">
                <img
                  src={resultHen.image}
                  alt={resultHen.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-3xl font-black font-serif text-slate-900">
                  Du bist Team {resultHen.name}!
                </h3>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mt-1">
                  "{resultHen.title}"
                </p>
                <p className="text-sm text-slate-600 max-w-sm mx-auto mt-2">
                  {resultHen.description}
                </p>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 italic">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-400 inline mr-1" />
                "{resultHen.funFact}"
              </div>

              <div className="flex items-center justify-center space-x-3 pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold hover:bg-slate-100 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Nochmal spielen
                </button>

                <button
                  onClick={() => {
                    onSelectHen(resultHen);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  <Egg className="w-4 h-4 fill-slate-950" />
                  <span>Ei von {resultHen.name} einpacken!</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
