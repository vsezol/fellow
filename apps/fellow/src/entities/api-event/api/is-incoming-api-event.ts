import { IncomingApiEvent } from './types';

export const isIncomingApiEvent = (data: unknown): data is IncomingApiEvent => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  return Object.hasOwn(data, 'type') && Object.hasOwn(data, 'data');
};
