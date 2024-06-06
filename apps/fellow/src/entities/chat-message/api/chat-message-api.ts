import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IncomingChatMessage } from './types';

interface HistoryData {
  data: IncomingChatMessage[];
}

export const chatMessageApi = createApi({
  reducerPath: 'chatMessageApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_HTTP_API_URL }),
  endpoints: (builder) => ({
    getHistory: builder.query<IncomingChatMessage[], string>({
      query: (userName) => `history/${userName}`,
      transformResponse: (data: HistoryData) => data.data,
    }),
  }),
});

export const { useGetHistoryQuery } = chatMessageApi;
