import { Subscription, Unsubscribe } from '../../../shared';
import { dispatchOutgoingEvent, handleIncomingEvent } from '../../api-event';
import { isIncomingChatMessageEvent } from '../api/is-incoming-chat-message';
import { IncomingChatMessage, OutgoingChatMessage } from './types';

export const handleIncomingChatMessage = (
  sub: Subscription<IncomingChatMessage>
): Unsubscribe =>
  handleIncomingEvent((event) => {
    if (!isIncomingChatMessageEvent(event)) {
      return;
    }

    sub(event.data);
  });

export const dispatchOutgoingChatMessage = (data: OutgoingChatMessage) =>
  dispatchOutgoingEvent<OutgoingChatMessage>({
    to: data.to,
    message: data.message,
  });
