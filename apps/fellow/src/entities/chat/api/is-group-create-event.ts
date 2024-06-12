import { IncomingApiEvent, IncomingApiEventType } from '../../api-event';
import { GroupCreateEvent } from './group-create-event';

export const isGroupCreateEvent = (
  data: IncomingApiEvent
): data is GroupCreateEvent => data.type === IncomingApiEventType.GroupCreate;
