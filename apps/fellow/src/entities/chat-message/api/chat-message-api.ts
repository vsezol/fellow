import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IncomingChatMessage } from '../model/types';

interface HistoryData {
  pages: IncomingChatMessage[];
  total: number;
}

export const chatMessageApi = createApi({
  reducerPath: 'chatMessageApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HTTP_API_URL }),
  tagTypes: ['ChatMessage'],
  endpoints: (builder) => ({
    getHistory: builder.query<IncomingChatMessage[], string>({
      query: (chatName) =>
        `history/${chatName}?pageNumber=${0}&pageSize=${1000}`,
      transformResponse: (data: HistoryData) => data.pages,
      providesTags: ['ChatMessage'],
    }),
  }),
});

export const { useGetHistoryQuery } = chatMessageApi;
