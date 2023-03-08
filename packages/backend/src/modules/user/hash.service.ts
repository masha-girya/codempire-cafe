import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AUTH_CONSTANTS as AUTH } from 'utils/constants/constants';

@Injectable()
export class HashService {
  async hashPassword(password: string) {
    return await bcrypt.hash(password, AUTH.SALT_OR_ROUND);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
