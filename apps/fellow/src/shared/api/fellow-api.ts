import { generatedApi } from './generated-api';

export const fellowApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['User', 'History'],
  endpoints: {
    getUser: { providesTags: ['User'] },
    getHistory: {
      providesTags: ['History'],
    },
  },
});
