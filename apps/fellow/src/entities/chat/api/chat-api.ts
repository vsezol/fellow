import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface GetChatsResponse {
  lastMessages: ChatApi[];
}

export interface ChatApi {
  id: string;
  chatName: string;
  sender: string;
  members: string[];
  message: string;
  timestamp: string;
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HTTP_API_URL }),
  tagTypes: ['Chats'],
  endpoints: (builder) => ({
    getChats: builder.query<GetChatsResponse, string>({
      query: (userName) => `users/${userName}/activity`,
      providesTags: ['Chats'],
    }),
  }),
});

export const { useGetChatsQuery } = chatApi;
