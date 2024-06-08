import { useEffect } from 'react';
import { Subscription, Unsubscribe } from '../../../shared';
import { useAppDispatch } from '../../../store';
import { handleIncomingEvent } from '../../api-event';
import { isStatusChangeEvent } from './is-status-change-event';
import { StatusChangeEvent } from './types';
import { updateCachedUserStatus } from './user-api';

const handleStatusChangeEvent = (
  sub: Subscription<StatusChangeEvent>
): Unsubscribe =>
  handleIncomingEvent(({ data }) => {
    if (!isStatusChangeEvent(data)) {
      return;
    }

    sub(data);
  });

export const useStatusChangeHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return handleStatusChangeEvent((data) => {
      dispatch(updateCachedUserStatus(data.userId, data.status));
    });
  }, []);
};
