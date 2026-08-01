import React, { useEffect } from 'react';
import { CompletedOrder } from '../types';
import confetti from 'canvas-confetti';
import { CheckCircle2, Egg, Printer, Sparkles, Heart, MapPin, Calendar, RefreshCw } from 'lucide-react';
import { TITLE_IMAGE } from '../data/chickens';

interface OrderConfirmationProps {
  order: CompletedOrder;
  onNewOrder: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onNewOrder }) => {
  useEffect(() => {
    // Fire confetti on launch
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti not available');
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Group eggs by hen for receipt
  const henSummaryMap: { [henName: string]: { count: number; price: number; image: string } } = {};
  order.selectedEggs.forEach((item) => {
    if (!henSummaryMap[item.hen.name]) {
      henSummaryMap[item.hen.name] = {
        count: 0,
        price: item.hen.pricePerEgg,
        image: item.hen.image,
      };
    }
    henSummaryMap[item.hen.name].count += 1;
  });

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 print:shadow-none print:border-none">
        {/* Title Header with La Maison Bleue background */}
        <div className="relative bg-farm-blue-900 text-white p-8 sm:p-10 overflow-hidden text-center">
          <img
            src={TITLE_IMAGE}
            alt="La Maison Bleue"
            className="absolute inset-0 w-full h-full object-cover opacity-20 filter brightness-90"
          />
          <div className="relative z-10 space-y-3">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-200 text-farm-blue-950 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bestätigt &amp; Reserviert</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif">
              Vielen Dank für deine Bestellung!
            </h1>

            <p className="text-blue-100/90 text-sm max-w-md mx-auto">
              Deine Eier wurden für den <strong className="text-amber-200">{order.customer.deliveryDate}</strong> tagesfrisch reserviert.
            </p>

            <div className="inline-block bg-white/10 px-4 py-1.5 rounded-xl text-xs font-mono text-amber-200 border border-white/20">
              Bestell-ID: #{order.orderId}
            </div>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Customer & Delivery Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-sm">
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1">
                Kunde &amp; Empfänger
              </span>
              <div className="font-bold text-slate-900">{order.customer.fullName}</div>
              <div className="text-slate-600 text-xs">{order.customer.email}</div>
              {order.customer.phone && (
                <div className="text-slate-600 text-xs">{order.customer.phone}</div>
              )}
            </div>

            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700 inline" /> Übegabe
              </span>
              <div className="font-bold text-slate-900">
                {order.customer.deliveryMethod === 'pickup'
                  ? 'Abholung am Hof La Maison Bleue'
                  : 'Frische-Lieferung nach Hause'}
              </div>
              <div className="text-slate-600 text-xs">
                Termin: <strong>{order.customer.deliveryDate}</strong>
              </div>
            </div>
          </div>

          {/* Personal Message if present */}
          {order.customer.personalMessage && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start space-x-3 text-xs text-rose-900">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-0.5">Deine Nachricht an die Hühner:</strong>
                <p className="italic font-serif text-sm">"{order.customer.personalMessage}"</p>
              </div>
            </div>
          )}

          {/* Selected Eggs Receipt Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
              <Egg className="w-5 h-5 text-amber-600" />
              Zusammensetzung deines Eierkartons ({order.selectedEggs.length}/{order.cartonCapacity} Eier)
            </h3>

            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
              {Object.entries(henSummaryMap).map(([henName, data]) => (
                <div key={henName} className="p-4 flex items-center justify-between bg-white hover:bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <img src={data.image} alt={henName} className="w-10 h-10 rounded-full object-cover border border-amber-300" />
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">{henName}</span>
                      <span className="text-xs text-slate-500">
                        {data.count}× Ei ({data.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} / Ei)
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">
                    {(data.count * data.price).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Explicit Price Derivation Box (Mandatory rule) */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-slate-300">Gesamtbetrag</span>
              <span className="text-3xl font-black text-amber-300 font-serif">
                {order.totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-amber-200 border border-slate-800">
              <div className="font-bold text-white mb-1">Mathematische Herleitung &amp; Formel:</div>
              {order.priceDerivation}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Quittung drucken</span>
            </button>

            <button
              onClick={onNewOrder}
              className="px-6 py-3 rounded-xl bg-farm-blue-900 hover:bg-farm-blue-800 text-white font-bold text-sm shadow-md flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Neue Bestellung aufgeben</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
