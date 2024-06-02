import { FC, Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { chatsSlice } from '../entities/chat';
import { ChatMessagesApiProvider } from '../entities/chat-message';
import { BreakpointSwitcher } from '../shared';

const ChatMobile = lazy(() => import('./chat-mobile'));
const ChatDesktop = lazy(() => import('./chat-desktop'));

export const Component: FC = () => {
  const dispatch = useDispatch();
  const { chatName } = useParams();

  useEffect(() => {
    dispatch(chatsSlice.actions.setCurrent(chatName));
  }, [chatName, dispatch]);

  return (
    <ChatMessagesApiProvider>
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
    </ChatMessagesApiProvider>
  );
};
