import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'utils/types';

interface IInitialState {
  email: string,
  password: string,
  name: string,
  phone: string,
  role: string,
  avatar: string,
  address: string[],
}

const initialState: IInitialState = {
  email: '',
  password: '',
  name: '',
  phone: '',
  role: '',
  avatar: '',
  address: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setAddress: (state, action: PayloadAction<string[]>) => {
      state.address = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload};
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;