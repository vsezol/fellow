import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { chatsSlice } from '../entity/chats';
import { selectUserName } from '../entity/user';
import { useWebSocket } from '../shared';
import { useAppSelector } from '../store';
import MessageInput from '../widgets/message-input';
import MessagesList from '../widgets/messages-list';

interface Message {
  from: string;
  to: string;
  text: string;
}

export const Component = () => {
  const dispatch = useDispatch();
  const { chat } = useParams();
  const userName = useAppSelector(selectUserName);

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
    if (!chat) {
      return;
    }

    dispatch(chatsSlice.actions.setCurrent(chat));
  }, []);

  const sendMessage = (text: string) => {
    if (!chat || !userName || !text) {
      return;
    }

    dispatch(
      chatsSlice.actions.addMessage({
        chat,
        message: {
          from: userName,
          text,
        },
      })
    );

    const message: Message = {
      from: userName,
      to: chat,
      text,
    };

    send(JSON.stringify(message));
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <div className="flex-grow">
        <MessagesList />
      </div>
      <div>
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};
