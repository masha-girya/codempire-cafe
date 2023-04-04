import { IDish, IUser } from '../types';

export interface IMenu extends IDish {
  createdBy: IUser,
  editedBy: IUser,
  dishes: IDish[],
  dishesId: string[],
}
