import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { chatsSlice } from '../entities/chat';
import { selectUserName } from '../entities/user';
import { Button, InputText } from '../shared';
import { useCreateGroupMutation } from '../shared/api';
import { useAppSelector } from '../store';

export interface AddPersonalChatModalProps {
  onAdd?: () => void;
  onCancel?: () => void;
  onFinal?: () => void;
}

interface AddPersonalChatForm {
  chatName: string;
}

export const AddPersonalChatModal = (props: AddPersonalChatModalProps) => {
  const dispatch = useDispatch();
  const userName = useAppSelector(selectUserName);

  const [createChat] = useCreateGroupMutation();

  const { addChat } = chatsSlice.actions;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AddPersonalChatForm>({
    defaultValues: {
      chatName: '',
    },
  });

  const onCancel = () => {
    reset();
    props?.onCancel?.();
    props?.onFinal?.();
  };

  const onSubmit: SubmitHandler<AddPersonalChatForm> = async ({ chatName }) => {
    if (!isValid) {
      return;
    }

    try {
      const members = [userName, chatName];

      const data = await createChat({
        createGroupRequest: {
          members,
        },
      }).unwrap();

      dispatch(
        addChat({
          id: data.id,
          members,
        })
      );

      props?.onAdd?.();
      props?.onFinal?.();
    } catch {
      console.error('[AddPersonalChatModal] Error while chat creating');
    }
  };

  return (
    <div className="modal-box w-11/12 max-w-xl">
      <h3 className="font-bold text-lg mb-2">Создать чат</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-2 w-full"
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
              placeholder="Имя кореша"
            />
          )}
        />
      </form>

      <div className="modal-action">
        <form method="dialog" className="flex flex-row gap-2">
          <Button color="neutral" onClick={onCancel}>
            Отмена
          </Button>
          <Button color="primary" type="submit" disabled={!isValid}>
            Создать
          </Button>
        </form>
      </div>
    </div>
  );
};
