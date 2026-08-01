export type EggColor = 'braun' | 'weiss' | 'dunkelbraun' | 'gruen' | 'creme';

export interface Hen {
  id: string;
  name: string;
  breed: string;
  title: string;
  image: string;
  eggColor: EggColor;
  eggColorName: string;
  eggSize: 'M' | 'L' | 'XL';
  pricePerEgg: number;
  description: string;
}

export type CartonCapacity = 6 | 10 | 12;

export interface SelectedEgg {
  slotIndex: number;
  hen: Hen;
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
