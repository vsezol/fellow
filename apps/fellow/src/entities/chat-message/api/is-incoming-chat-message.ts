import { IncomingApiEvent, IncomingApiEventType } from '../../api-event';
import { IncomingChatMessageEvent } from '../model/types';

export const isIncomingChatMessageEvent = (
  data: IncomingApiEvent
): data is IncomingChatMessageEvent =>
  data.type === IncomingApiEventType.Message;
