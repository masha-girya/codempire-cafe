import { STORAGE_CONSTANTS as STORAGE } from 'utils/constants';
import { IProduct } from 'utils/types';

export function setLocalItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocalItem(key: string) {
  const token = localStorage.getItem(key);

  return token;
}

export function removeLocalItems(keys: string[]) {
  keys.forEach(key => localStorage.removeItem(key));
}

export function setLocalCart(products: IProduct[], price: number) {
  setLocalItem(STORAGE.CART_PRODUCTS, JSON.stringify(products));
  setLocalItem(STORAGE.CART_PRICE, JSON.stringify(price));
}