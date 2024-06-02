import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { chatsSlice } from '../entities/chat';
import { Button, InputText } from '../shared';

interface AddChatInputForm {
  chatName: string;
}

export const AddChatInput = () => {
  const dispatch = useDispatch();

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

  const onSubmit: SubmitHandler<AddChatInputForm> = ({ chatName }) => {
    dispatch(addChat(chatName));
    reset();
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

      <Button size="sm" color="primary" type="submit" disabled={!isValid}>
        <FontAwesomeIcon size="sm" icon="plus" />
      </Button>
    </form>
  );
};
