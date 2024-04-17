import { selectCurrentChatName } from '../entity/chats';
import { useAppSelector } from '../store';
import { Conversation } from '../widgets/conversation';
import { ConversationPreviewList } from '../widgets/conversation-preview-list';

export default function ChatMobile() {
  const currentChatName = useAppSelector(selectCurrentChatName);

  return (
    <div className="flex flex-column gap-4 justify-center h-full ">
      {!currentChatName ? (
        <div className="p-3 w-full">
          <ConversationPreviewList />
        </div>
      ) : (
        <div className="bg-base-200 rounded-lg w-full">
          <Conversation />
        </div>
      )}
    </div>
  );
}
