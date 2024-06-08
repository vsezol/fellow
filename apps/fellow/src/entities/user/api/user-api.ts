import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../model';

interface GetUserResponse {
  id: string;
  username: string;
  status: string;
}

interface EditStatusRequest {
  username: string;
  status: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HTTP_API_URL }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (userName) => `users/${userName}`,
      providesTags: ['User'],
      transformResponse: (data: GetUserResponse) => ({
        name: data.username,
        status: data.status,
      }),
    }),
    editStatus: builder.mutation<void, EditStatusRequest>({
      query: (body) => ({ url: `users/status`, method: 'PATCH', body }),
    }),
  }),
});

export const { useGetUserQuery, useEditStatusMutation } = userApi;

export const updateCachedUserStatus = (userName: string, status: string) =>
  userApi.util.updateQueryData('getUser', userName, (state) => {
    state.status = status;
  });
