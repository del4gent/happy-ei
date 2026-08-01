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
import { Egg, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [selectedEggs, setSelectedEggs] = useState<SelectedEgg[]>([]);
  const [cartonCapacity, setCartonCapacity] = useState<CartonCapacity>(6);
  const [activeHenModal, setActiveHenModal] = useState<Hen | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(null);

  // Add egg from a specific hen to carton
  const handleAddEgg = (hen: Hen) => {
    if (selectedEggs.length >= cartonCapacity) {
      alert(`Dein ${cartonCapacity}er Karton ist bereits voll! Du kannst unten die Kartongröße anpassen oder Eier entfernen.`);
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans pb-20 sm:pb-0">
      {/* Header */}
      <Header
        cartCount={selectedEggs.length}
        cartonCapacity={cartonCapacity}
        onOpenCart={scrollToCarton}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-12">
        
        {/* SECTION 1: HÜHNER-AUSWAHL */}
        <section id="huehner-auswahl" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
              1. Wähle dein Huhn
            </h2>
            <span className="text-xs text-slate-500 font-medium">5 Hühner zur Auswahl</span>
          </div>

          {/* Grid of Chicken Cards */}
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
                  isCartonFull={selectedEggs.length >= cartonCapacity}
                />
              );
            })}
          </div>
        </section>

        {/* SECTION 2: EIERKARTON */}
        <section id="eierkarton-section" className="space-y-6 scroll-mt-6">
          <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
            2. Dein Eierkarton
          </h2>
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

        {/* SECTION 3: BESTELLÜBERSICHT */}
        {selectedEggs.length > 0 && (
          <section className="max-w-3xl mx-auto">
            <OrderSummary
              selectedEggs={selectedEggs}
              chickens={CHICKENS}
              totalPrice={totalPrice}
              priceDerivation={priceDerivation}
            />
          </section>
        )}
      </main>

      {/* STICKY MOBILE CART BAR */}
      <div className="fixed bottom-3 left-3 right-3 z-40 sm:hidden">
        <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
              🥚 {selectedEggs.length}/{cartonCapacity}
            </div>
            <div>
              <div className="text-[11px] text-slate-300 font-medium">Gesamtsumme:</div>
              <div className="text-sm font-black text-amber-300 font-serif">
                {totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {selectedEggs.length > 0 ? (
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow flex items-center gap-1 active:scale-95"
              >
                <span>Bestellen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={scrollToCarton}
                className="bg-white/20 text-white font-bold text-xs px-3 py-2 rounded-xl"
              >
                Karton
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 border-t border-slate-800 mt-12 text-center text-xs">
        <p className="font-bold text-slate-300 font-serif">La Maison Bleue • Hof-Direktverkauf</p>
        <p className="text-[11px] text-slate-500 mt-1">© {new Date().getFullYear()} Bio-Freilandeier frisch vom Hof</p>
      </footer>

      {/* Modals */}
      <ChickenDetailModal
        hen={activeHenModal}
        onClose={() => setActiveHenModal(null)}
        onAddEgg={handleAddEgg}
        henEggCount={selectedEggs.filter((e) => activeHenModal && e.hen.id === activeHenModal.id).length}
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
