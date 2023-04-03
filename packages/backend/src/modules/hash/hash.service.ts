import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AUTH_CONSTANTS as AUTH } from '@constants';

@Injectable()
export class HashService {
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(Number(AUTH.SALT_OR_ROUND));

    return await bcrypt.hash(password, await salt);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
