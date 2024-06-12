export interface ChatMessage {
  id: string;
  from: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  members: string[];
  messages: ChatMessage[];
}

export interface AddMessagePayload {
  chatId: string;
  message: ChatMessage;
}

export interface AddChatPayload {
  id: string;
  members: string[];
}

export interface ChatsState {
  current: string | undefined;
  chats: Partial<Record<string, Chat>>;
}

export interface ChatPreview {
  id: string;
  members: string[];
  lastMessage: ChatMessage | undefined;
}
