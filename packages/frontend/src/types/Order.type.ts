import { IUser, IDish, IMenu, STATUS, TWatchStatus } from '../types';

export interface IOrder {
  id: string,
  date: Date,
  status: STATUS,
  comment: string,
  number: number,
  totalPrice: number,
  paymentHash: string | null,
  mark: number | null,
  watchedManager: TWatchStatus,
  watchedUser: TWatchStatus,
  address: string,
  user: IUser,
  dishes: IDish[],
  menus: IMenu[],
  dishId: string[],
  menuId: string[],
  userId: string,
}
