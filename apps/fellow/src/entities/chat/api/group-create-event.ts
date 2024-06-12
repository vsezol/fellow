import { IncomingApiEvent, IncomingApiEventType } from '../../api-event';

export interface GroupCreateEventData {
  id: string;
  members: string[];
}

export interface GroupCreateEvent extends IncomingApiEvent {
  type: IncomingApiEventType.GroupCreate;
  data: GroupCreateEventData;
}
