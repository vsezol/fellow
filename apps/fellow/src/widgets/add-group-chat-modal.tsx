import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { chatsSlice } from '../entities/chat';
import { selectUserName } from '../entities/user';
import { Button, InputText } from '../shared';
import { useCreateGroupMutation } from '../shared/api';
import { useAppDispatch, useAppSelector } from '../store';

export interface AddGroupChatModalProps {
  onAdd?: () => void;
  onCancel?: () => void;
  onFinal?: () => void;
}

interface AddGroupChatForm {
  userName: string;
}

export const AddGroupChatModal = (props: AddGroupChatModalProps) => {
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectUserName);

  const [userList, setUserList] = useState<string[]>([]);

  const [createChat] = useCreateGroupMutation();

  const { addChat } = chatsSlice.actions;

  const isListValid = userList.length > 1;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AddGroupChatForm>({
    defaultValues: {
      userName: '',
    },
  });

  const onCancel = () => {
    reset();
    props?.onCancel?.();
    props?.onFinal?.();
  };

  const onSubmit: SubmitHandler<AddGroupChatForm> = ({ userName }) => {
    if (!isValid) {
      return;
    }

    setUserList((prev) => [...new Set([...prev, userName.trim()])]);
    reset();
  };

  const onCreate = async () => {
    if (!isListValid) {
      return;
    }

    try {
      const members = [userName, ...userList];

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
      console.error('[AddGroupChatModal] Error while chat creating');
    }
  };

  return (
    <div className="modal-box w-11/12 max-w-xl">
      <h3 className="font-bold text-lg mb-2">Создать группу</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-row gap-2 w-full"
      >
        <Controller
          name="userName"
          control={control}
          rules={{
            required: true,
            minLength: 3,
            maxLength: 15,
            validate: (value) => value.trim() !== userName,
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

        <Button size="sm" color="primary" type="submit" disabled={!isValid}>
          <FontAwesomeIcon size="sm" icon="plus" />
        </Button>
      </form>

      <div className="flex flex-row gap-2 pt-3 flex-wrap">
        {userList.map((name) => (
          <div className="badge badge-primary badge-lg" key={name}>
            {name}
          </div>
        ))}
      </div>

      <div className="modal-action">
        <form method="dialog" className="flex flex-row gap-2">
          <Button color="neutral" onClick={onCancel}>
            Отмена
          </Button>
          <Button
            color="primary"
            disabled={userList.length <= 1}
            onClick={onCreate}
          >
            Создать
          </Button>
        </form>
      </div>
    </div>
  );
};
