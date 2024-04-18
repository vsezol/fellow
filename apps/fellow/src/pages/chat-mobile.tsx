import { selectCurrentChatName } from '../entity/chats';
import { SlideTransition, SlideTransitionDirection } from '../shared';
import { useAppSelector } from '../store';
import { Conversation } from '../widgets/conversation';
import { ConversationPreviewList } from '../widgets/conversation-preview-list';

export default function ChatMobile() {
  const currentChatName = useAppSelector(selectCurrentChatName);

  const direction: SlideTransitionDirection = currentChatName
    ? 'left'
    : 'right';

  return (
    <div className="flex flex-column gap-4 justify-center h-full overflow-hidden relative">
      <SlideTransition visible={!currentChatName} direction={direction}>
        <div className="p-3 h-full w-full">
          <ConversationPreviewList />
        </div>
      </SlideTransition>

      <SlideTransition visible={Boolean(currentChatName)} direction={direction}>
        <div className="bg-base-200 rounded-lg h-full w-full">
          <Conversation />
        </div>
      </SlideTransition>
    </div>
  );
}
