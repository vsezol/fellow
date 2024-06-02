import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { selectCurrentChatName, selectCurrentMessages } from '../entities/chat';
import { useSendChatMessage } from '../entities/chat-message';
import { selectUserName } from '../entities/user';
import { Button, getDeclensionByNumber } from '../shared';
import { useAppSelector } from '../store';
import MessageInput from './message-input';
import MessagesList from './messages-list';

export const Conversation = () => {
  const navigate = useNavigate();
  const currentUserName = useAppSelector(selectUserName);
  const currentChatName = useAppSelector(selectCurrentChatName);
  const messages = useAppSelector(selectCurrentMessages) ?? [];
  const sendChatMessage = useSendChatMessage();

  const messagesText = getDeclensionByNumber(messages.length, [
    'сообщение',
    'сообщения',
    'сообщений',
  ]);

  const goBack = () => navigate('/chat');

  const sendMessage = (text: string) => {
    if (!currentChatName || !currentUserName || !text) {
      return;
    }

    sendChatMessage({
      to: currentChatName,
      message: text,
    });
  };

  return (
    <div className="flex flex-col h-full w-full gap-4 overflow-hidden rounded-lg">
      <div className="flex-initial flex flex-row justify-between bg-base-300 w-full p-2">
        <div className="flex-1 text-primary">
          <div className="md:hidden">
            <Button size="md" onClick={goBack}>
              <FontAwesomeIcon size="lg" icon="chevron-left" />
              Назад
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          {currentChatName && (
            <>
              <div className="text-lg font-semibold">{currentChatName}</div>
              <div className="text-sm font-light">
                {messages.length} {messagesText}
              </div>
            </>
          )}
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="flex-grow flex-1 overflow-y-auto px-8">
        <MessagesList currentUserName={currentUserName} messages={messages} />
      </div>

      <div className="flex-initial px-4 pb-4">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};
