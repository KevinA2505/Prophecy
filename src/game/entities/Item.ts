export type ItemType = 'commodity' | 'weapon' | 'ship_part';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  basePrice: number;
  description?: string;
}
