import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

export interface UserState {
  name: string;
}

const initialState: UserState = {
  name: '',
};

const SLICE_NAME = 'user';

export const userSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
    },
  },
});

const selectSelf = (state: { [SLICE_NAME]: UserState }) => state[SLICE_NAME];

export const selectUserName = createSelector(selectSelf, (state) => state.name);
