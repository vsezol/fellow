import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import { chatsSlice } from '../../entity/chats';
import { useWebSocket } from '../../shared';
import { ChatMessageApi, parseMessageEvent, toAddMessagePayload } from './api';

export type SendChatMessageApi = (message: ChatMessageApi) => void;

export const ChatMessagesApiContext = createContext<SendChatMessageApi>(
  () => undefined
);

export const useSendChatMessageApi = () => useContext(ChatMessagesApiContext);

export const ChatMessagesApiProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { addMessage } = chatsSlice.actions;

  const send = useWebSocket({
    url: 'ws://localhost:5001',
    message: (event) => {
      try {
        const data = toAddMessagePayload(parseMessageEvent(event));
        dispatch(addMessage(data));
      } catch {
        console.error('Error while parsing message event');
      }
    },
  });

  const sendChatMessage: SendChatMessageApi = useCallback(
    (message) => {
      // TODO delete message if error
      send(JSON.stringify(message));
      dispatch(addMessage(toAddMessagePayload(message)));
    },
    [send, dispatch, addMessage]
  );

  return (
    <ChatMessagesApiContext.Provider value={sendChatMessage}>
      {children}
    </ChatMessagesApiContext.Provider>
  );
};
