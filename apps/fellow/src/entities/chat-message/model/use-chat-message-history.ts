import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store';
import { chatsSlice, selectCurrentChatId } from '../../chat/model/store';
import { useGetHistoryQuery } from '../api/chat-message-api';
import { incomingChatMessageToAddMessagePayload } from './mappers';

export const useChatMessageHistory = () => {
  const currentChatId = useAppSelector(selectCurrentChatId);
  const dispatch = useDispatch();

  const { isSuccess, data } = useGetHistoryQuery(currentChatId ?? 0, {
    refetchOnMountOrArgChange: true,
    skip: !currentChatId,
  });

  useEffect(() => {
    if (!isSuccess || !data) {
      return;
    }

    data
      .map((x) => incomingChatMessageToAddMessagePayload(x))
      .forEach((x) => dispatch(chatsSlice.actions.addMessage(x)));
  }, [isSuccess, data]);
};
