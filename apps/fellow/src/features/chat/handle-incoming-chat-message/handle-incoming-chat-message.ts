import { useEffect } from 'react';
import { AddMessagePayload, chatsSlice } from '../../../entities/chat';
import { handleIncomingEvent } from '../../../shared/api/ws';
import { Subscription, Unsubscribe } from '../../../shared/lib';
import { useAppDispatch } from '../../../store';

export const handleIncomingChatMessage = (
  sub: Subscription<IncomingChatMessage>
): Unsubscribe =>
  handleIncomingEvent((event) => {
    if (!isIncomingChatMessageEvent(event)) {
      return;
    }

    sub(event.data);
  });

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

export const useChatMessageHandler = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { addMessage } = chatsSlice.actions;

    return handleIncomingChatMessage((data) => {
      const payload = incomingChatMessageToAddMessagePayload(data);

      dispatch(addMessage(payload));
    });
  }, []);
};
