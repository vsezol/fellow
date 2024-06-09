import { FC, Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { chatsSlice, selectCurrentChatName } from '../entities/chat';

import Layout from '../app/layout';
import { useApiEventHandler } from '../entities/api-event';
import { useChatMessageHandler } from '../entities/chat-message';
import { useSoundEffectHandler } from '../entities/sound-effect';
import { useStatusChangeHandler } from '../entities/user';
import { useVisualEffectHandler } from '../entities/visual-effect';
import { BreakpointSwitcher, useIsMobile } from '../shared';
import { useAppSelector } from '../store';
import { Navbar } from '../widgets/navbar';

const ChatMobile = lazy(() => import('./chat-mobile'));
const ChatDesktop = lazy(() => import('./chat-desktop'));

export const Component: FC = () => {
  const dispatch = useDispatch();
  const { chatName } = useParams();

  const isMobile = useIsMobile();
  const currentChatName = useAppSelector(selectCurrentChatName);

  const isMobileConversation = isMobile && currentChatName;

  useEffect(() => {
    dispatch(chatsSlice.actions.setCurrent(chatName));
  }, [chatName, dispatch]);

  useApiEventHandler();
  useChatMessageHandler();
  useVisualEffectHandler();
  // useChatMessageHistory();
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
