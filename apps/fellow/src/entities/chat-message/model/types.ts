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
