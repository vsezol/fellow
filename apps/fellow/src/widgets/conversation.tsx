import { ChatMessage } from '../entity/chats';
import MessageInput from './message-input';
import MessagesList from './messages-list';

export interface ConversationProps {
  currentUserName: string;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const Conversation = ({
  currentUserName,
  messages,
  onSendMessage,
}: ConversationProps) => {
  return (
    <div className="flex flex-col h-full gap-5 overflow-hidden bg-base-200 rounded-lg">
      <div className="flex-grow flex-1 overflow-scroll px-8 pt-6">
        <MessagesList currentUserName={currentUserName} messages={messages} />
      </div>

      <div className="flex-initial px-8 pb-6">
        <MessageInput onSend={onSendMessage} />
      </div>
    </div>
  );
};
