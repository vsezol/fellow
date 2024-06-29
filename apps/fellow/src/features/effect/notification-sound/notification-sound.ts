import { useEffect } from 'react';
import { selectUserName } from '../../../entities/user';
import {
  selectAnimeModeEnabled,
  selectNotificationSoundEnabled,
} from '../../../entities/user-settings';
import {
  handleIncomingEvent,
  isIncomingChatMessageEvent,
} from '../../../shared/api/ws';
import { useAppSelector } from '../../../store';
import { notificationAnimeAudioSrc } from './notification-anime.mp3';
import { notificationAudioSrc } from './notification-sound.mp3';

export const useNotificationSoundHandler = () => {
  const userName = useAppSelector(selectUserName);
  const isSoundEnabled = useAppSelector(selectNotificationSoundEnabled);
  const animeMode = useAppSelector(selectAnimeModeEnabled);

  useEffect(() => {
    return handleIncomingEvent((event) => {
      if (!isIncomingChatMessageEvent(event)) {
        return;
      }

      const notificationAudio = animeMode
        ? new Audio(notificationAnimeAudioSrc)
        : new Audio(notificationAudioSrc);

      return handleIncomingEvent((data) => {
        if (!isIncomingChatMessageEvent(data)) {
          return;
        }

        if (data.data.from === userName || !isSoundEnabled) {
          return;
        }

        notificationAudio.play();
      });
    });
  }, []);
};
