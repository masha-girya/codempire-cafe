export const ROUTE_CONSTANTS = {
  HOME: '/',
  REGISTRATION: '/registration',
  REGISTRATION_ADD_INFO: '/registration/add-info',
  MAIN_PAGE: '/home',
  MAIN_PAGE_DISHES: '/home/dishes',
  MAIN_PAGE_DISH: '/home/dishes/:id',
  MAIN_PAGE_MENUS: '/home/menus',
  MAIN_PAGE_MENU: '/home/menus/:id',
  DISH_EDIT: '/home/dishes/edit',
  DISH_EDIT_ID: '/home/dishes/edit/:id',
  MENU_EDIT: '/home/menus/edit',
  MENU_EDIT_ID: '/home/menus/edit/:id',
  MENU_ADD: '/home/add/add-menu',
  DISH_ADD: '/home/add/add-dish',
  ERROR: '/error',
  PROFILE: '/profile',
  PROFILE_LOGOUT: '/profile/logout',
  PROFILE_EDIT_USER: '/profile/edit-user',
  PROFILE_CHANGE_PASS: '/profile/change-password',
  PROFILE_CHANGE_ADDRESS: '/profile/change-address',
  CART: 'cart',
  NOTIFICATIONS: 'notifications',
  ORDER: 'order-creation',
  ORDERS: '/orders',
  ORDERS_WAITING: '/orders/waiting',
  ORDERS_COMPLETED: '/orders/completed',
  NUMBER: ':number',
  PAYMENT: 'payment'
} as const;
