import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { dispatchIncomingEvent, isIncomingEvent } from './incoming-event';
import { handleOutgoingEvent } from './outgoing-event';

const API_URL = import.meta.env.VITE_WEB_SOCKET_API_URL;

export const useWebSocketEventHandler = (userId: string) => {
  const { sendJsonMessage } = useWebSocket(`${API_URL}/chat?userId=${userId}`, {
    onMessage: (event) => {
      try {
        const data = JSON.parse(event.data);

        if (!isIncomingEvent(data)) {
          return;
        }

        dispatchIncomingEvent(data);
      } catch {
        console.error('[useApiEventHandler] Error while parsing message event');
      }
    },
  });

  useEffect(
    () => handleOutgoingEvent((event) => sendJsonMessage(event)),
    [sendJsonMessage]
  );
};
