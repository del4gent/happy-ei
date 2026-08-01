import React, { useState } from 'react';
import { CHICKENS } from './data/chickens';
import { Hen, SelectedEgg, CartonCapacity, CustomerDetails, CompletedOrder, EggStamp } from './types';
import { Header } from './components/Header';
import { ChickenCard } from './components/ChickenCard';
import { EggCarton } from './components/EggCarton';
import { OrderSummary } from './components/OrderSummary';
import { ChickenDetailModal } from './components/ChickenDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmation } from './components/OrderConfirmation';
import { QuizModal } from './components/QuizModal';
import { EggStampModal } from './components/EggStampModal';
import { Sparkles, Heart, Egg, ArrowRight, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedEggs, setSelectedEggs] = useState<SelectedEgg[]>([]);
  const [cartonCapacity, setCartonCapacity] = useState<CartonCapacity>(6);
  const [activeHenModal, setActiveHenModal] = useState<Hen | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [stampEggTarget, setStampEggTarget] = useState<SelectedEgg | null>(null);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Audio effect helper
  const playPopSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {}
  };

  // Add egg from a specific hen to carton
  const handleAddEgg = (hen: Hen) => {
    if (selectedEggs.length >= cartonCapacity) {
      alert(`Dein ${cartonCapacity}er Karton ist bereits voll! Du kannst unten die Kartongröße (6er, 10er, 12er) anpassen oder Eier entfernen.`);
      return;
    }

    playPopSound();

    // Find first empty slot
    const occupiedSlots = new Set(selectedEggs.map((e) => e.slotIndex));
    let nextSlot = 0;
    while (occupiedSlots.has(nextSlot) && nextSlot < cartonCapacity) {
      nextSlot++;
    }

    setSelectedEggs((prev) => [...prev, { slotIndex: nextSlot, hen }]);
  };

  // Remove one egg from a specific hen
  const handleRemoveEgg = (hen: Hen) => {
    setSelectedEggs((prev) => {
      const indexToRemove = [...prev].reverse().findIndex((e) => e.hen.id === hen.id);
      if (indexToRemove === -1) return prev;
      const actualIndex = prev.length - 1 - indexToRemove;
      return prev.filter((_, idx) => idx !== actualIndex);
    });
  };

  // Remove egg at specific slot in carton
  const handleRemoveEggAtSlot = (slotIndex: number) => {
    setSelectedEggs((prev) => prev.filter((e) => e.slotIndex !== slotIndex));
  };

  // Apply stamp to an egg slot
  const handleApplyStamp = (slotIndex: number, stamp?: EggStamp) => {
    setSelectedEggs((prev) =>
      prev.map((item) => (item.slotIndex === slotIndex ? { ...item, stamp } : item))
    );
  };

  // Clear carton
  const handleClearCarton = () => {
    setSelectedEggs([]);
  };

  // Change capacity
  const handleCapacityChange = (newCap: CartonCapacity) => {
    setCartonCapacity(newCap);
    if (selectedEggs.length > newCap) {
      setSelectedEggs((prev) => prev.slice(0, newCap));
    }
  };

  // Calculate total price
  const totalPrice = selectedEggs.reduce((sum, item) => sum + item.hen.pricePerEgg, 0);

  // Generate explicit formula/derivation (Rule requirement)
  const henCounts: { [name: string]: { count: number; price: number } } = {};
  selectedEggs.forEach((e) => {
    if (!henCounts[e.hen.name]) {
      henCounts[e.hen.name] = { count: 0, price: e.hen.pricePerEgg };
    }
    henCounts[e.hen.name].count++;
  });

  const derivationParts = Object.entries(henCounts).map(
    ([name, data]) =>
      `${data.count}× ${name} (${data.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}/Ei = ${(data.count * data.price).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})`
  );

  const priceDerivation =
    selectedEggs.length > 0
      ? `Gesamtsumme: ${totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} (Herleitung: ${derivationParts.join(' + ')})`
      : '0,00 € (Karton ist leer)';

  // Complete Order
  const handleCompleteOrder = (customer: CustomerDetails) => {
    const newOrder: CompletedOrder = {
      orderId: Math.floor(100000 + Math.random() * 900000).toString(),
      customer,
      selectedEggs,
      cartonCapacity,
      totalPrice,
      priceDerivation,
      orderDate: new Date().toLocaleDateString('de-DE'),
    };
    setCompletedOrder(newOrder);
    setIsCheckoutOpen(false);
  };

  const handleResetNewOrder = () => {
    setCompletedOrder(null);
    setSelectedEggs([]);
  };

  const scrollToCarton = () => {
    const el = document.getElementById('eierkarton-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (completedOrder) {
    return <OrderConfirmation order={completedOrder} onNewOrder={handleResetNewOrder} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800 font-sans pb-20 md:pb-0">
      {/* Compact Header */}
      <Header
        cartCount={selectedEggs.length}
        cartonCapacity={cartonCapacity}
        onOpenCart={scrollToCarton}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        
        {/* SECTION 1: HÜHNER-AUSWAHL (DIREKT IM VORDERGRUND) */}
        <section id="huehner-auswahl" className="space-y-4 scroll-mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-100/60 p-4 rounded-2xl border border-amber-200">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-farm-blue-900 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Schritt 1: Hühner auswählen</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 mt-0.5">
                Klicke auf das (+), um ein Ei in deinen Karton zu legen:
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsQuizOpen(true)}
                className="text-xs font-bold text-slate-900 bg-amber-300 hover:bg-amber-400 px-3.5 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>🧩 Hühner-Quiz</span>
              </button>
            </div>
          </div>

          {/* Grid of Chicken Cards (Responsive 1-col mobile, 2-col tablet, 5-col desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {CHICKENS.map((hen) => {
              const henEggCount = selectedEggs.filter((e) => e.hen.id === hen.id).length;
              return (
                <ChickenCard
                  key={hen.id}
                  hen={hen}
                  selectedCount={henEggCount}
                  onAddEgg={handleAddEgg}
                  onRemoveEgg={handleRemoveEgg}
                  onOpenDetails={(h) => setActiveHenModal(h)}
                  isCartonFull={selectedEggs.length >= cartonCapacity}
                />
              );
            })}
          </div>
        </section>

        {/* SECTION 2: VISUAL EGG CARTON BUILDER */}
        <section id="eierkarton-section" className="space-y-8 scroll-mt-6">
          <EggCarton
            selectedEggs={selectedEggs}
            cartonCapacity={cartonCapacity}
            onCapacityChange={handleCapacityChange}
            onRemoveEggAtSlot={handleRemoveEggAtSlot}
            onSelectEggSlot={(egg) => setStampEggTarget(egg)}
            onClearCarton={handleClearCarton}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            totalPrice={totalPrice}
            priceDerivation={priceDerivation}
          />
        </section>

        {/* SECTION 3: SUMMARY & PRICING BREAKDOWN */}
        {selectedEggs.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <OrderSummary
              selectedEggs={selectedEggs}
              chickens={CHICKENS}
              totalPrice={totalPrice}
              priceDerivation={priceDerivation}
            />
          </section>
        )}

        {/* SECTION 4: FARM PHILOSOPHY & TRUST BANNER */}
        <section className="bg-gradient-to-r from-farm-blue-900 via-farm-blue-800 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 fill-amber-300" />
              <span>Unsere Hof-Philosophie</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Glückliche Hühner, schmackhafte Eier.
            </h2>
            <p className="text-blue-100/90 text-xs sm:text-sm leading-relaxed">
              Auf <strong>La Maison Bleue</strong> genießen Henriette, Blanche, Rosie, Pippa und Lotte uneingeschränkten Auslauf auf saftigen Wiesen mit bestem Bio-Futter.
            </p>
          </div>
        </section>
      </main>

      {/* STICKY MOBILE FLOATING CART BAR */}
      <div className="fixed bottom-3 left-3 right-3 z-40 md:hidden">
        <div className="bg-farm-blue-950 text-white p-3 rounded-2xl shadow-2xl border border-amber-400/50 flex items-center justify-between backdrop-blur-lg">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm shadow">
              🥚 {selectedEggs.length}/{cartonCapacity}
            </div>
            <div>
              <div className="text-xs text-blue-200 font-medium">Dein Eier-Mix:</div>
              <div className="text-sm font-black text-amber-300 font-serif">
                {totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {selectedEggs.length > 0 ? (
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1 active:scale-95"
              >
                <span>Bestellen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={scrollToCarton}
                className="bg-white/20 text-white font-bold text-xs px-3 py-2 rounded-xl"
              >
                Zum Karton
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-base">🏠</span>
            <span className="font-bold text-slate-200 font-serif">La Maison Bleue Eier-Hofverkauf</span>
            <span>• © {new Date().getFullYear()}</span>
          </div>

          <div className="flex space-x-6 text-slate-400">
            <a href="#huehner-auswahl" className="hover:text-amber-300 transition-colors">Hühner-Auswahl</a>
            <a href="#eierkarton-section" className="hover:text-amber-300 transition-colors">Eierkarton-Mixer</a>
            <span>Bio-Zertifiziert DE-ÖKO-006</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ChickenDetailModal
        hen={activeHenModal}
        onClose={() => setActiveHenModal(null)}
        onAddEgg={handleAddEgg}
        henEggCount={selectedEggs.filter((e) => activeHenModal && e.hen.id === activeHenModal.id).length}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectHen={(hen) => handleAddEgg(hen)}
      />

      <EggStampModal
        egg={stampEggTarget}
        currentStamp={stampEggTarget?.stamp}
        onClose={() => setStampEggTarget(null)}
        onApplyStamp={handleApplyStamp}
        onRemoveEgg={handleRemoveEggAtSlot}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedEggs={selectedEggs}
        chickens={CHICKENS}
        cartonCapacity={cartonCapacity}
        totalPrice={totalPrice}
        priceDerivation={priceDerivation}
        onSubmitOrder={handleCompleteOrder}
      />
    </div>
  );
};
