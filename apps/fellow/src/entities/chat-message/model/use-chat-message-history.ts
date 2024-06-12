import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store';
import { chatsSlice } from '../../chat/model/store';
import { selectUserName } from '../../user';
import { useGetHistoryQuery } from '../api/chat-message-api';
import { incomingChatMessageToAddMessagePayload } from './mappers';

export const useChatMessageHistory = () => {
  const userName = useAppSelector(selectUserName);
  const dispatch = useDispatch();

  const { isSuccess, data } = useGetHistoryQuery(userName, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    data
      .map((x) => incomingChatMessageToAddMessagePayload(x))
      .forEach((x) => dispatch(chatsSlice.actions.addMessage(x)));
  }, [isSuccess, data]);
};
