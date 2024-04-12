import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ChatMessage {
  from: string;
  text: string;
}

export interface Chat {
  messages: ChatMessage[];
}

export interface AddMessagePayload {
  chat: string;
  message: ChatMessage;
}

export type ChatsState = Record<string, Chat>;

const initialState: ChatsState = {};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { chat, message } = action.payload;

      state[chat] ||= {
        messages: [],
      };

      state[chat].messages.push(message);
    },
  },
});
