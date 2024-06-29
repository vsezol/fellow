import { selectUserName } from 'apps/fellow/src/entities/user';
import {
  selectAnimeModeEnabled,
  selectNotificationSoundEnabled,
} from 'apps/fellow/src/entities/user-settings';
import { useEffect } from 'react';
import { useAppSelector } from '../../../store';
import { handleIncomingChatMessage } from '../../chat/handle-incoming-chat-message';

export const useNotificationSoundHandler = () => {
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
