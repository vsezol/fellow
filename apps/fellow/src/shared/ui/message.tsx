import clsx from 'clsx';
import { FC } from 'react';

export interface MessageProps {
  side: 'left' | 'right';
  text: string;
  author?: string;
  date?: Date;
  avatar?: string;
}

export const Message: FC<MessageProps> = ({
  side,
  author,
  date,
  text,
  avatar,
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
          <div className="w-10 rounded-full">
            <img alt="Avatar" src={avatar} />
          </div>
        </div>
      )}
      {author && <div className="chat-header flex-row">{author}</div>}
      <div className="chat-bubble">{text}</div>
      {timeString && (
        <div className="chat-footer opacity-50 text-xs">{timeString}</div>
      )}
    </div>
  );
};
