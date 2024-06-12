import { generatedApi } from './generated-api';

export const fellowApi = generatedApi.enhanceEndpoints({
  addTagTypes: ['User'],
  endpoints: {
    getUser: { providesTags: ['User'] },
  },
});
