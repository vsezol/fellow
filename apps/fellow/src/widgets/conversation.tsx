import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import {
  ChatMessage,
  selectCurrentChat,
  selectCurrentChatId,
} from '../entities/chat';
import {
  chatMessageResponseToChatMessage,
  dispatchOutgoingChatMessage,
  handleIncomingChatMessage,
} from '../entities/chat-message';
import { selectUserName } from '../entities/user';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import {
  Button,
  getChatName,
  getDeclensionByNumber,
  useIsVisible,
} from '../shared';
import { fellowApi } from '../shared/api';
import { useAppDispatch, useAppSelector } from '../store';
import MessageInput from './message-input';
import MessagesList from './messages-list';

const PAGE_SIZE = 50;

export const Conversation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserName = useAppSelector(selectUserName);
  const currentChat = useAppSelector(selectCurrentChat);
  const currentChatId = useAppSelector(selectCurrentChatId);
  const animeMode = useAppSelector(selectAnimeModeEnabled);

  const [pageNumber, setPageNumber] = useState(0);
  const [total, setTotal] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const listEndRef = useRef<HTMLDivElement>(null);
  const isListEndVisible = useIsVisible(listEndRef);

  useEffect(() => {
    return handleIncomingChatMessage((data) => {
      setMessages((prev) => [
        {
          id: data.id,
          from: data.from,
          text: data.message,
          timestamp: data.timestamp,
        },
        ...prev,
      ]);
    });
  }, []);

  const getHistory = async (groupId: string, pageNumber: number) => {
    const data = await dispatch(
      fellowApi.endpoints.getHistory.initiate({
        groupId,
        pageNumber,
        pageSize: PAGE_SIZE,
      })
    );

    return data;
  };

  const loadInitial = () => {
    getHistory(currentChat?.id ?? '', 0).then((data) => {
      const newMessages =
        data?.data?.page?.map(chatMessageResponseToChatMessage) ?? [];

      setTotal(data.data?.total ?? 0);
      setMessages(newMessages);
    });
  };

  const loadMore = () => {
    getHistory(currentChat?.id ?? '', pageNumber + 1).then((data) => {
      const newMessages =
        data?.data?.page?.map(chatMessageResponseToChatMessage) ?? [];

      setPageNumber(pageNumber + 1);
      setTotal(data?.data?.total ?? 0);
      setMessages([...messages, ...newMessages]);
    });
  };

  const cleanUp = () => {
    setTotal(0);
    setPageNumber(0);
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') =>
    listEndRef.current?.scrollIntoView({
      behavior,
      block: 'end',
    });

  useEffect(() => {
    cleanUp();
    loadInitial();
  }, [currentChatId]);

  useEffect(() => cleanUp, []);

  const chatName = useMemo(
    () => getChatName(currentChat?.members ?? [], currentUserName),
    [currentChat?.members, currentUserName]
  );

  const isGroup = (currentChat?.members?.length ?? 0) > 2;

  const messagesText = getDeclensionByNumber(total ?? 0, [
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
                {total} {messagesText}
              </div>
            </>
          )}
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="flex-grow flex-1 overflow-hidden relative flex flex-col">
        <div
          className="h-full w-full overflow-y-auto md:px-4 px-2"
          id="scrollableDiv"
          style={{
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column-reverse',
            margin: 'auto',
          }}
        >
          <div ref={listEndRef}></div>
          <InfiniteScroll
            dataLength={messages.length}
            next={loadMore}
            hasMore={(pageNumber + 1) * PAGE_SIZE < total}
            loader={<p className="text-center">Пинаю бекендера...</p>}
            endMessage={<p className="text-center">Начало чата</p>}
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              overflow: 'visible',
            }}
            scrollableTarget="scrollableDiv"
            inverse={true}
          >
            <MessagesList
              isGroup={isGroup}
              currentUserName={currentUserName}
              messages={messages}
            />
          </InfiniteScroll>
        </div>

        <div
          className={clsx(
            'absolute right-5 z-10 bottom-1',
            isListEndVisible && 'hidden'
          )}
        >
          <Button size="sm" color="primary" onClick={() => scrollToBottom()}>
            <FontAwesomeIcon size="sm" icon="chevron-down"></FontAwesomeIcon>
          </Button>
        </div>
      </div>

      <div className="flex-initial px-4 pb-4">
        <MessageInput onSend={sendMessage} animeMode={animeMode} />
      </div>
    </div>
  );
};
