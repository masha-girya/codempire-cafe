import { IMenu, IDish, IOrder } from '../types';

export interface IUser {
  id: string,
  email: string,
  password: string,
  token: string,
  name: string,
  surname: string,
  avatar: string,
  phone: string,
  address: string[],
  role: 'authorizedUser' | 'manager',
  orders: IOrder[],
  createdMenus: IMenu[],
  editedMenus: IMenu[],
  createdDishes: IDish[],
  editedDishes: IDish[],
}
