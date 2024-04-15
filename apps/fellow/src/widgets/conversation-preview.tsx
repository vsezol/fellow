import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { SyntheticEvent } from 'react';
import { ChatMessage } from '../entity/chats';
import { Button } from '../shared';

export interface ConversationPreviewProps {
  currentUserName: string;
  chatName: string;
  message: ChatMessage | undefined;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

export const ConversationPreview = ({
  chatName,
  currentUserName,
  message,
  selected = false,
  onClick,
  onDelete,
}: ConversationPreviewProps) => {
  const fromPreview = message?.from === currentUserName ? 'Вы' : message?.from;

  const messagePreview = message
    ? `${fromPreview}: ${message.text}`
    : 'Пока нет сообщений...';

  const handleOpenMenu = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const handleDelete = (event: SyntheticEvent) => {
    event.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-full p-3 rounded-lg cursor-pointer transition-all duration-75 border-2 relative',
        selected
          ? 'border-primary bg-base-200'
          : 'bg-neutral border-transparent hover:border-primary hover:border-opacity-50'
      )}
    >
      <h2 className="text-lg font-semibold">{chatName}</h2>
      <p className="text-ellipsis truncate">{messagePreview}</p>

      <div className="dropdown dropdown-end absolute right-0 top-0 mt-2 mr-2">
        <div tabIndex={0} role="button" onClick={handleOpenMenu}>
          <Button size="sm">
            <FontAwesomeIcon size="sm" icon="ellipsis-vertical" />
          </Button>
        </div>

        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-lg w-50">
          <li className="text-error">
            <Button size="sm" onClick={handleDelete}>
              <FontAwesomeIcon size="sm" icon="trash-can" />
              Удалить
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};
