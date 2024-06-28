import { useEffect } from 'react';
import {
  IncomingApiEvent,
  IncomingApiEventType,
  handleIncomingEvent,
} from '../../../entities/api-event';
import { Subscription, Unsubscribe, fellowApi } from '../../../shared';
import { useAppDispatch } from '../../../store';

export const updateUserStatus = (userName: string, status: string) =>
  fellowApi.util.updateQueryData('getUser', { username: userName }, (state) => {
    state.status = status;
  });

export const useUserStatusChangeHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(
    () =>
      handleStatusChangeEvent((data) =>
        dispatch(updateUserStatus(data.userId, data.status))
      ),
    [dispatch]
  );
};

interface StatusChangeEvent extends IncomingApiEvent {
  type: IncomingApiEventType.StatusChange;
  data: StatusChangeEventData;
}

interface StatusChangeEventData {
  userId: string;
  status: string;
}

const isStatusChangeEvent = (
  data: IncomingApiEvent
): data is StatusChangeEvent => data.type === IncomingApiEventType.StatusChange;

const handleStatusChangeEvent = (
  sub: Subscription<StatusChangeEventData>
): Unsubscribe =>
  handleIncomingEvent((event) => {
    if (!isStatusChangeEvent(event)) {
      return;
    }

    sub(event.data);
  });
