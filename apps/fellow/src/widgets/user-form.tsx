import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  selectUserName,
  updateCachedUserStatus,
  useEditStatusMutation,
  useGetUserQuery,
  userSlice,
} from '../entities/user';

import { Button, InputText } from '../shared/ui';
import { useAppDispatch, useAppSelector } from '../store';

interface UserInput {
  name: string;
  status: string;
}

export const UserForm: FC = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectUserName);

  const [editStatus] = useEditStatusMutation();
  const { data: userData, isSuccess } = useGetUserQuery(name, {
    skip: !name,
    refetchOnMountOrArgChange: true,
  });

  const { setUser } = userSlice.actions;

  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm<UserInput>({
    defaultValues: {
      name,
    },
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    setValue('status', userData.status);
  }, [userData, setValue, isSuccess]);

  const onSubmit: SubmitHandler<UserInput> = ({ name, status }) => {
    editStatus({ username: name, status });
    dispatch(setUser({ name }));
    dispatch(updateCachedUserStatus(name, status));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 15,
        }}
        render={({ field }) => (
          <InputText {...field} placeholder="Введите ваш ник" />
        )}
      />

      <Controller
        name="status"
        control={control}
        rules={{
          maxLength: 15,
        }}
        render={({ field }) => (
          <InputText {...field} placeholder="Введите ваш стаус" />
        )}
      />

      <Button size="md" color="primary" type="submit" disabled={!isValid}>
        Готово
      </Button>
    </form>
  );
};
