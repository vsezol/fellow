import MessageInput from '../widgets/message-input';
import MessagesList from '../widgets/messages-list';

export const Component = () => {
  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <div className="flex-grow">
        <MessagesList />
      </div>
      <div>
        <MessageInput />
      </div>
    </div>
  );
};
