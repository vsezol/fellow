import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useAppSelector } from '../../../store';
import { selectUserName } from '../../user';
import { dispatchIncomingEvent, handleOutgoingEvent } from '../model/service';
import { isIncomingApiEvent } from './is-incoming-api-event';

const API_URL = import.meta.env.VITE_WEB_SOCKET_API_URL;

export const useApiEventHandler = () => {
  const userName = useAppSelector(selectUserName);

  const { sendJsonMessage } = useWebSocket(
    `${API_URL}/chat?userId=${userName}`,
    {
      onMessage: (event) => {
        try {
          const data = JSON.parse(event.data);

          if (!isIncomingApiEvent(data)) {
            return;
          }

          dispatchIncomingEvent(data);
        } catch {
          console.error(
            '[useApiEventHandler] Error while parsing message event'
          );
        }
      },
    }
  );

  useEffect(
    () => handleOutgoingEvent((event) => sendJsonMessage(event)),
    [sendJsonMessage]
  );
};
