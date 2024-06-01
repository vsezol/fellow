import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import { chatsSlice } from '../../entity/chats';
import { selectUserName } from '../../entity/user';
import { useWebSocket } from '../../shared';
import { useAppSelector } from '../../store';
import { SendChatMessageApi, isGetChatMessage } from './api';

const WEB_SOCKET_URL = `wss://chat-server.vsezol.com`;

export type SendChatMessage = (message: SendChatMessageApi) => void;

export const ChatMessagesApiContext = createContext<SendChatMessage>(
  () => undefined
);

export const useSendChatMessageApi = () => useContext(ChatMessagesApiContext);

export const ChatMessagesApiProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { addMessage } = chatsSlice.actions;

  const userName = useAppSelector(selectUserName);

  const send = useWebSocket({
    url: `${WEB_SOCKET_URL}/chat?userId=${userName}`,
    message: (event) => {
      try {
        const data = JSON.parse(event.data);

        if (!isGetChatMessage(data)) {
          return;
        }

        dispatch(
          addMessage({
            chat: data.from,
            message: {
              from: data.from,
              text: data.message,
            },
          })
        );
      } catch {
        console.error('Error while parsing message event');
      }
    },
  });

  const sendChatMessage: SendChatMessage = useCallback(
    (data) => {
      // TODO delete message if error
      send(JSON.stringify(data));
      dispatch(
        addMessage({
          chat: data.to,
          message: {
            from: userName,
            text: data.message,
          },
        })
      );
    },
    [send, dispatch, addMessage, userName]
  );

  return (
    <ChatMessagesApiContext.Provider value={sendChatMessage}>
      {children}
    </ChatMessagesApiContext.Provider>
  );
};
