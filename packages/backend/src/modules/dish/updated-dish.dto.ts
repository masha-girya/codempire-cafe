import { CreatedDishDto } from '../dish';

export class UpdatedDishDto extends CreatedDishDto {
  userId: string;
  allergensToAdd: string | string[];
  ingredientsToAdd: string | string[];
  categoriesToAdd: string | string[];
}
