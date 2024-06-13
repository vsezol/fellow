import clsx from 'clsx';
import { selectCurrentChatId } from '../entities/chat';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import { useAppSelector } from '../store';
import { Conversation } from '../widgets/conversation';
import { ConversationPreviewList } from '../widgets/conversation-preview-list';

export default function ChatMobile() {
  const currentChatId = useAppSelector(selectCurrentChatId);
  const animeMode = useAppSelector(selectAnimeModeEnabled);

  return (
    <div className="flex flex-column gap-4 justify-center h-full overflow-hidden relative">
      {!currentChatId && (
        <div className="p-2 pb-0 h-full w-full">
          <ConversationPreviewList />
        </div>
      )}

      {currentChatId && (
        <div
          className={clsx(
            'bg-base-200 h-full w-full',
            animeMode && 'bg-opacity-50'
          )}
        >
          <Conversation />
        </div>
      )}
    </div>
  );
}
