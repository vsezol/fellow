import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IncomingChatMessage } from '../model/types';

interface HistoryData {
  page: IncomingChatMessage[];
  total: number;
}

export const chatMessageApi = createApi({
  reducerPath: 'chatMessageApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HTTP_API_URL }),
  endpoints: (builder) => ({
    getHistory: builder.query<IncomingChatMessage[], string>({
      query: (groupId) => `history/${groupId}?pageNumber=${0}&pageSize=${1000}`,
      transformResponse: (data: HistoryData) => data.page,
    }),
  }),
});

export const { useGetHistoryQuery } = chatMessageApi;
