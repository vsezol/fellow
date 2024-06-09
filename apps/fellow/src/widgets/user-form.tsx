import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  selectUserName,
  updateCachedUserStatus,
  useEditStatusMutation,
  useGetUserQuery,
  userSlice,
} from '../entities/user';

import { Avatar, Button, InputText } from '../shared/ui';
import { useAppDispatch, useAppSelector } from '../store';

interface UserInput {
  name: string;
  status: string;
}

export const UserForm: FC = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectUserName);
  const [userNameDraft, setUserNameDraft] = useState(name);

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
    getValues,
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
      <div className="flex items-center justify-center">
        <Avatar name={userNameDraft} size="lg" active={true} />
      </div>

      <Controller
        name="name"
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 15,
        }}
        render={({ field }) => (
          <InputText
            {...field}
            onChange={(event) => {
              setUserNameDraft(getValues('name'));
              field.onChange(event);
            }}
            placeholder="Введите ваш ник"
          />
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
