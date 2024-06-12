import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { chatsSlice } from '../entities/chat';
import { selectUserName } from '../entities/user';
import { Button, InputText, Modal, ModalControls } from '../shared';
import { useCreateGroupMutation } from '../shared/api/generated-api';
import { useAppSelector } from '../store';

interface AddChatInputForm {
  chatName: string;
}

export const AddChatInput = () => {
  const dispatch = useDispatch();
  const userName = useAppSelector(selectUserName);
  const modalControlsRef = useRef<ModalControls>(null);

  const [createChat] = useCreateGroupMutation();

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

  const openModal = () => {
    modalControlsRef?.current?.open?.();
  };

  const closeModal = () => {
    reset();
    modalControlsRef?.current?.close?.();
  };

  const onSubmit: SubmitHandler<AddChatInputForm> = async ({ chatName }) => {
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

      closeModal();
    } catch {
      console.error('[AddChatInput] Error while chat creating');
    }
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="flex flex-row mr-2">
          <Button size="sm" color="primary" fullWidth>
            <FontAwesomeIcon size="sm" icon="plus" />
            Создать
          </Button>
        </div>

        <ul
          tabIndex={0}
          className={clsx(
            'dropdown-content z-10 menu p-2 mt-2 shadow bg-base-100 rounded-lg w-50 border-primary'
          )}
        >
          <li onClick={openModal}>
            <Button size="md" type="submit">
              <div className="w-full flex flex-row gap-2">
                <FontAwesomeIcon size="sm" icon="user-group" />
                Чат
              </div>
            </Button>
          </li>
          <li onClick={openModal}>
            <Button size="md" type="submit" disabled>
              <div className="w-full flex flex-row gap-2">
                <FontAwesomeIcon size="sm" icon="people-group" />
                Группа
              </div>
            </Button>
          </li>
        </ul>
      </div>

      <Modal ref={modalControlsRef}>
        <div className="modal-box w-11/12 max-w-xl">
          <h3 className="font-bold text-lg mb-2">Создать чат</h3>

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
                  placeholder="Имя кореша"
                />
              )}
            />
          </form>

          <div className="modal-action">
            <form method="dialog" className="flex flex-row gap-2">
              <Button color="neutral" onClick={closeModal}>
                Отмена
              </Button>
              <Button color="primary" type="submit" disabled={!isValid}>
                Добавить
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
