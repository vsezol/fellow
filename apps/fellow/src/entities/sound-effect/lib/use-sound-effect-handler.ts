import { useEffect } from 'react';
import notificationAnimeAudioSrc from '../../../assets/notification-anime.mp3';
import notificationAudioSrc from '../../../assets/notification.mp3';
import { useAppSelector } from '../../../store';
import { handleIncomingChatMessage } from '../../chat-message';
import { selectUserName } from '../../user';
import {
  selectAnimeModeEnabled,
  selectNotificationSoundEnabled,
} from '../../user-settings';

export const useSoundEffectHandler = () => {
  const userName = useAppSelector(selectUserName);
  const isSoundEnabled = useAppSelector(selectNotificationSoundEnabled);
  const animeMode = useAppSelector(selectAnimeModeEnabled);

  useEffect(() => {
    const notificationAudio = animeMode
      ? new Audio(notificationAnimeAudioSrc)
      : new Audio(notificationAudioSrc);

    return handleIncomingChatMessage((data) => {
      if (data.from === userName || !isSoundEnabled) {
        return;
      }

      notificationAudio.play();
    });
  }, []);
};
