export interface ChatMessage {
  id: string;
  from: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  messages: ChatMessage[];
}

export interface AddMessagePayload {
  chat: string;
  message: ChatMessage;
}

export interface ChatsState {
  current: string | undefined;
  chats: Partial<Record<string, Chat>>;
}

export interface ChatPreview {
  name: string;
  lastMessage: ChatMessage | undefined;
}

export interface SendChatMessagePayload {
  to: string;
  text: string;
}
