import { IncomingApiEvent, IncomingApiEventType } from '../../api-event';

export interface StatusChangeEvent extends IncomingApiEvent {
  type: IncomingApiEventType.StatusChange;
  data: StatusChangeEventData;
}

export interface StatusChangeEventData {
  userId: string;
  status: string;
}
