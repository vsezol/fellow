import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store';
import { chatsSlice } from '../../chat/model/store';
import { selectUserName } from '../../user';
import { incomingChatMessageToAddMessagePayload } from './mappers';
import { handleIncomingChatMessage } from './service';

export const useChatMessageHandler = () => {
  const dispatch = useDispatch();

  const userName = useAppSelector(selectUserName);

  useEffect(() => {
    const { addMessage } = chatsSlice.actions;

    return handleIncomingChatMessage((data) => {
      const payload = incomingChatMessageToAddMessagePayload(data, userName);

      dispatch(addMessage(payload));
    });
  }, []);
};
