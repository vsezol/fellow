import clsx from 'clsx';
import { FC } from 'react';
import { Avatar } from './avatar';

export type MessageSide = 'left' | 'right';

export interface MessageProps {
  side: MessageSide;
  text: string;
  author?: string;
  date?: Date;
  avatar?: string | boolean;
  withAvatar?: boolean;
  withAuthor?: boolean;
  directional?: boolean;
  withAvatarPlaceholder?: boolean;
}

export const Message: FC<MessageProps> = ({
  side,
  author,
  date,
  text,
  avatar,
  withAuthor = false,
  directional = true,
  withAvatarPlaceholder = false,
}) => {
  const sideClass = side === 'left' ? 'chat-start' : 'chat-end';
  const timeString = date?.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className={clsx('chat', sideClass)}>
      <div className="chat-image avatar">
        {avatar ? (
          <Avatar
            src={typeof avatar === 'string' ? avatar : undefined}
            name={author}
            size="sm"
          ></Avatar>
        ) : (
          withAvatarPlaceholder && <div className="w-10" />
        )}
      </div>

      <div
        className={clsx(
          'chat-bubble',
          'bg-base-300',
          'text-base-content',
          !directional && 'before:hidden'
        )}
      >
        {withAuthor && <div className="text-primary">{author}</div>}

        <div className="break-words whitespace-pre-wrap">{text}</div>

        {timeString && (
          <time className="opacity-50 text-xs text-end pt-1">{timeString}</time>
        )}
      </div>
    </div>
  );
};
