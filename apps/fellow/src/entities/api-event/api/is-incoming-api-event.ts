import { IncomingApiEvent } from './types';

export const isIncomingApiEvent = <T = unknown>(
  data: unknown
): data is IncomingApiEvent<T> => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return Object.hasOwn(data, 'type') && Object.hasOwn(data, 'data');
};
