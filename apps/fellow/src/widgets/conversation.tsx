import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { Button, getDeclensionByNumber } from '../shared';
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
  const chatName = useMemo(() => {
    if ((currentChat?.members?.length ?? 0) > 2) {
      return currentChat?.members?.join(', ');
    }

    if (currentChat?.members?.every((x) => x === currentUserName)) {
      return 'Сохраненные сообщения';
    }

    return currentChat?.members?.filter((x) => x !== currentUserName)[0];
  }, [currentChat?.members, currentUserName]);

  // const { data, isSuccess, isLoading } = useGetUserQuery(
  //   currentChatName ?? '',
  //   { skip: !currentChatName }
  // );

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
    <div className="flex flex-col h-full w-full gap-4 overflow-hidden rounded-lg">
      <div className="flex-initial flex flex-row justify-between bg-base-300 w-full p-2">
        <div className="text-primary flex flex-row flex-1">
          <div className="md:hidden">
            <Button size="md" onClick={goBack}>
              <FontAwesomeIcon size="lg" icon="chevron-left" />
              Назад
            </Button>
          </div>

          {/* <PoopingMan target={messageBox} /> */}
        </div>

        <div className="flex-1 flex flex-col items-center">
          {currentChat && (
            <>
              <div className="text-lg font-semibold">
                {chatName}
                {/* <span className="text-secondary">{getStatus()}</span> */}
              </div>

              <div className="text-sm font-light">
                {messages.length} {messagesText}
              </div>
            </>
          )}
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="flex-grow flex-1 overflow-y-auto px-8">
        <MessagesList currentUserName={currentUserName} messages={messages} />
      </div>

      <div className="flex-initial px-4 pb-4">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};
