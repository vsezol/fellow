import { useEffect } from 'react';
import { handleIncomingChatMessage } from '../../chat-message';
import { heartEffectHandler, penisEffectHandler } from './handlers';

export const useVisualEffectHandler = () =>
  useEffect(
    () =>
      handleIncomingChatMessage((data) => {
        penisEffectHandler(data);
        heartEffectHandler(data);
      }),
    []
  );
