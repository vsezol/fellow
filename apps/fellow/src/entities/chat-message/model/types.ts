export interface IncomingChatMessage {
  id: string;
  from: string;
  to: number;
  message: string;
  timestamp: string;
}

export interface OutgoingChatMessage {
  to: string;
  message: string;
}
