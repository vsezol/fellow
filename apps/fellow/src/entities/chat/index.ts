export { chatApi, useGetChatsQuery } from './api/chat-api';
export {
  chatsSlice,
  selectChats,
  selectCurrentChatName,
  selectCurrentMessages,
} from './model/store';
export type {
  AddMessagePayload,
  ChatMessage,
  ChatPreview,
} from './model/types';
