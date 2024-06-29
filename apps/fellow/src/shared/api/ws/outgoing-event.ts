import { Subject, Subscription, Unsubscribe } from '../../lib';

const outgoingEventSubject = new Subject<unknown>();

export const handleOutgoingEvent = (sub: Subscription): Unsubscribe =>
  outgoingEventSubject.subscribe(sub);

export const dispatchOutgoingEvent = <T>(event: T) =>
  outgoingEventSubject.next(event);
