import { fellowApi } from '../../../shared/api';

export const updateCachedUserStatus = (userName: string, status: string) =>
  fellowApi.util.updateQueryData('getUser', { username: userName }, (state) => {
    state.status = status;
  });
