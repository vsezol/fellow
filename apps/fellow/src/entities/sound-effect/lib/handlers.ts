import { IncomingChatMessage } from '../../chat-message';

export const notificationEffectHandler = (
  { message }: IncomingChatMessage,
  audio: HTMLAudioElement
) => {
  if (!message.includes(':penis:')) {
    return;
  }

  audio.play();
};
