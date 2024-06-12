import { ChatMessage } from '../entities/chat';
import { Message } from '../shared';

export interface MessagesListProps {
  messages: ChatMessage[];
  currentUserName: string;
  isGroup: boolean;
}

export default function MessagesList({
  messages,
  currentUserName,
  isGroup,
}: MessagesListProps) {
  return (
    <>
      {messages.map(({ text, from, timestamp }, index) => (
        <Message
          withAuthor={isGroup && currentUserName !== from}
          avatar={true}
          author={from}
          key={index}
          side={from === currentUserName ? 'right' : 'left'}
          text={text}
          date={new Date(timestamp)}
        />
      ))}
    </>
  );
}
