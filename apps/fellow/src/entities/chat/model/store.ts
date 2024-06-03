import { OutputSelector, PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createSelectFromSelf,
  createSelectSelf,
  createSliceSelectorWithTypes,
} from '../../../shared';
import { AddMessagePayload, ChatPreview, ChatsState } from './types';

const initialState: ChatsState = {
  current: undefined,
  chats: {},
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<string | undefined>) => {
      state.current = action.payload;
    },
    addChat: (state, action: PayloadAction<string>) => {
      state.chats[action.payload] ||= {
        messages: [],
      };
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats[action.payload] = undefined;
      if (state.current === action.payload) {
        state.current = undefined;
      }
    },
    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { chat, message } = action.payload;

      state.chats[chat] ||= {
        messages: [],
      };

      const isExists = state.chats?.[chat]?.messages.some(
        ({ id }) => id === message.id
      );

      if (isExists) {
        return;
      }

      state.chats?.[chat]?.messages.push(message);
    },
  },
});

const selectSelf = createSelectSelf(chatsSlice);
const selectFromSelf = createSelectFromSelf(chatsSlice);
const createSliceSelector = createSliceSelectorWithTypes(chatsSlice);

export const selectCurrentChatName = selectFromSelf((state) => state.current);

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

export const selectMessageById = (id: string) =>
  selectFromSelf((state) => {
    for (const chatName of Object.keys(state.chats)) {
      const message = state.chats[chatName]?.messages?.find((x) => x.id === id);

      if (message) {
        return message;
      }
    }

    return undefined;
  });
