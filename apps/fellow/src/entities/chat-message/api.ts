export interface OutgoingChatMessage {
  to: string;
  message: string;
}

export interface IncomingChatMessage {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export function isIncomingChatMessage(
  data: undefined | null | string | object
): data is IncomingChatMessage {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return (
    Object.hasOwn(data, 'id') &&
    Object.hasOwn(data, 'from') &&
    Object.hasOwn(data, 'to') &&
    Object.hasOwn(data, 'message') &&
    Object.hasOwn(data, 'timestamp')
  );
}
