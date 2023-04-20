import { CreatedDishDto } from '../dish';

export class UpdatedDishDto extends CreatedDishDto {
  allergensToAdd: string;
  ingredientsToAdd: string;
}
