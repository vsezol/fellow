import {
  GroupCreateEventData,
  handleIncomingEvent,
  isGroupCreateEvent,
} from '../../shared/api/ws';
import { Subscription, Unsubscribe } from '../../shared/lib';

export const handleGroupCreateEvent = (
  sub: Subscription<GroupCreateEventData>
): Unsubscribe =>
  handleIncomingEvent((event) => {
    if (!isGroupCreateEvent(event)) {
      return;
    }

    sub(event.data);
  });
