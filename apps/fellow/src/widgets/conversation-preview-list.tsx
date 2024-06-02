import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  chatsSlice,
  selectChats,
  selectCurrentChatName,
} from '../entities/chat';
import { selectUserName } from '../entities/user';
import { useAppSelector } from '../store';
import { AddChatInput } from './add-chat-input';
import { ConversationPreview } from './conversation-preview';

export const ConversationPreviewList = () => {
  const dispatch = useDispatch();

  const currentUserName = useAppSelector(selectUserName);
  const currentChatName = useAppSelector(selectCurrentChatName);

  const chats = useAppSelector(selectChats);

  const navigate = useNavigate();

  const selectChat = (chatName: string) => {
    navigate(`/chat/${chatName}`);
    dispatch(chatsSlice.actions.setCurrent(chatName));
  };

  const deleteChat = (chatName: string) => {
    navigate(`/chat`);
    dispatch(chatsSlice.actions.deleteChat(chatName));
  };

  useEffect(() => {
    if (!currentChatName) {
      return;
    }

    dispatch(chatsSlice.actions.setCurrent(currentChatName));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <AddChatInput />
      <div className="flex flex-col overflow-y-auto flex-1 gap-2 pr-2">
        {chats.map((chat) => (
          <ConversationPreview
            key={chat.name}
            chatName={chat.name}
            currentUserName={currentUserName}
            message={chat.lastMessage}
            selected={currentChatName === chat.name}
            onClick={() => selectChat(chat.name)}
            onDelete={() => deleteChat(chat.name)}
          ></ConversationPreview>
        ))}
      </div>
    </div>
  );
};
