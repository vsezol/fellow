import { Subscription, Unsubscribe } from '../../../shared';
import { handleIncomingEvent } from '../../api-event';
import { GroupCreateEventData } from '../api/group-create-event';
import { isGroupCreateEvent } from '../api/is-group-create-event';

export const handleGroupCreateEvent = (
  sub: Subscription<GroupCreateEventData>
): Unsubscribe =>
  handleIncomingEvent((event) => {
    if (!isGroupCreateEvent(event)) {
      return;
    }

    sub(event.data);
  });
