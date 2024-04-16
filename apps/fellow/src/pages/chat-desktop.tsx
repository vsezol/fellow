import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { chatsSlice, selectChats } from '../entity/chats';
import { selectUserName } from '../entity/user';
import { useAppSelector } from '../store';
import { AddChatInput } from '../widgets/add-chat-input';
import { Conversation } from '../widgets/conversation';
import { ConversationPreview } from '../widgets/conversation-preview';

export default function ChatDesktop() {
  const dispatch = useDispatch();

  const currentUserName = useAppSelector(selectUserName);
  const { chatName: currentChatName } = useParams();

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
  }, []);

  return (
    <div className="flex flex-row gap-4 justify-center h-full">
      <div className="flex flex-col h-full gap-2 w-60 flex-none">
        <AddChatInput />
        <div className="flex flex-col flex-1 gap-2 overflow-y-scroll pr-4">
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

      <div className="flex-grow bg-base-200 rounded-lg">
        {currentChatName ? (
          <Conversation />
        ) : (
          <p className="flex flex-row h-full justify-center items-center opacity-70">
            Выберите чат, и начните общаться!
          </p>
        )}
      </div>
    </div>
  );
}
