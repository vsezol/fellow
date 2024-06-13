import { ChatMessageResponse } from '../../../shared';
import { AddMessagePayload, ChatMessage } from '../../chat';
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

export const chatMessageResponseToChatMessage = (
  message: ChatMessageResponse
): ChatMessage => ({
  id: message.id,
  from: message.from,
  text: message.message,
  timestamp: message.timestamp,
});
