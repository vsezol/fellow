import { useMemo } from 'react';
import { ChatMessage } from '../entities/chat';
import { Message, MessageSide, toLocalTimeZone } from '../shared';

export interface MessagesListProps {
  messages: ChatMessage[];
  currentUserName: string;
  isGroup: boolean;
}

interface UIChatMessage {
  id: string;
  author: string;
  showAuthor: boolean;
  showAvatar: boolean;
  withAvatarPlaceholder: boolean;
  directional: boolean;
  side: MessageSide;
  text: string;
  date: Date;
}

export default function MessagesList({
  messages,
  currentUserName,
  isGroup,
}: MessagesListProps) {
  const items: UIChatMessage[] = useMemo(
    () => toUIChatMessages(messages, currentUserName, isGroup),
    [messages, currentUserName, isGroup]
  );

  return (
    <>
      {items.map((x) => (
        <Message
          key={x.id}
          author={x.author}
          withAuthor={x.showAuthor}
          withAvatarPlaceholder={x.withAvatarPlaceholder}
          avatar={x.showAvatar}
          directional={x.directional}
          side={x.side}
          text={x.text}
          date={x.date}
        />
      ))}
    </>
  );
}

function toUIChatMessages(
  messages: ChatMessage[],
  currentUserName: string,
  isGroup: boolean
): UIChatMessage[] {
  let lastAuthor: string | undefined = undefined;

  return messages.map(({ id, text, from, timestamp }, index) => {
    const nextAuthor: string | undefined = messages?.[index + 1]?.from;
    const showAuthor =
      isGroup && currentUserName !== from && nextAuthor !== from;
    const showAvatar = lastAuthor !== from && currentUserName !== from;
    const withAvatarPlaceholder = currentUserName !== from;
    const directional = lastAuthor !== from;

    lastAuthor = from;

    return {
      id,
      author: from,
      showAuthor,
      showAvatar,
      withAvatarPlaceholder,
      directional,
      side: from === currentUserName ? 'right' : 'left',
      text,
      date: toLocalTimeZone(new Date(timestamp)),
    };
  });
}
