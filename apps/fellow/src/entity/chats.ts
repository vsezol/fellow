import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

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

export type ChatsState = {
  current: string | undefined;
  chats: Record<string, Chat>;
};

const SLICE_NAME = 'chats';

const initialState: ChatsState = {
  current: undefined,
  chats: {},
};

export const chatsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { chat, message } = action.payload;

      state.chats[chat] ||= {
        messages: [],
      };

      state.chats[chat].messages.push(message);
    },
  },
});

const selectSelf = (state: { [SLICE_NAME]: ChatsState }) => state[SLICE_NAME];

export const selectCurrentChat = createSelector(
  selectSelf,
  (state) => state.current
);
