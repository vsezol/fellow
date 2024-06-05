import { dispatchOutgoingMessage } from '../../chat-message/model/service';
import { SendChatMessagePayload } from './types';

export const sendChatMessage = (data: SendChatMessagePayload) =>
  dispatchOutgoingMessage({ to: data.to, message: data.text });
