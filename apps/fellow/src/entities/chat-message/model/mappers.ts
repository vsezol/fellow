import { AddMessagePayload } from '../../chat';
import { IncomingChatMessage } from './types';

export const incomingChatMessageToAddMessagePayload = (
  message: IncomingChatMessage
): AddMessagePayload => ({
  chatId: message.to,
  message: {
    id: message.id,
    from: message.from,
    text: message.message,
    timestamp: message.timestamp,
  },
});
