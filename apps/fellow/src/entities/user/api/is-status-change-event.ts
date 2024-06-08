import { StatusChangeEvent } from './types';

export const isStatusChangeEvent = (
  data: unknown
): data is StatusChangeEvent => {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const keys: (keyof StatusChangeEvent)[] = ['userId', 'status'];

  return keys.every((k) => Object.hasOwn(data, k));
};
