import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { chatsSlice, useCreateChatMutation } from '../entities/chat';
import { selectUserName } from '../entities/user';
import { Button, InputText } from '../shared';
import { useAppSelector } from '../store';

interface AddChatInputForm {
  chatName: string;
}

export const AddChatInput = () => {
  const dispatch = useDispatch();
  const userName = useAppSelector(selectUserName);

  const [createChat] = useCreateChatMutation();

  const { addChat } = chatsSlice.actions;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AddChatInputForm>({
    defaultValues: {
      chatName: '',
    },
  });

  const onSubmit: SubmitHandler<AddChatInputForm> = async ({ chatName }) => {
    try {
      const members = [userName, chatName];

      const data = await createChat({
        members,
      }).unwrap();

      dispatch(
        addChat({
          id: data.id,
          members,
        })
      );

      reset();
    } catch {
      console.error('[AddChatInput] Error while chat creating');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row gap-2 w-full p-1"
    >
      <Controller
        name="chatName"
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 15,
        }}
        render={({ field }) => (
          <InputText
            {...field}
            size="sm"
            color="neutral"
            placeholder="Добавить новый чат"
          />
        )}
      />

      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button">
          <Button size="sm" color="primary" disabled={!isValid}>
            <FontAwesomeIcon size="sm" icon="plus" />
          </Button>
        </div>

        <ul
          className={clsx(
            'dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-lg w-50',
            !isValid && 'hidden'
          )}
        >
          <li>
            <Button size="sm" type="submit">
              <div className="w-full flex flex-row gap-2">
                <FontAwesomeIcon size="sm" icon="user-group" />
                Чат
              </div>
            </Button>
          </li>
          <li>
            <Button size="sm" type="submit" disabled={true}>
              <div className="w-full flex flex-row gap-2">
                <FontAwesomeIcon size="sm" icon="people-group" />
                Группа
              </div>
            </Button>
          </li>
        </ul>
      </div>
    </form>
  );
};
