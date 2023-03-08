import * as dotenv from 'dotenv';

dotenv.config();

export const AUTH_CONSTANTS = {
  SALT_OR_ROUND: process.env.API_SALT_OR_ROUND,
  JWT_SECRET: process.env.API_JWT_SECRET,
} as const;

export const DB_CONSTANTS = {
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
  HOST: process.env.HOST,
} as const;

export const DEV_CONSTANTS = {
  PORT: process.env.DEV_PORT,
};
