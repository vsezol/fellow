import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  chatsSlice,
  selectChats,
  selectCurrentMessages,
} from '../entity/chats';
import { selectUserName } from '../entity/user';
import { useWebSocket } from '../shared';
import { useAppSelector } from '../store';
import { AddChatInput } from '../widgets/add-chat-input';
import { Conversation } from '../widgets/conversation';
import { ConversationPreview } from '../widgets/conversation-preview';

interface Message {
  from: string;
  to: string;
  text: string;
}

export const Component = () => {
  const dispatch = useDispatch();
  const { chatName } = useParams();
  const userName = useAppSelector(selectUserName);
  const currentMessages = useAppSelector(selectCurrentMessages);
  const chats = useAppSelector(selectChats);
  const hasSelectedChat = typeof chatName === 'string';
  const [selectedChat, setSelectedChat] = useState<string>();
  const navigate = useNavigate();

  const selectChat = (chatName: string) => {
    navigate(`/chat/${chatName}`);
    setSelectedChat(chatName);
    dispatch(chatsSlice.actions.setCurrent(chatName));
  };

  const deleteChat = (chatName: string) => {
    navigate(`/chat`);
    setSelectedChat(undefined);
    dispatch(chatsSlice.actions.deleteChat(chatName));
  };

  const send = useWebSocket({
    url: 'ws://localhost:5001',
    message: (event) => {
      const message: Message = JSON.parse(event.data);

      dispatch(
        chatsSlice.actions.addMessage({
          chat: message.from,
          message: {
            from: message.from,
            text: message.text,
          },
        })
      );
    },
  });

  useEffect(() => {
    if (!chatName) {
      return;
    }

    dispatch(chatsSlice.actions.setCurrent(chatName));
  }, []);

  const sendMessage = (text: string) => {
    if (!chatName || !userName || !text) {
      return;
    }

    dispatch(
      chatsSlice.actions.addMessage({
        chat: chatName,
        message: {
          from: userName,
          text,
        },
      })
    );

    const message: Message = {
      from: userName,
      to: chatName,
      text,
    };

    send(JSON.stringify(message));
  };

  return (
    <div className="flex flex-row gap-4 justify-center h-full">
      <div className="flex flex-col h-full gap-2 w-60 flex-none">
        <AddChatInput />
        <div className="flex flex-col flex-1 gap-2 overflow-y-scroll pr-4">
          {chats.map((chat) => (
            <ConversationPreview
              key={chat.name}
              chatName={chat.name}
              currentUserName={userName}
              message={chat.lastMessage}
              selected={selectedChat === chat.name}
              onClick={() => selectChat(chat.name)}
              onDelete={() => deleteChat(chat.name)}
            ></ConversationPreview>
          ))}
        </div>
      </div>

      <div className="flex-grow">
        {hasSelectedChat ? (
          <Conversation
            currentUserName={userName}
            messages={currentMessages ?? []}
            onSendMessage={sendMessage}
          />
        ) : (
          <p className="flex flex-row h-full justify-center items-center opacity-70">
            Выберите чат, и начните общаться!
          </p>
        )}
      </div>
    </div>
  );
};
