import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSelectFromSelf, createSelectSelf } from '../../shared';

export interface UserSettingsState {
  alwaysShowLogoAnimation: boolean;
  notificationSoundEnabled: boolean;
}

const initialState: UserSettingsState = {
  alwaysShowLogoAnimation: false,
  notificationSoundEnabled: true,
};

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<UserSettingsState>) => {
      const { alwaysShowLogoAnimation, notificationSoundEnabled } =
        action.payload;

      state.alwaysShowLogoAnimation = alwaysShowLogoAnimation;
      state.notificationSoundEnabled = notificationSoundEnabled;
    },
  },
});

const selectFromSelf = createSelectFromSelf(userSettingsSlice);

export const selectUserSettings = createSelectSelf(userSettingsSlice);

export const selectAlwaysShowLogoAnimation = selectFromSelf(
  (state) => state.alwaysShowLogoAnimation
);
export const selectNotificationSoundEnabled = selectFromSelf(
  (state) => state.notificationSoundEnabled
);
