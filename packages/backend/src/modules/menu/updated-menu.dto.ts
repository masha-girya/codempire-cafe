import { CreatedMenuDto } from '.';

export class UpdatedMenuDto extends CreatedMenuDto {
  allergensToAdd: string;
  ingredientsToAdd: string;
}
