import { Category } from './category.model';

export interface Filter {
  categories: Category[];
  maxPrice: number;
}
