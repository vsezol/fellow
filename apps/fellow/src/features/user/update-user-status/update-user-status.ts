import { useEffect } from 'react';

import { fellowApi } from '../../../shared/api/rest';
import {
  StatusChangeEventData,
  handleIncomingEvent,
  isStatusChangeEvent,
} from '../../../shared/api/ws';
import { Subscription, Unsubscribe } from '../../../shared/lib';
import { useAppDispatch } from '../../../store';

export const updateUserStatus = (userName: string, status: string) =>
  fellowApi.util.updateQueryData('getUser', { username: userName }, (state) => {
    state.status = status;
  });

export const useUserStatusChangeHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () =>
      handleStatusChangeEvent((data) => {
        dispatch(updateUserStatus(data.userId, data.status));
      }),
    [dispatch]
  );
};

const handleStatusChangeEvent = (
  sub: Subscription<StatusChangeEventData>
): Unsubscribe =>
  handleIncomingEvent((event) => {
    if (!isStatusChangeEvent(event)) {
      return;
    }

    sub(event.data);
  });
