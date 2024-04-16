import { FC, Suspense, lazy } from 'react';
import { BreakpointSwitcher } from '../shared';
import { ChatMessagesApiProvider } from '../widgets/chat-messages-provider';

const ChatMobile = lazy(() => import('./chat-mobile'));
const ChatDesktop = lazy(() => import('./chat-desktop'));

export const Component: FC = () => {
  return (
    <ChatMessagesApiProvider>
      <BreakpointSwitcher
        xs={
          <Suspense>
            <ChatMobile />
          </Suspense>
        }
        lg={
          <Suspense>
            <ChatDesktop />
          </Suspense>
        }
      />
    </ChatMessagesApiProvider>
  );
};
