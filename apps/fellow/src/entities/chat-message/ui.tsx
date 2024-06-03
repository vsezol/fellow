import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { playPenisEffect } from '../../shared';
import { playHeartEffect } from '../../shared/lib/play-heart-effect';
import { useAppSelector } from '../../store';
import { chatsSlice, selectMessageById } from '../chat';
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
  const state = useAppSelector((x) => x);
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

          if (
            data.message.includes(':penis:') &&
            !selectMessageById(data.id)(state)
          ) {
            setTimeout(() => playPenisEffect(), 300);
          }

          if (
            data.message.includes(':heart:') &&
            !selectMessageById(data.id)(state)
          ) {
            setTimeout(() => playHeartEffect(), 300);
          }

          dispatch(
            addMessage({
              chat: userName === data.from ? data.to : data.from,
              message: {
                id: data.id,
                from: data.from,
                text: data.message,
                timestamp: data.timestamp,
              },
            })
          );
        } catch {
          console.error('Error while parsing message event');
        }
      },
    }
  );

  return (
    <ChatMessagesApiContext.Provider value={sendJsonMessage}>
      {children}
    </ChatMessagesApiContext.Provider>
  );
};
