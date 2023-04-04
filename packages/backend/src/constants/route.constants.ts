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
  QUERY: 'query',
  ID: ':id',
} as const;
