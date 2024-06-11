import { selectCurrentChatId } from '../entities/chat';
import { AppearAnimation } from '../shared/ui/appear-animation';
import { useAppSelector } from '../store';
import { Conversation } from '../widgets/conversation';
import { ConversationPreviewList } from '../widgets/conversation-preview-list';

export default function ChatMobile() {
  const currentChatId = useAppSelector(selectCurrentChatId);

  return (
    <div className="flex flex-column gap-4 justify-center h-full overflow-hidden relative">
      {!currentChatId && (
        <AppearAnimation>
          <div className="p-2 pb-0 h-full w-full">
            <ConversationPreviewList />
          </div>
        </AppearAnimation>
      )}

      {currentChatId && (
        <AppearAnimation>
          <div className="bg-base-200 rounded-lg h-full w-full">
            <Conversation />
          </div>
        </AppearAnimation>
      )}
    </div>
  );
}
