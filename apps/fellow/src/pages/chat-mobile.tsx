import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition';
import { selectCurrentChatName } from '../entity/chats';
import { useAppSelector } from '../store';
import { Conversation } from '../widgets/conversation';
import { ConversationPreviewList } from '../widgets/conversation-preview-list';

const slideLeftClasses: CSSTransitionClassNames = {
  enter: 'absolute translate-x-full',
  enterActive: 'absolute transition-all duration-300 translate-x-0',
  enterDone: 'absolute',
  exit: 'absolute transition-all duration-300 translate-x-0',
  exitActive: 'absolute -translate-x-full',
};

const slideRightClasses: CSSTransitionClassNames = {
  enter: 'absolute -translate-x-full',
  enterActive: 'absolute transition-all duration-300 -translate-x-0',
  exit: 'absolute transition-all duration-300 translate-x-full',
};

export default function ChatMobile() {
  const currentChatName = useAppSelector(selectCurrentChatName);
  const conversationPreviewRef = useRef(null);
  const conversationRef = useRef(null);

  const transitionClasses = currentChatName
    ? slideLeftClasses
    : slideRightClasses;

  return (
    <div className="flex flex-column gap-4 justify-center h-full overflow-hidden relative">
      <CSSTransition
        in={!currentChatName}
        nodeRef={conversationPreviewRef}
        timeout={300}
        unmountOnExit
        classNames={transitionClasses}
      >
        <div className="p-3 h-full w-full" ref={conversationPreviewRef}>
          <ConversationPreviewList />
        </div>
      </CSSTransition>

      <CSSTransition
        in={Boolean(currentChatName)}
        nodeRef={conversationRef}
        timeout={300}
        unmountOnExit
        classNames={transitionClasses}
      >
        <div
          ref={conversationRef}
          className="bg-base-200 rounded-lg h-full w-full"
        >
          <Conversation />
        </div>
      </CSSTransition>
    </div>
  );
}
