import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { SyntheticEvent } from 'react';
import { ChatMessage } from '../entities/chat';
import { useGetUserQuery } from '../entities/user';
import { Avatar, Button } from '../shared';

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

  const { data, isSuccess, isLoading } = useGetUserQuery(chatName ?? '', {
    skip: !chatName,
  });

  const getStatus = () => {
    if (isSuccess && !isLoading && data?.status) {
      return data.status;
    }

    return '';
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-full p-2 rounded-lg cursor-pointer transition-all duration-75 border-2 relative bg-base-200',
        selected
          ? 'border-primary'
          : 'border-transparent hover:border-primary hover:border-opacity-50'
      )}
    >
      <div className="flex flex-row gap-3 py-1">
        <div>
          <Avatar name={chatName} size="md" />
        </div>

        <div className="flex flex-col overflow-hidden justify-around">
          <h2 className="text-lg font-semibold">{chatName}</h2>
          <p className="text-ellipsis truncate">{messagePreview}</p>
        </div>
      </div>

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
