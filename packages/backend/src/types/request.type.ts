import { Request } from 'express';
import { CreateUserDto as UserDto } from 'modules/user';


export interface AuthenticatedRequest extends Request {
  user: UserDto;
}
