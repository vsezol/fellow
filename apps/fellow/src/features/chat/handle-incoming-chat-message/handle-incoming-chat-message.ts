import { useEffect } from 'react';
import { AddMessagePayload, chatsSlice } from '../../../entities/chat';
import {
  IncomingChatMessage,
  handleIncomingEvent,
  isIncomingChatMessageEvent,
} from '../../../shared/api/ws';
import {
  Subscription,
  Unsubscribe,
  playHeartEffect,
  playPenisEffect,
} from '../../../shared/lib';
import { useAppDispatch } from '../../../store';

export const handleIncomingChatMessage = (
  sub: Subscription<IncomingChatMessage>
): Unsubscribe =>
  handleIncomingEvent((event) => {
    if (!isIncomingChatMessageEvent(event)) {
      return;
    }

    penisEffectHandler(event.data.message);
    heartEffectHandler(event.data.message);

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

export const penisEffectHandler = (text: string) => {
  if (!text.includes(':penis:')) {
    return;
  }

  setTimeout(playPenisEffect, 300);
};

export const heartEffectHandler = (text: string) => {
  if (!text.includes(':heart:')) {
    return;
  }

  setTimeout(playHeartEffect, 300);
};
