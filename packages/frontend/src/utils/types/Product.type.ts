import { IMenu, IDish } from '../types';

export interface IProduct {
  product: IDish | IMenu,
  amount: number,
}
