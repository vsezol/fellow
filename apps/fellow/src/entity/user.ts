import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSelectFromSelf } from '../shared';

export interface UserState {
  name: string;
}

const initialState: UserState = {
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
    },
  },
});

const selectFromSelf = createSelectFromSelf(userSlice);

export const selectUserName = selectFromSelf((state) => state.name);
