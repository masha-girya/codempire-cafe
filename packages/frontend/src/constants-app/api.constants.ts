export const API_CONSTANTS = {
  BASE_URL: 'http://localhost:3333',
  REGISTRATION_URL: '/user/register',
  LOGIN_URL: '/auth/login',
  VALIDATE_TOKEN_URL: '/auth/profile',
  USER_EDIT: '/user/edit',
  USER_CHANGE_PASS: '/user/edit/password',
  USER: '/user',
  USER_ID: '/user/id',
  DISH: '/dish',
  MENU: '/menu',
  SORT: 'sortBy=',
  FILTER: 'filter=',
  RECOMMENDED: '/recommended',
  SEARCH: '/query?query=',
} as const;
