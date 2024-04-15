import { OutputSelector, PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createSelectFromSelf,
  createSelectSelf,
  createSliceSelectorWithTypes,
} from '../shared';

export interface ChatsState {
  current: string | undefined;
  chats: Partial<Record<string, Chat>>;
}

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

export interface ChatPreview {
  name: string;
  lastMessage: ChatMessage | undefined;
}

const initialState: ChatsState = {
  current: undefined,
  chats: {},
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
    addChat: (state, action: PayloadAction<string>) => {
      state.chats[action.payload] ||= {
        messages: [],
      };
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats[action.payload] = undefined;
    },
    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { chat, message } = action.payload;

      state.chats[chat] ||= {
        messages: [],
      };

      state.chats?.[chat]?.messages.push(message);
    },
  },
});

const selectSelf = createSelectSelf(chatsSlice);
const selectFromSelf = createSelectFromSelf(chatsSlice);
const createSliceSelector = createSliceSelectorWithTypes(chatsSlice);

export const selectCurrentChat = selectFromSelf((state) => state.current);

export const selectCurrentMessages = selectFromSelf(
  ({ chats, current }) => chats?.[current ?? '']?.messages
);

export const selectChats: OutputSelector<[typeof selectSelf], ChatPreview[]> =
  createSliceSelector(selectSelf, (state) =>
    Object.keys(state.chats)
      .filter((key) => state.chats[key] !== undefined)
      .map((key) => ({
        name: key,
        lastMessage: state.chats?.[key]?.messages.at(-1),
      }))
  );
