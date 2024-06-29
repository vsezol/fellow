import { IncomingEvent, IncomingEventType } from './incoming-event';

export interface GroupCreateEventData {
  id: string;
  members: string[];
}

export interface GroupCreateEvent extends IncomingEvent {
  type: IncomingEventType.GroupCreate;
  data: GroupCreateEventData;
}

export const isGroupCreateEvent = (
  data: IncomingEvent
): data is GroupCreateEvent => data.type === IncomingEventType.GroupCreate;
