import { ChatMessage } from '../entity/chats';
import { Message } from '../shared';

export interface MessagesListProps {
  messages: ChatMessage[];
  currentUserName: string;
}

export default function MessagesList({
  messages,
  currentUserName,
}: MessagesListProps) {
  return (
    <>
      {messages.map(({ text, from }, index) => (
        <Message
          key={index}
          side={from === currentUserName ? 'right' : 'left'}
          text={text}
        />
      ))}
    </>
  );
}
