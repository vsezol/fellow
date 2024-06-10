import { useLayoutEffect, useState } from 'react';
import { selectCurrentChatName } from '../entities/chat';
import {
  ResizableTwoPanels,
  ResizableTwoPanelsInitial,
  ResizableTwoPanelsMin,
  ResizableTwoPanelsOnChange,
  debounce,
} from '../shared';
import { useAppSelector } from '../store';
import { Conversation } from '../widgets/conversation';
import { ConversationPlaceholder } from '../widgets/conversation-placeholder';
import { ConversationPreviewList } from '../widgets/conversation-preview-list';

const DEFAULT_WIDTH = 256;
const MIN_WIDTH: ResizableTwoPanelsMin = [256, 400];

export default function ChatDesktop() {
  const currentChatName = useAppSelector(selectCurrentChatName);

  const [initial, setInitial] = useState<ResizableTwoPanelsInitial>([
    DEFAULT_WIDTH,
  ]);

  useLayoutEffect(() => {
    try {
      const data = localStorage.getItem('ChatDesktopPanels');
      const widths = JSON.parse(data ?? '[]');
      setInitial(widths);
    } catch {
      console.log(`[ChatDesktop] cannot get initial size`);
    }
  }, []);

  const onResize = debounce<ResizableTwoPanelsOnChange>(
    (width: [number, number]) => {
      localStorage.setItem('ChatDesktopPanels', JSON.stringify(width));
    },
    300
  );

  return (
    <div className="h-full">
      <ResizableTwoPanels
        left={<ConversationPreviewList />}
        right={
          <div className="bg-base-200 rounded-lg h-full w-full">
            {currentChatName ? <Conversation /> : <ConversationPlaceholder />}
          </div>
        }
        initial={initial}
        min={MIN_WIDTH}
        onChange={onResize}
      />
    </div>
  );
}
