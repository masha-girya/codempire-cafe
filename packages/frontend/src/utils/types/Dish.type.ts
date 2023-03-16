import { IUser } from './User.type';

export interface IDish {
  id: string,
  title: string,
  description: string,
  weight: number,
  price: number,
  ingredients: string[],
  allergens: string[],
  sort: 'food' | 'drink',
  categories: string[],
  image: string,
  createdBy: IUser,
  editedBy: IUser,
}
