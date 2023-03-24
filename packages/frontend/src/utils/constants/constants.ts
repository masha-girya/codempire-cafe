import { TIcon } from 'components/icon';

export const API_CONSTANTS = {
  BASE_URL: 'http://localhost:3333',
  REGISTRATION_URL: '/user/register',
  LOGIN_URL: '/auth/login',
  VALIDATE_TOKEN_URL: '/auth/profile',
  USER_EDIT: '/user/edit',
  DISH: '/dish',
  MENU: '/menu',
  SORT: 'sortBy=',
  FILTER: 'filter=',
  RECOMMENDED: '/recommended',
};

export const ROUTE_CONSTANTS = {
  HOME: '/',
  REGISTRATION: '/registration',
  REGISTRATION_ADD_INFO: '/registration/add-info',
  MAIN_PAGE: '/home',
  MAIN_PAGE_DISH: '/home/dishes',
  MAIN_PAGE_MENU: '/home/menus',
  ERROR: '/error',
};

export const STORAGE_CONSTANTS = {
  ACCESS_TOKEN: 'access_token',
};

export const API_HEADERS_CONSTANTS = {
  AUTH: 'Authorization',
};

export const NAVIGATION_CONSTANTS: TIcon[] = ['home', 'profile', 'orders'];
