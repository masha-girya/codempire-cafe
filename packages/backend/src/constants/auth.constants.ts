import * as dotenv from 'dotenv';

dotenv.config();

export const AUTH_CONSTANTS = {
  SALT_OR_ROUND: process.env.API_SALT_OR_ROUND,
  JWT_SECRET: process.env.API_JWT_SECRET,
  JWT_EXPIRES: '120d',
  ROLES_KEY: 'role',
} as const;
