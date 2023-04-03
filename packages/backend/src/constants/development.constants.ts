import * as dotenv from 'dotenv';

dotenv.config();

export const DEV_CONSTANTS = {
  PORT: process.env.DEV_PORT,
} as const;
