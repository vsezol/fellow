import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { chatsSlice, selectChats, selectCurrentChatId } from '../entities/chat';
import { selectUserName } from '../entities/user';
import { useAppSelector } from '../store';
import { AddChatInput } from './add-chat-input';
import { ConversationPreview } from './conversation-preview';

export const ConversationPreviewList = () => {
  const dispatch = useDispatch();

  const currentUserName = useAppSelector(selectUserName);
  const currentChatId = useAppSelector(selectCurrentChatId);

  const chats = useAppSelector(selectChats);

  const navigate = useNavigate();

  const selectChat = (chatId: string) => {
    navigate(`/chat/${chatId}`);
    dispatch(chatsSlice.actions.setCurrent(chatId));
  };

  const deleteChat = (chatId: string) => {
    navigate(`/chat`);
    dispatch(chatsSlice.actions.deleteChat(chatId));
  };

  useEffect(() => {
    if (!currentChatId) {
      return;
    }

    dispatch(chatsSlice.actions.setCurrent(currentChatId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-2">
      <AddChatInput />

      <div className="flex flex-col overflow-y-auto flex-1 gap-2 pr-2">
        {chats.map((chat) => (
          <ConversationPreview
            key={chat.id}
            chatMembers={chat.members}
            currentUserName={currentUserName}
            message={chat.lastMessage}
            selected={currentChatId === chat.id}
            onClick={() => selectChat(chat.id)}
            onDelete={() => deleteChat(chat.id)}
          ></ConversationPreview>
        ))}
      </div>
    </div>
  );
};
