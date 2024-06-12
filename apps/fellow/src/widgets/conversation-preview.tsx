import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { SyntheticEvent, useMemo, useRef } from 'react';
import { ChatMessage } from '../entities/chat';
import { Avatar, Button } from '../shared';
import { useGetUserQuery } from '../shared/api';

export interface ConversationPreviewProps {
  currentUserName: string;
  chatMembers: string[];
  message: ChatMessage | undefined;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

export const ConversationPreview = ({
  chatMembers,
  currentUserName,
  message,
  selected = false,
  onClick,
  onDelete,
}: ConversationPreviewProps) => {
  const menuButtonRef = useRef<HTMLDivElement>(null);

  const fromPreview = message?.from === currentUserName ? 'Вы' : message?.from;

  const messagePreview = message
    ? `${fromPreview}: ${message.text}`
    : 'Пока нет сообщений...';

  const handleOpenMenu = (event: SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();
    menuButtonRef?.current?.focus();
  };

  const handleDelete = (event: SyntheticEvent) => {
    event.stopPropagation();
    onDelete?.();
  };

  const isPersonal = (chatMembers?.length ?? 0) <= 2;

  const receiverName = useMemo(() => {
    if (!isPersonal) {
      return undefined;
    }

    if (chatMembers?.every((x) => x === currentUserName)) {
      return currentUserName;
    }

    return chatMembers?.filter((x) => x !== currentUserName)[0];
  }, [isPersonal, chatMembers]);

  const { data: receiver } = useGetUserQuery(
    { username: receiverName ?? '' },
    { skip: !receiverName }
  );

  const chatName = useMemo(() => {
    if ((chatMembers?.length ?? 0) > 2) {
      return chatMembers?.join(', ');
    }

    if (chatMembers?.every((x) => x === currentUserName)) {
      return currentUserName;
    }

    return chatMembers?.filter((x) => x !== currentUserName)[0];
  }, [chatMembers, currentUserName]);

  const status = receiver?.status ?? '';

  return (
    <div
      onClick={onClick}
      onContextMenu={handleOpenMenu}
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
          <h2 className="text-lg font-semibold text-ellipsis truncate">
            {chatName}
            {isPersonal && (
              <span className="pl-1 text-secondary">{status}</span>
            )}
          </h2>

          <p className="text-ellipsis truncate">{messagePreview}</p>
        </div>
      </div>

      <div className="dropdown dropdown-end absolute right-0 top-0 mt-2 mr-2">
        <div
          className="opacity-0"
          tabIndex={0}
          role="button"
          ref={menuButtonRef}
        >
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
