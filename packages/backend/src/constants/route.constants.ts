import * as dotenv from 'dotenv';

dotenv.config();

export const ROUTE_CONSTANTS = {
  USER: 'user',
  USER_EMAIL: ':email',
  USER_REGISTER: 'register',
  USER_UPDATE: 'edit/:id',
  USER_CHANGE_PASS: 'edit/password/:id',
  USER_ID: 'id/:id',
  AUTH: 'auth',
  AUTH_LOGIN: 'login',
  AUTH_PROFILE: 'profile',
  DISH: 'dish',
  CATEGORIES: 'categories',
  DISH_FILTER: 'filter',
  MENU: 'menu',
  RECOMMENDED: 'recommended/:id',
  ORDER: 'order',
  ORDER_UPDATE: 'edit/:number',
  QUERY: 'query',
  ID: ':id',
  NUMBER: ':number',
  NAMES: 'names',
} as const;
