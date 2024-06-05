import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store';
import { handleIncomingChatMessage } from '../../chat-message/model/service';
import { selectUserName } from '../../user';
import { chatsSlice } from '../model/store';

export const useChatMessageHandler = () => {
  const dispatch = useDispatch();

  const userName = useAppSelector(selectUserName);

  useEffect(() => {
    const { addMessage } = chatsSlice.actions;

    return handleIncomingChatMessage((data) => {
      dispatch(
        addMessage({
          chat: userName === data.from ? data.to : data.from,
          message: {
            id: data.id,
            from: data.from,
            text: data.message,
            timestamp: data.timestamp,
          },
        })
      );
    });
  }, []);
};
