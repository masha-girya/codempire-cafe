import { IDish, IUser } from '../types';

export interface IMenu {
  id: string,
  title: string,
  description: string,
  weight: number,
  price: number,
  createdBy: IUser,
  editedBy: IUser,
  dishes: IDish[],
}
