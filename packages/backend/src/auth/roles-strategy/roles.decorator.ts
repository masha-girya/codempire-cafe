import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'types';
import { AUTH_CONSTANTS as AUTH } from '@constants';

export const Role = (role: ROLE) => SetMetadata(AUTH.ROLES_KEY, role);
