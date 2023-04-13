import { STATUS } from '../types';

export interface IOrderInfo {
  number: string,
  id: string,
  name: string,
  surname: string,
  address: string,
  phone: string,
  date: Date,
  status: STATUS,
  mark: number | null,
}
