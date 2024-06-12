import clsx from 'clsx';
import { FC } from 'react';
import { Avatar } from './avatar';

export interface MessageProps {
  side: 'left' | 'right';
  text: string;
  author?: string;
  date?: Date;
  avatar?: string | boolean;
  withAuthor?: boolean;
}

export const Message: FC<MessageProps> = ({
  side,
  author,
  date,
  text,
  avatar,
  withAuthor = false,
}) => {
  const sideClass = side === 'left' ? 'chat-start' : 'chat-end';
  const timeString = date?.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className={clsx('chat', sideClass)}>
      {avatar && (
        <div className="chat-image avatar">
          <Avatar
            src={typeof avatar === 'string' ? avatar : undefined}
            name={author}
            size="sm"
          ></Avatar>
        </div>
      )}

      <div className={clsx('chat-bubble', 'bg-base-300', 'text-base-content')}>
        {withAuthor && <div className="text-primary">{author}</div>}

        <div className="break-words whitespace-pre-wrap">{text}</div>

        {timeString && (
          <time className="opacity-50 text-xs text-end pt-1">{timeString}</time>
        )}
      </div>
    </div>
  );
};
