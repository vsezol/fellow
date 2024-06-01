export interface SendChatMessageApi {
  to: string;
  message: string;
}

export interface GetChatMessageApi {
  from: string;
  message: string;
}

export function isGetChatMessage(
  message: undefined | null | string | object
): message is GetChatMessageApi {
  if (!message || typeof message !== 'object') {
    return false;
  }

  return Object.hasOwn(message, 'from') && Object.hasOwn(message, 'message');
}
