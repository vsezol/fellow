export interface OutgoingChatMessage {
  to: string;
  message: string;
}

export interface IncomingChatMessage {
  from: string;
  message: string;
}

export interface HistoryChatMessage {
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

export function isHistoryChatMessage(
  data: undefined | null | string | object
): data is HistoryChatMessage {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return (
    Object.hasOwn(data, 'from') &&
    Object.hasOwn(data, 'to') &&
    Object.hasOwn(data, 'message') &&
    Object.hasOwn(data, 'timestamp')
  );
}

export function isIncomingChatMessage(
  data: undefined | null | string | object
): data is IncomingChatMessage {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return Object.hasOwn(data, 'from') && Object.hasOwn(data, 'message');
}
