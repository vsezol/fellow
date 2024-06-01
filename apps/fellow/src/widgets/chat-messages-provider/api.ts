export interface OutgoingChatMessage {
  to: string;
  message: string;
}

export interface IncomingChatMessage {
  from: string;
  message: string;
}

export function isIncomingChatMessage(
  data: undefined | null | string | object
): data is IncomingChatMessage {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return Object.hasOwn(data, 'from') && Object.hasOwn(data, 'message');
}
