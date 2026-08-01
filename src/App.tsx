import React, { useState } from 'react';
import { CHICKENS } from './data/chickens';
import { Hen, SelectedEgg, CartonCapacity, CustomerDetails, CompletedOrder } from './types';
import { Header } from './components/Header';
import { ChickenCard } from './components/ChickenCard';
import { EggCarton } from './components/EggCarton';
import { OrderSummary } from './components/OrderSummary';
import { ChickenDetailModal } from './components/ChickenDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Sparkles, Heart, Egg, ShieldCheck, HelpCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedEggs, setSelectedEggs] = useState<SelectedEgg[]>([]);
  const [cartonCapacity, setCartonCapacity] = useState<CartonCapacity>(6);
  const [activeHenModal, setActiveHenModal] = useState<Hen | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Add egg from a specific hen to carton
  const handleAddEgg = (hen: Hen) => {
    if (selectedEggs.length >= cartonCapacity) {
      alert(`Dein ${cartonCapacity}er Karton ist bereits voll! Du kannst die Kartongröße (6er, 10er, 12er) anpassen oder Eier entfernen.`);
      return;
    }

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
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800 font-sans">
      {/* Hero Header */}
      <Header
        cartCount={selectedEggs.length}
        cartonCapacity={cartonCapacity}
        onOpenCart={scrollToCarton}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Section 1: Hühner Übersicht & Profilbilder */}
        <section id="huehner-auswahl" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-farm-blue-900 bg-blue-100/80 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unsere Hühner-Familie</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
                Von wem möchtest du ein Ei?
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Klicke auf das Plus-Symbol bei deinem Lieblingshuhn, um ein frisches Ei direkt in deinen Karton zu legen!
              </p>
            </div>

            <div className="text-xs text-slate-500 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 self-start md:self-auto">
              <Egg className="w-4 h-4 text-amber-500" />
              <span>5 Hühner auf La Maison Bleue</span>
            </div>
          </div>

          {/* Grid of Chicken Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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

        {/* Section 2: Visual Egg Carton Builder */}
        <section id="eierkarton-section" className="space-y-8 scroll-mt-6">
          <EggCarton
            selectedEggs={selectedEggs}
            cartonCapacity={cartonCapacity}
            onCapacityChange={handleCapacityChange}
            onRemoveEggAtSlot={handleRemoveEggAtSlot}
            onClearCarton={handleClearCarton}
            onOpenCheckout={() => setIsCheckoutOpen(true)}
            totalPrice={totalPrice}
            priceDerivation={priceDerivation}
          />
        </section>

        {/* Section 3: Summary & Pricing Breakdown */}
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

        {/* Section 4: Farm Philosophy & Trust Banner */}
        <section className="bg-gradient-to-r from-farm-blue-900 via-farm-blue-800 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 fill-amber-300" />
              <span>Unsere Herzens-Philosophie</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
              Glückliche Hühner, schmackhafte Eier.
            </h2>
            <p className="text-blue-100/90 text-sm leading-relaxed">
              Auf <strong>La Maison Bleue</strong> genießen Henriette, Blanche, Rosie, Pippa und Lotte uneingeschränkten Auslauf auf saftigen Wiesen. Sie bekommen nur hochwertiges Bio-Futter ohne Zusätze. Das schmeckt man in jedem einzelnen Ei!
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-base">🏠</span>
            <span className="font-bold text-slate-200 font-serif">La Maison Bleue Eier-Hofverkauf</span>
            <span>• © {new Date().getFullYear()}</span>
          </div>

          <div className="flex space-x-6 text-slate-400">
            <a href="#huehner-auswahl" className="hover:text-amber-300 transition-colors">Unsere Hühner</a>
            <a href="#eierkarton-section" className="hover:text-amber-300 transition-colors">Eierkarton-Mixer</a>
            <span>Bio-Zertifiziert DE-ÖKO-006</span>
          </div>
        </div>
      </footer>

      {/* Chicken Detail Modal */}
      <ChickenDetailModal
        hen={activeHenModal}
        onClose={() => setActiveHenModal(null)}
        onAddEgg={handleAddEgg}
        henEggCount={selectedEggs.filter((e) => activeHenModal && e.hen.id === activeHenModal.id).length}
      />

      {/* Checkout Modal */}
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
