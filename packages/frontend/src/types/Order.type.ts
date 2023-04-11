import { IUser, IDish, IMenu } from '../types';

export interface IOrder {
  id: string,
  date: Date,
  status: 'created' | 'ready' | 'on way' | 'delivered',
  comment: string,
  number: number,
  mark: number,
  address: string,
  user: IUser,
  dishes: IDish[],
  menus: IMenu[],
  dishId: string[],
  menuId: string[],
  userId: string,
}
