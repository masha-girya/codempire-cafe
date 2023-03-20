import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { loadDishes } from '../dishes/dishes.actions';
import { IDish } from 'utils/types';

interface IInitialState {
  dishes: IDish[];
  isLoading: boolean;
  isError: string;
}

const initialState: IInitialState = {
  dishes: [],
  isLoading: false,
  isError: '',
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    setDishes: (state, action: PayloadAction<IDish[]>) => {
      state.dishes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDishes.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loadDishes.fulfilled, (state, action: PayloadAction<IDish[]>) => {
      state.dishes = action.payload;
      state.isLoading = false;
    });

    builder.addCase(loadDishes.rejected, (state) => {
      state.isLoading = false;
      state.isError = 'Failed to fetch dishes';
    });
  },
});

export const { setDishes } = dishesSlice.actions;

export default dishesSlice.reducer;
