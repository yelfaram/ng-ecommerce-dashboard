import { Price } from './price.model';

export interface UserFilter {
  category: string | null;
  price: Price;
  rating: number | null;
}
