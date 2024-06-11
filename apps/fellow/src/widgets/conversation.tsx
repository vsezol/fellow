import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  chatsSlice,
  selectCurrentChatName,
  selectCurrentMessages,
} from '../entities/chat';
import {
  dispatchOutgoingChatMessage,
  useGetHistoryQuery,
} from '../entities/chat-message';
import { incomingChatMessageToAddMessagePayload } from '../entities/chat-message/model/mappers';
import { selectUserName, useGetUserQuery } from '../entities/user';
import { Button, getDeclensionByNumber } from '../shared';
import { useAppDispatch, useAppSelector } from '../store';
import MessageInput from './message-input';
import MessagesList from './messages-list';

export const Conversation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserName = useAppSelector(selectUserName);
  const currentChatName = useAppSelector(selectCurrentChatName);
  const messages = useAppSelector(selectCurrentMessages) ?? [];

  const { data, isSuccess, isLoading } = useGetUserQuery(
    currentChatName ?? '',
    { skip: !currentChatName }
  );

  const { data: history, isSuccess: isHistorySuccess } = useGetHistoryQuery(
    currentChatName ?? '',
    {
      skip: !currentChatName,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (!isHistorySuccess || !history) {
      return;
    }

    history
      ?.map((x) =>
        incomingChatMessageToAddMessagePayload(x, currentChatName ?? '')
      )
      .forEach((x) => dispatch(chatsSlice.actions.addMessage(x)));
  }, [isHistorySuccess, history]);

  const getStatus = () => {
    if (isSuccess && !isLoading && data?.status) {
      return data.status;
    }

    return '';
  };

  const messagesText = getDeclensionByNumber(messages.length, [
    'сообщение',
    'сообщения',
    'сообщений',
  ]);

  // const [messageBox, setMessageBox] = useState<HTMLDivElement | null>(null);
  // const onMessageBoxRefChange = useCallback((box: HTMLDivElement | null) => {
  //   setMessageBox(box);
  // }, []);

  const goBack = () => navigate('/chat');

  const sendMessage = (text: string) => {
    if (!currentChatName || !currentUserName || !text) {
      return;
    }

    dispatchOutgoingChatMessage({
      to: currentChatName,
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
          {currentChatName && (
            <>
              <div className="text-lg font-semibold">
                {currentChatName}{' '}
                <span className="text-secondary">{getStatus()}</span>
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
