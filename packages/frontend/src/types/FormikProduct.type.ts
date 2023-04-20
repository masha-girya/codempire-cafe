import { IDish } from './Dish.type';

export interface IFormikProduct extends IDish {
  ingredientOnAdd: string,
  allergenOnAdd: string,
  categoryOnAdd: string,
}