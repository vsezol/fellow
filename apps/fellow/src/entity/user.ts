import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  name: string;
}

const initialState: User = {
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
    },
  },
});
