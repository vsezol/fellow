import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRef } from 'react';
import { Button, Modal, ModalControls } from '../shared';
import { AddGroupChatModal } from './add-group-chat-modal';
import { AddPersonalChatModal } from './add-personal-chat-modal';

export const AddChatButton = () => {
  const addPersonalChatModalRef = useRef<ModalControls>(null);
  const addGroupChatModalRef = useRef<ModalControls>(null);

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
          <li onClick={addPersonalChatModalRef?.current?.open}>
            <Button size="md" type="submit">
              <div className="w-full flex flex-row gap-2">
                <FontAwesomeIcon size="sm" icon="user-group" />
                Чат
              </div>
            </Button>
          </li>
          <li onClick={addGroupChatModalRef?.current?.open}>
            <Button size="md" type="submit">
              <div className="w-full flex flex-row gap-2">
                <FontAwesomeIcon size="sm" icon="people-group" />
                Группа
              </div>
            </Button>
          </li>
        </ul>
      </div>

      <Modal ref={addPersonalChatModalRef}>
        <AddPersonalChatModal
          onFinal={addPersonalChatModalRef?.current?.close}
        />
      </Modal>

      <Modal ref={addGroupChatModalRef}>
        <AddGroupChatModal onFinal={addGroupChatModalRef?.current?.close} />
      </Modal>
    </>
  );
};
