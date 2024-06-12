export enum IncomingApiEventType {
  Message = 'MESSAGE',
  StatusChange = 'STATUS_CHANGE',
  GroupCreate = 'GROUP_CREATE',
}

export interface IncomingApiEvent {
  type: IncomingApiEventType;
  data: unknown;
}
