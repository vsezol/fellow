import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSelectFromSelf } from '../../shared/lib';

export interface User {
  name: string;
  status: string;
}

export interface UserState {
  name: string;
  reputation: number;
}

const initialState: UserState = {
  name: '',
  reputation: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    addReputation: (state, action: PayloadAction<number>) => {
      state.reputation += action.payload;
    },
  },
});

const selectFromSelf = createSelectFromSelf(userSlice);

export const selectUserName = selectFromSelf((state) => state.name);
export const selectUserReputation = selectFromSelf((state) => state.reputation);
