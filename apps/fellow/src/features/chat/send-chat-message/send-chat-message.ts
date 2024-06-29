import { dispatchOutgoingEvent } from '../../../entities/api-event';

export const sendChatMessage = (data: OutgoingChatMessage) =>
  dispatchOutgoingEvent<OutgoingChatMessage>({
    to: data.to,
    message: data.message,
  });
