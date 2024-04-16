import { selectCurrentChatName, selectCurrentMessages } from '../entity/chats';
import { selectUserName } from '../entity/user';
import { getDeclensionByNumber } from '../shared';
import { useAppSelector } from '../store';
import { useSendChatMessageApi } from './chat-messages-provider';
import MessageInput from './message-input';
import MessagesList from './messages-list';

export const Conversation = () => {
  const currentUserName = useAppSelector(selectUserName);
  const currentChatName = useAppSelector(selectCurrentChatName);
  const messages = useAppSelector(selectCurrentMessages) ?? [];
  const sendChatMessage = useSendChatMessageApi();

  const messagesText = getDeclensionByNumber(messages.length, [
    'сообщение',
    'сообщения',
    'сообщений',
  ]);

  const sendMessage = (text: string) => {
    if (!currentChatName || !currentUserName || !text) {
      return;
    }

    sendChatMessage({
      from: currentUserName,
      to: currentChatName,
      text,
    });
  };

  return (
    <div className="flex flex-col h-full gap-4 overflow-hidden rounded-lg">
      <div className="flex-initial bg-base-300 w-full pl-6 py-4">
        <div className="text-lg font-semibold">{currentChatName}</div>
        <div className="text-sm font-light">
          {messages.length} {messagesText}
        </div>
      </div>

      <div className="flex-grow flex-1 overflow-scroll px-8">
        <MessagesList currentUserName={currentUserName} messages={messages} />
      </div>

      <div className="flex-initial px-8 pb-6">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};
