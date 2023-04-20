import { CreatedMenuDto } from './created-menu.dto';

export class UpdatedMenuDto extends CreatedMenuDto {
  userId: string;
  allergensToAdd: string | string[];
  ingredientsToAdd: string | string[];
}
