import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { playPenisEffect } from '../../shared';
import { useAppSelector } from '../../store';
import { chatsSlice } from '../chat';
import { selectUserName } from '../user';
import { OutgoingChatMessage, isIncomingChatMessage } from './api';

const WEB_SOCKET_URL = import.meta.env.VITE_WEB_SOCKET_URL;

export type SendChatMessageFn = (message: OutgoingChatMessage) => void;

export const ChatMessagesApiContext = createContext<SendChatMessageFn>(
  () => undefined
);

export const useSendChatMessage = () => useContext(ChatMessagesApiContext);

export const ChatMessagesApiProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const dispatch = useDispatch();
  const { addMessage } = chatsSlice.actions;

  const userName = useAppSelector(selectUserName);

  const { sendJsonMessage } = useWebSocket(
    `${WEB_SOCKET_URL}/chat?userId=${userName}`,
    {
      onMessage: (event) => {
        try {
          const data = JSON.parse(event.data);

          if (!isIncomingChatMessage(data)) {
            return;
          }

          if (data.message.includes(':penis:')) {
            setTimeout(() => playPenisEffect(), 300);
          }

          dispatch(
            addMessage({
              chat: userName === data.from ? data.to : data.from,
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
    }
  );

  const sendChatMessage: SendChatMessageFn = useCallback(
    (data) => {
      sendJsonMessage(data);

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
    [sendJsonMessage, dispatch, addMessage, userName]
  );

  return (
    <ChatMessagesApiContext.Provider value={sendChatMessage}>
      {children}
    </ChatMessagesApiContext.Provider>
  );
};
