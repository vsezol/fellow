import { IncomingEvent, IncomingEventType } from './incoming-event';

export interface StatusChangeEvent extends IncomingEvent {
  type: IncomingEventType.StatusChange;
  data: StatusChangeEventData;
}

export interface StatusChangeEventData {
  userId: string;
  status: string;
}

export const isStatusChangeEvent = (
  data: IncomingEvent
): data is StatusChangeEvent => data.type === IncomingEventType.StatusChange;
