import { Subject, Subscription, Unsubscribe } from '../../../shared';
import { IncomingApiEvent } from '../api/types';

const incomingEventSubject = new Subject<IncomingApiEvent<unknown>>();
const outgoingEventSubject = new Subject<unknown>();

export const handleIncomingEvent = (
  sub: Subscription<IncomingApiEvent<unknown>>
): Unsubscribe => incomingEventSubject.subscribe(sub);

export const dispatchIncomingEvent = (event: IncomingApiEvent<unknown>) =>
  incomingEventSubject.next(event);

export const handleOutgoingEvent = (sub: Subscription): Unsubscribe =>
  outgoingEventSubject.subscribe(sub);

export const dispatchOutgoingEvent = <T>(event: T) =>
  outgoingEventSubject.next(event);
