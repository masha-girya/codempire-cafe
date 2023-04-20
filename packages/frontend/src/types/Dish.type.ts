import { SORT } from './Sort.type';

export interface IDish {
  id: string,
  title: string,
  description: string,
  weight: number,
  price: number,
  ingredients: string[],
  allergens: string[],
  sort: SORT,
  categories: string[],
  image: string,
}
