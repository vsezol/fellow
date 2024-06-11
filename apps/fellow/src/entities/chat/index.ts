export {
  chatApi,
  useCreateChatMutation,
  useGetChatsQuery,
} from './api/chat-api';
export {
  chatsSlice,
  selectChats,
  selectCurrentChat,
  selectCurrentChatId,
  selectCurrentMessages,
} from './model/store';
export type {
  AddMessagePayload,
  ChatMessage,
  ChatPreview,
} from './model/types';
