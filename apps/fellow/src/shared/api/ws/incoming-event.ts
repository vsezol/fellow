import { Subject, Subscription, Unsubscribe } from '../../lib';

export enum IncomingEventType {
  Message = 'MESSAGE',
  StatusChange = 'STATUS_CHANGE',
  GroupCreate = 'GROUP_CREATE',
}

export interface IncomingEvent {
  type: IncomingEventType;
  data: unknown;
}

export const isIncomingEvent = (data: unknown): data is IncomingEvent => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return Object.hasOwn(data, 'type') && Object.hasOwn(data, 'data');
};

const incomingEventSubject = new Subject<IncomingEvent>();

export const handleIncomingEvent = (
  sub: Subscription<IncomingEvent>
): Unsubscribe => incomingEventSubject.subscribe(sub);

export const dispatchIncomingEvent = (event: IncomingEvent) =>
  incomingEventSubject.next(event);
