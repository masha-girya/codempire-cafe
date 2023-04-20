import { IDish } from '../types';

export interface IMenu extends IDish {
  dishes: IDish[],
  dishesId: string[],
}
