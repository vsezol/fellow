import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  selectUserName,
  selectUserStatus,
  useEditStatusMutation,
  userSlice,
} from '../entities/user';
import { Button, InputText } from '../shared/ui';
import { useAppSelector } from '../store';

interface UserInput {
  name: string;
  status: string;
}

export const UserForm: FC = () => {
  const dispatch = useDispatch();
  const name = useAppSelector(selectUserName);
  const status = useAppSelector(selectUserStatus);

  const [editStatus] = useEditStatusMutation();

  const { setUser } = userSlice.actions;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserInput>({
    defaultValues: {
      name,
      status,
    },
  });

  const onSubmit: SubmitHandler<UserInput> = ({ name, status }) => {
    editStatus({ username: name, status });
    dispatch(setUser({ name, status }));
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
