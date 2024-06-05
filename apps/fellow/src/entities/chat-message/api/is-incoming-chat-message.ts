import { IncomingChatMessage } from '../model/types';

export const isIncomingChatMessage = (
  data: unknown
): data is IncomingChatMessage => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const keys: (keyof IncomingChatMessage)[] = [
    'id',
    'from',
    'to',
    'message',
    'timestamp',
  ];

  return keys.every((k) => Object.hasOwn(data, k));
};
