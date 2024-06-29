import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createSelectFromSelf, createSelectSelf } from '../../shared/lib';

export interface UserSettingsState {
  alwaysShowLogoAnimation: boolean;
  notificationSoundEnabled: boolean;
  animeModeEnabled: boolean;
}

const initialState: UserSettingsState = {
  alwaysShowLogoAnimation: false,
  notificationSoundEnabled: true,
  animeModeEnabled: false,
};

export const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<UserSettingsState>) => {
      const {
        alwaysShowLogoAnimation,
        notificationSoundEnabled,
        animeModeEnabled,
      } = action.payload;

      state.alwaysShowLogoAnimation = alwaysShowLogoAnimation;
      state.notificationSoundEnabled = notificationSoundEnabled;
      state.animeModeEnabled = animeModeEnabled;
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
export const selectAnimeModeEnabled = selectFromSelf(
  (state) => state.animeModeEnabled
);
