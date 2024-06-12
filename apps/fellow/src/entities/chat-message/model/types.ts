import { IncomingApiEvent, IncomingApiEventType } from '../../api-event';

export interface IncomingChatMessageEvent extends IncomingApiEvent {
  type: IncomingApiEventType.Message;
  data: IncomingChatMessage;
}

export interface IncomingChatMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export interface OutgoingChatMessage {
  to: string;
  message: string;
}
