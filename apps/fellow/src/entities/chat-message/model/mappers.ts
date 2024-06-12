import { AddMessagePayload } from '../../chat';
import { IncomingChatMessage } from './types';

export const incomingChatMessageToAddMessagePayload = (
  message: IncomingChatMessage
): AddMessagePayload => ({
  chatId: message.to,
  message: {
    // TODO: remove after api fix
    id: Number(message.id),
    from: message.from,
    text: message.message,
    timestamp: message.timestamp,
  },
});
