import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDishes } from '../dishes/dishes.api';

export const loadDishes = createAsyncThunk('dishes/fetch', async() => {
  try {
    return await getDishes();
  } catch(error) {
    console.error(error);
    throw new Error('Failed to fetch dishes');
  }
});
