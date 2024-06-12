import { OutputSelector, PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  createSelectFromSelf,
  createSelectSelf,
  createSliceSelectorWithTypes,
} from '../../../shared';
import {
  AddChatPayload,
  AddMessagePayload,
  Chat,
  ChatPreview,
  ChatsState,
} from './types';

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
    addChat: (state, action: PayloadAction<AddChatPayload>) => {
      state.chats[action.payload.id] ||= {
        id: action.payload.id,
        members: action.payload.members,
        messages: [],
      };
    },
    deleteChat: (state, action: PayloadAction<number>) => {
      state.chats[action.payload] = undefined;
      if (state.current === action.payload) {
        state.current = undefined;
      }
    },
    addMessage: (state, action: PayloadAction<AddMessagePayload>) => {
      const { chatId, message } = action.payload;

      if (!state.chats?.[chatId]) {
        return;
      }

      const isExists = state.chats?.[chatId]?.messages.some(
        ({ id }) => id === message.id
      );

      if (isExists) {
        return;
      }

      state.chats?.[chatId]?.messages.push(message);

      state.chats?.[chatId]?.messages.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    },
  },
});

const selectSelf = createSelectSelf(chatsSlice);
const selectFromSelf = createSelectFromSelf(chatsSlice);
const createSliceSelector = createSliceSelectorWithTypes(chatsSlice);

export const selectCurrentChatId = selectFromSelf((state) => state.current);

export const selectCurrentChat = selectFromSelf((state) => {
  if (!state.current) {
    return undefined;
  }

  return state.chats?.[state?.current];
});

export const selectCurrentMessages = selectFromSelf(
  ({ chats, current }) => chats?.[current ?? '']?.messages
);

export const selectChats: OutputSelector<[typeof selectSelf], ChatPreview[]> =
  createSliceSelector(selectSelf, (state) =>
    Object.keys(state.chats)
      .map((key) => state.chats[key])
      .filter((chat): chat is Chat => chat !== undefined)
      .map(({ id, members, messages }) => ({
        id,
        members,
        lastMessage: messages.at(-1),
      }))
  );
