import { playHeartEffect, playPenisEffect } from '../../../shared';
import { IncomingChatMessage } from '../../chat-message';

export const penisEffectHandler = ({ message }: IncomingChatMessage) => {
  if (!message.includes(':penis:')) {
    return;
  }

  setTimeout(playPenisEffect, 300);
};

export const heartEffectHandler = ({ message }: IncomingChatMessage) => {
  if (!message.includes(':heart:')) {
    return;
  }

  setTimeout(playHeartEffect, 300);
};
