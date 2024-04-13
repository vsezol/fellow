import { useEffect, useRef, useState } from 'react';
import { WebSocketClient, WebSocketClientOptions } from './web-socket-client';

export const useWebSocket = (
  options: WebSocketClientOptions
): ((message: string) => void) => {
  const wsClient = useRef<WebSocketClient>();
  const [isOpen, setIsOpen] = useState(false);
  const [sendQueue, setSendQueue] = useState<string[]>([]);

  useEffect(() => {
    const client = new WebSocketClient({
      ...options,
      open: (event) => {
        setIsOpen(true);
        options.open?.(event);
      },
      close: (event) => {
        setIsOpen(false);
        options.close?.(event);
      },
    });

    wsClient.current = client;

    client.connect();

    return () => {
      client.destroy();
      wsClient.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!isOpen || sendQueue.length === 0) {
      return;
    }

    sendQueue.forEach((m) => wsClient.current?.send(m));
    setSendQueue([]);
  }, [isOpen, sendQueue]);

  return (message) => setSendQueue([...sendQueue, message]);
};
