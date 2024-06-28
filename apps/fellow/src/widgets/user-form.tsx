import { FC, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  selectUserName,
  updateCachedUserStatus,
  userSlice,
} from '../entities/user';

import { useNavigate } from 'react-router-dom';
import { useChangeStatusMutation, useGetUserQuery } from '../shared/api';
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
  const navigate = useNavigate();

  const [editStatus] = useChangeStatusMutation();

  const { data: userData, isSuccess } = useGetUserQuery(
    { username: name },
    {
      skip: !name,
      refetchOnMountOrArgChange: true,
    }
  );

  const { setUserName } = userSlice.actions;

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
    editStatus({
      changeStatusRequest: { username: name, status: status ?? '' },
    });
    dispatch(setUserName(name));
    dispatch(updateCachedUserStatus(name, status));
    navigate('/chat');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex items-center justify-center">
        <Avatar name={userNameDraft} size="lg" />
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
