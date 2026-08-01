export type EggColor = 'braun' | 'weiss' | 'dunkelbraun' | 'gruen' | 'creme';

export interface Hen {
  id: string;
  name: string;
  breed: string; // Rasse
  title: string; // z.B. "Die Chefin im Stall"
  image: string; // Pfad zum Profilbild
  eggColor: EggColor;
  eggColorName: string;
  eggSize: 'M' | 'L' | 'XL';
  pricePerEgg: number;
  description: string;
  favoriteFood: string;
  personality: string;
  eggsPerWeek: number;
  funFact: string;
  audioCluck?: string;
}

export type CartonCapacity = 6 | 10 | 12;

export interface EggStamp {
  id: string;
  emoji: string;
  text: string;
}

export interface SelectedEgg {
  slotIndex: number;
  hen: Hen;
  stamp?: EggStamp;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  deliveryMethod: 'pickup' | 'delivery';
  street: string;
  zipCity: string;
  deliveryDate: string;
  personalMessage?: string;
}

export interface CompletedOrder {
  orderId: string;
  customer: CustomerDetails;
  selectedEggs: SelectedEgg[];
  cartonCapacity: CartonCapacity;
  totalPrice: number;
  priceDerivation: string;
  orderDate: string;
}
