import { selectCurrentChatName } from '../entity/chats';
import { useAppSelector } from '../store';
import { Conversation } from '../widgets/conversation';
import { ConversationPlaceholder } from '../widgets/conversation-placeholder';
import { ConversationPreviewList } from '../widgets/conversation-preview-list';

export default function ChatDesktop() {
  const currentChatName = useAppSelector(selectCurrentChatName);

  return (
    <div className="flex flex-row gap-4 justify-center h-full">
      <div className="flex-none">
        <ConversationPreviewList />
      </div>

      <div className="flex-grow bg-base-200 rounded-lg">
        {currentChatName ? <Conversation /> : <ConversationPlaceholder />}
      </div>
    </div>
  );
}
