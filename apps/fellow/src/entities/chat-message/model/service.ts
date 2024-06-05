import { Subscription, Unsubscribe } from '../../../shared';
import { dispatchOutgoingEvent, handleIncomingEvent } from '../../api-event';
import { isIncomingChatMessage } from '../api/is-incoming-chat-message';
import { IncomingChatMessage, OutgoingChatMessage } from './types';

export const handleIncomingChatMessage = (
  sub: Subscription<IncomingChatMessage>
): Unsubscribe =>
  handleIncomingEvent(({ data }) => {
    if (!isIncomingChatMessage(data)) {
      return;
    }

    sub(data);
  });

export const dispatchOutgoingMessage = (data: OutgoingChatMessage) =>
  dispatchOutgoingEvent(data);
