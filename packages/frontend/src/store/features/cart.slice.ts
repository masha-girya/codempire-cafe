import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDish, IMenu, IProduct } from 'types';
import { setLocalCart, getLocalItem } from 'utils/helpers';
import { STORAGE_CONSTANTS as STORAGE } from 'constants-app';

const products = JSON.parse(getLocalItem(STORAGE.CART_PRODUCTS) || '[]');

const totalPrice = JSON.parse(getLocalItem(STORAGE.CART_PRICE) || '0');

interface IInitialState {
  products: IProduct[];
  totalPrice: number;
}

const initialState: IInitialState = {
  products,
  totalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IDish | IMenu>) => {
      const { products } = state;

      const newProducts = [
        ...products,
        {
          product: action.payload,
          amount: 1,
        },
      ];

      state.totalPrice += action.payload.price;
      state.products = newProducts;

      setLocalCart(newProducts, state.totalPrice);
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      const { products } = state;
      const { product, amount } = action.payload;

      const newProducts = products.filter(
        (item) => item.product.id !== product.id
      );

      state.products = newProducts;
      state.totalPrice -= amount * product.price;

      setLocalCart(newProducts, state.totalPrice);
    },
    increaseAmount: (state, action: PayloadAction<IDish | IMenu>) => {
      const { products } = state;

      const index = products.findIndex(
        (item) => item.product.id === action.payload.id
      );

      state.products[index].amount += 1;
      state.totalPrice += action.payload.price;

      setLocalCart(state.products, state.totalPrice);
    },
    decreaseAmount: (state, action: PayloadAction<IDish | IMenu>) => {
      const { products } = state;

      const index = products.findIndex(
        (item) => item.product.id === action.payload.id
      );

      state.products[index].amount -= 1;
      state.totalPrice -= action.payload.price;

      setLocalCart(state.products, state.totalPrice);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
