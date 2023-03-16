import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
  email: string,
  password: string,
  name: string,
  phone: string,
}

const initialState: IInitialState = {
  email: '',
  password: '',
  name: '',
  phone: '',
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
  },
});

export const {
  setEmail,
  setPassword,
  setName,
  setPhone,
} = userSlice.actions;

export default userSlice.reducer;