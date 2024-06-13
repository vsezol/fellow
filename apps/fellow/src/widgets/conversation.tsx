import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  chatsSlice,
  selectCurrentChat,
  selectCurrentMessages,
} from '../entities/chat';
import { dispatchOutgoingChatMessage } from '../entities/chat-message';
import { incomingChatMessageToAddMessagePayload } from '../entities/chat-message/model/mappers';
import { selectUserName } from '../entities/user';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import { Button, getChatName, getDeclensionByNumber } from '../shared';
import { useGetHistoryQuery } from '../shared/api';
import { useAppDispatch, useAppSelector } from '../store';
import MessageInput from './message-input';
import MessagesList from './messages-list';

export const Conversation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserName = useAppSelector(selectUserName);
  const currentChat = useAppSelector(selectCurrentChat);
  const messages = useAppSelector(selectCurrentMessages) ?? [];
  const animeMode = useAppSelector(selectAnimeModeEnabled);

  const chatName = useMemo(
    () => getChatName(currentChat?.members ?? [], currentUserName),
    [currentChat?.members, currentUserName]
  );

  const isGroup = (currentChat?.members?.length ?? 0) > 2;

  const { data: history, isSuccess: isHistorySuccess } = useGetHistoryQuery(
    {
      groupId: currentChat?.id ?? '',
      pageNumber: 0,
      pageSize: 100,
    },
    {
      skip: !currentChat?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (!isHistorySuccess || !history) {
      return;
    }

    history.page
      .map((x) => incomingChatMessageToAddMessagePayload(x))
      .forEach((x) => dispatch(chatsSlice.actions.addMessage(x)));
  }, [isHistorySuccess, history]);

  const messagesText = getDeclensionByNumber(messages.length, [
    'сообщение',
    'сообщения',
    'сообщений',
  ]);

  const goBack = () => navigate('/chat');

  const sendMessage = (text: string) => {
    if (!currentChat?.id || !text) {
      return;
    }

    dispatchOutgoingChatMessage({
      to: currentChat?.id,
      message: text,
    });
  };

  return (
    <div className="flex flex-col h-full w-full gap-4 overflow-hidden md:rounded-lg">
      <div
        className={clsx(
          'flex-initial flex flex-row justify-between bg-base-300 w-full p-2',
          animeMode && 'bg-opacity-50'
        )}
      >
        <div className="text-primary flex flex-row flex-1">
          <div className="md:hidden">
            <Button size="md" onClick={goBack}>
              <FontAwesomeIcon size="lg" icon="chevron-left" />
              Назад
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          {currentChat && (
            <>
              <div className="text-lg font-semibold truncate text-ellipsis max-w-xs overflow-hidden">
                {chatName}
              </div>

              <div className="text-sm font-light">
                {messages.length} {messagesText}
              </div>
            </>
          )}
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="flex-grow flex-1 overflow-y-auto md:px-4 px-2">
        <MessagesList
          isGroup={isGroup}
          currentUserName={currentUserName}
          messages={messages}
        />
      </div>

      <div className="flex-initial px-4 pb-4">
        <MessageInput onSend={sendMessage} animeMode={animeMode} />
      </div>
    </div>
  );
};
