import { IncomingEvent, IncomingEventType } from './incoming-event';

export interface IncomingChatMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export interface IncomingChatMessageEvent extends IncomingEvent {
  type: IncomingEventType.Message;
  data: IncomingChatMessage;
}

export const isIncomingChatMessageEvent = (
  data: IncomingEvent
): data is IncomingChatMessageEvent => data.type === IncomingEventType.Message;
