import { ChatMessage } from '../entities/chat';
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
      {messages.map(({ text, from, timestamp }, index) => (
        <Message
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
