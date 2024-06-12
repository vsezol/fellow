import { IncomingApiEvent, IncomingApiEventType } from '../../api-event';
import { StatusChangeEvent } from './types';

export const isStatusChangeEvent = (
  data: IncomingApiEvent
): data is StatusChangeEvent => data.type === IncomingApiEventType.StatusChange;
