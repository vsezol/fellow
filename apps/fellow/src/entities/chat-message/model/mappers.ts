import { AddMessagePayload } from '../../chat';
import { IncomingChatMessage } from './types';

export const incomingChatMessageToAddMessagePayload = (
  message: IncomingChatMessage,
  userName: string
): AddMessagePayload => ({
  chat: userName === message.from ? message.to : message.from,
  message: {
    id: message.id,
    from: message.from,
    text: message.message,
    timestamp: message.timestamp,
  },
});
