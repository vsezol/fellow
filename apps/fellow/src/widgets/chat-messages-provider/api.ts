import { AddMessagePayload } from '../../entity/chats';

export interface ChatMessageApi {
  from: string;
  to: string;
  text: string;
}

export const parseMessageEvent = (event: MessageEvent): ChatMessageApi => {
  const message = JSON.parse(event.data);

  if (!isMessage(message)) {
    throw new Error('MessageEvent is not ChatMessageApi');
  }

  return message;
};

export const toAddMessagePayload = ({
  to,
  from,
  text,
}: ChatMessageApi): AddMessagePayload => ({
  chat: to,
  message: {
    from,
    text,
  },
});

export const toChatMessageApi = ({
  chat,
  message,
}: AddMessagePayload): ChatMessageApi => ({
  to: chat,
  from: message.from,
  text: message.text,
});

function isMessage(
  message: undefined | null | string | object
): message is ChatMessageApi {
  if (!message || typeof message !== 'object') {
    return false;
  }

  return (
    Object.hasOwn(message, 'from') &&
    Object.hasOwn(message, 'to') &&
    Object.hasOwn(message, 'text')
  );
}
