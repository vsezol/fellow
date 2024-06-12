export interface IncomingChatMessage {
  id: number;
  from: string;
  to: number;
  message: string;
  timestamp: string;
}

export interface OutgoingChatMessage {
  to: number;
  message: string;
}
