import { IOrder } from '../types';

export interface IOrderInfo extends IOrder {
  name: string,
  surname: string,
  phone: string,
}
