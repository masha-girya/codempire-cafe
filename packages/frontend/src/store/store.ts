import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/features/user.slice';
import dishesReducer from '../store/features/dishes/dishes.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    dishes: dishesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
