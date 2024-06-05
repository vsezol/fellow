export enum IncomingApiEventType {
  Message = 'MESSAGE',
  StatusChange = 'STATUS_CHANGE',
}

export interface IncomingApiEvent<T> {
  type: IncomingApiEventType;
  data: T;
}
