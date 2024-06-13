import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  selectUserSettings,
  userSettingsSlice,
} from '../entities/user-settings';
import { useAppDispatch, useAppSelector } from '../store';

interface UserSettingsInput {
  alwaysShowLogoAnimation: boolean;
  notificationSoundEnabled: boolean;
  animeModeEnabled: boolean;
}

export const UserSettingsForm: FC = () => {
  const dispatch = useAppDispatch();

  const userSettings = useAppSelector(selectUserSettings);

  const { control, watch } = useForm<UserSettingsInput>({
    defaultValues: {
      ...userSettings,
    },
  });

  const form: UserSettingsInput = watch();

  useEffect(() => {
    dispatch(
      userSettingsSlice.actions.setState({
        ...form,
      })
    );
  }, [form]);

  return (
    <form className="flex flex-col gap-2 w-full">
      <Controller
        name="alwaysShowLogoAnimation"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text text-lg">
                Показывать анимацию при входе
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={onChange}
                className="toggle toggle-primary toggle-md"
              />
            </label>
          </div>
        )}
      />
      <Controller
        name="notificationSoundEnabled"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text text-lg">
                Включить звук уведомлений
              </span>
              <input
                className="toggle toggle-primary toggle-md"
                type="checkbox"
                checked={value}
                onChange={onChange}
              />
            </label>
          </div>
        )}
      />

      <Controller
        name="animeModeEnabled"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text text-lg">Включить режим аниме</span>
              <input
                className="toggle toggle-primary toggle-md"
                type="checkbox"
                checked={value}
                onChange={onChange}
              />
            </label>
          </div>
        )}
      />
    </form>
  );
};
