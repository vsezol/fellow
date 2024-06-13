import { FC, Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  chatsSlice,
  selectCurrentChatId,
  useGroupCreateHandler,
} from '../entities/chat';

import Layout from '../app/layout';
import { useApiEventHandler } from '../entities/api-event';
import { useChatMessageHandler } from '../entities/chat-message';
import { useSoundEffectHandler } from '../entities/sound-effect';
import { selectUserName, useStatusChangeHandler } from '../entities/user';
import { useVisualEffectHandler } from '../entities/visual-effect';
import { BreakpointSwitcher, useIsMobile } from '../shared';
import { useGetUserActivityQuery } from '../shared/api';
import { useAppSelector } from '../store';
import { Navbar } from '../widgets/navbar';

const ChatMobile = lazy(() => import('./chat-mobile'));
const ChatDesktop = lazy(() => import('./chat-desktop'));

export const Component: FC = () => {
  const dispatch = useDispatch();
  const { chatName } = useParams();

  const isMobile = useIsMobile();
  const currentChatId = useAppSelector(selectCurrentChatId);
  const userName = useAppSelector(selectUserName);

  const isMobileConversation = isMobile && currentChatId;

  const { data: chatsData } = useGetUserActivityQuery({ username: userName });

  useEffect(() => {
    dispatch(chatsSlice.actions.setCurrent(chatName));
  }, [chatName, dispatch]);

  useEffect(() => {
    chatsData?.lastMessages?.forEach((lastMessage) => {
      dispatch(
        chatsSlice.actions.addChat({
          id: lastMessage.chatId,
          members: lastMessage.members,
        })
      );

      dispatch(
        chatsSlice.actions.addMessage({
          chatId: lastMessage.chatId,
          message: {
            id: lastMessage.id,
            text: lastMessage.message,
            from: lastMessage.sender,
            timestamp: lastMessage.timestamp,
          },
        })
      );
    });
  }, [chatsData]);

  useApiEventHandler();
  useGroupCreateHandler();
  useChatMessageHandler();
  useVisualEffectHandler();
  useStatusChangeHandler();
  useSoundEffectHandler();

  return (
    <Layout>
      <div className="overflow-hidden flex-1 flex-grow">
        <BreakpointSwitcher
          xs={
            <Suspense>
              <ChatMobile />
            </Suspense>
          }
          md={
            <Suspense>
              <ChatDesktop />
            </Suspense>
          }
        />
      </div>

      {!isMobileConversation && <Navbar />}
    </Layout>
  );
};
