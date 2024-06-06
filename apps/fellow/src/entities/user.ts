import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelectFromSelf } from '../shared';

export interface User {
  name: string;
  status: string;
}

export type UserState = User;

const initialState: UserState = {
  name: '',
  status: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.status = action.payload.status;
    },
  },
});

const selectFromSelf = createSelectFromSelf(userSlice);

export const selectUserName = selectFromSelf((state) => state.name);
export const selectUserStatus = selectFromSelf((state) => state.status);

interface GetUserResponse {
  id: string;
  username: string;
  status: string;
}

interface EditStatusRequest {
  userId: string;
  status: string;
}

export const userMessageApi = createApi({
  reducerPath: 'userMessageApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HTTP_API_URL }),
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userName) => `user/${userName}`,
      transformResponse: (data: GetUserResponse) => ({
        name: data.username,
        status: data.status,
      }),
    }),
    editStatus: builder.mutation<void, EditStatusRequest>({
      query: (body) => ({ url: `changeStatus`, method: 'POST', body }),
    }),
  }),
});

export const { useGetUserQuery, useEditStatusMutation } = userMessageApi;
