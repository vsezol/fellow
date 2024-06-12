import { Subject, Subscription, Unsubscribe } from '../../../shared';
import { IncomingApiEvent } from '../api/types';

const incomingEventSubject = new Subject<IncomingApiEvent>();
const outgoingEventSubject = new Subject<unknown>();

export const handleIncomingEvent = (
  sub: Subscription<IncomingApiEvent>
): Unsubscribe => incomingEventSubject.subscribe(sub);

export const dispatchIncomingEvent = (event: IncomingApiEvent) =>
  incomingEventSubject.next(event);

export const handleOutgoingEvent = (sub: Subscription): Unsubscribe =>
  outgoingEventSubject.subscribe(sub);

export const dispatchOutgoingEvent = <T>(event: T) =>
  outgoingEventSubject.next(event);
