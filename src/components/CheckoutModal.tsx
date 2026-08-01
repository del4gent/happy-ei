import React, { useState } from 'react';
import { SelectedEgg, CustomerDetails, Hen } from '../types';
import { X, Calendar, MapPin, Truck, Heart, Egg, CheckCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEggs: SelectedEgg[];
  chickens: Hen[];
  cartonCapacity: number;
  totalPrice: number;
  priceDerivation: string;
  onSubmitOrder: (details: CustomerDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedEggs,
  chickens,
  cartonCapacity,
  totalPrice,
  priceDerivation,
  onSubmitOrder,
}) => {
  if (!isOpen) return null;

  // Tomorrow's date default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    deliveryMethod: 'pickup',
    street: '',
    zipCity: '',
    deliveryDate: defaultDateStr,
    personalMessage: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert('Bitte fülle mindestens deinen Namen und deine E-Mail-Adresse aus.');
      return;
    }
    onSubmitOrder(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 my-8 animate-popIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-farm-blue-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-blue-200 hover:text-white bg-white/10 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Egg className="w-3.5 h-3.5 fill-amber-300" />
            <span>Bestellung auf La Maison Bleue</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Bestellung abschließen
          </h2>
          <p className="text-sm text-blue-100/80 mt-1">
            {selectedEggs.length} Eier im {cartonCapacity}er Karton • Gesamtsumme: <strong className="text-amber-300">{totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</strong>
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Delivery Method Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Übergabeart wählen
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                className={`p-4 rounded-2xl border-2 text-left flex items-start space-x-3 transition-all ${
                  formData.deliveryMethod === 'pickup'
                    ? 'border-farm-blue-900 bg-blue-50/50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <MapPin className={`w-5 h-5 mt-0.5 ${formData.deliveryMethod === 'pickup' ? 'text-farm-blue-900' : 'text-slate-400'}`} />
                <div>
                  <div className="font-bold text-sm text-slate-900">Selbstabholung am Hof</div>
                  <div className="text-xs text-slate-500 mt-0.5">Kostenlos bei La Maison Bleue</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, deliveryMethod: 'delivery' })}
                className={`p-4 rounded-2xl border-2 text-left flex items-start space-x-3 transition-all ${
                  formData.deliveryMethod === 'delivery'
                    ? 'border-farm-blue-900 bg-blue-50/50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <Truck className={`w-5 h-5 mt-0.5 ${formData.deliveryMethod === 'delivery' ? 'text-farm-blue-900' : 'text-slate-400'}`} />
                <div>
                  <div className="font-bold text-sm text-slate-900">Frische-Lieferung</div>
                  <div className="text-xs text-slate-500 mt-0.5">Direkt vor deine Haustür</div>
                </div>
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              2. Kontaktdaten
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 font-semibold mb-1">
                  Vollständiger Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="z.B. Maria Musterfrau"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-farm-blue-900 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 font-semibold mb-1">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  required
                  placeholder="maria@beispiel.de"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-farm-blue-900 focus:outline-none text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs text-slate-600 font-semibold mb-1">
                  Telefonnummer (für Lieferabsprache)
                </label>
                <input
                  type="tel"
                  placeholder="+49 170 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-farm-blue-900 focus:outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Address if Delivery */}
          {formData.deliveryMethod === 'delivery' && (
            <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Lieferadresse
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Straße & Hausnummer"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
                <input
                  type="text"
                  placeholder="PLZ & Ort"
                  value={formData.zipCity}
                  onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
            </div>
          )}

          {/* Date Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              3. Wunschtermin
            </label>
            <div className="flex items-center space-x-3 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <Calendar className="w-5 h-5 text-amber-700 shrink-0" />
              <input
                type="date"
                required
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="bg-white border border-amber-300 px-3 py-1.5 rounded-xl text-sm font-semibold text-slate-800"
              />
              <span className="text-xs text-amber-800">
                (Ab 08:00 Uhr tagesfrisch abholbereit)
              </span>
            </div>
          </div>

          {/* Message for Chickens */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-400" />
              Persönliche Nachricht an die Hühner (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="z.B. Ein besonderes Dankeschön an Henriette für das liebevolle Ei!"
              value={formData.personalMessage}
              onChange={(e) => setFormData({ ...formData, personalMessage: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-farm-blue-900 focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-300 text-slate-600 text-sm font-semibold hover:bg-slate-100"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center space-x-2 active:scale-95"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verbindlich bestellen ({totalPrice.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
