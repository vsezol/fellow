import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { chatsSlice } from '../../chat/model/store';
import { incomingChatMessageToAddMessagePayload } from './mappers';
import { handleIncomingChatMessage } from './service';

export const useChatMessageHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { addMessage } = chatsSlice.actions;

    return handleIncomingChatMessage((data) => {
      const payload = incomingChatMessageToAddMessagePayload(data);

      dispatch(addMessage(payload));
    });
  }, []);
};
