import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { userSlice } from '../entities/user';
import { Button, InputText } from '../shared/ui';
import { useAppSelector } from '../store';

interface UserInput {
  name: string;
}

export const UserForm: FC = () => {
  const dispatch = useDispatch();
  const name = useAppSelector((state) => state.user.name);

  const { setUser } = userSlice.actions;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<UserInput>({
    defaultValues: {
      name,
    },
  });

  const onSubmit: SubmitHandler<UserInput> = ({ name }) =>
    dispatch(setUser({ name }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex sm:flex-row flex-col sm:gap-2 gap-4 w-full"
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

      <Button size="md" color="primary" type="submit" disabled={!isValid}>
        Готово
      </Button>
    </form>
  );
};
