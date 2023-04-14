import { IMenu, IDish, IOrder, ROLE } from '../types';

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
  role: ROLE,
  orders: IOrder[],
  createdMenus: IMenu[],
  editedMenus: IMenu[],
  createdDishes: IDish[],
  editedDishes: IDish[],
}
