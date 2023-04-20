import { IUser, IDish, IMenu, STATUS } from '../types';

export interface IOrder {
  id: string,
  date: Date,
  status: STATUS,
  comment: string,
  number: number,
  mark: number | null,
  address: string,
  user: IUser,
  dishes: IDish[],
  menus: IMenu[],
  dishId: string[],
  menuId: string[],
  userId: string,
}
