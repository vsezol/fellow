export interface ChatMessage {
  id: number;
  from: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: number;
  members: string[];
  messages: ChatMessage[];
}

export interface AddMessagePayload {
  chatId: number;
  message: ChatMessage;
}

export interface AddChatPayload {
  id: number;
  members: string[];
}

export interface ChatsState {
  current: string | undefined;
  chats: Partial<Record<string, Chat>>;
}

export interface ChatPreview {
  id: number;
  members: string[];
  lastMessage: ChatMessage | undefined;
}
