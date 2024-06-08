import { useEffect } from 'react';
import notificationAudioSrc from '../../../assets/notification-sound.mp3';
import { useAppSelector } from '../../../store';
import { handleIncomingChatMessage } from '../../chat-message';
import { selectUserName } from '../../user';

export const useSoundEffectHandler = () => {
  const userName = useAppSelector(selectUserName);

  useEffect(() => {
    const notificationAudio = new Audio(notificationAudioSrc);

    return handleIncomingChatMessage((data) => {
      if (data.from === userName) {
        return;
      }

      notificationAudio.play();
    });
  }, []);
};
