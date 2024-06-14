import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useRef } from 'react';
import QRCode from 'react-qr-code';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../app/layout';
import { chatsSlice } from '../entities/chat';
import { selectUserName } from '../entities/user';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import {
  Avatar,
  Button,
  Modal,
  ModalControls,
  useCreateGroupMutation,
  useGetUserQuery,
} from '../shared';
import { useAppDispatch, useAppSelector } from '../store';
import { Navbar } from '../widgets/navbar';

export const Component = () => {
  const { userName } = useParams();
  const { data: user } = useGetUserQuery(
    { username: userName ?? '' },
    { skip: !userName }
  );
  const currentUserName = useAppSelector(selectUserName);
  const animeMode = useAppSelector(selectAnimeModeEnabled);
  const dispatch = useAppDispatch();
  const [createGroupMutation] = useCreateGroupMutation();
  const navigate = useNavigate();
  const qrCodeModalRef = useRef<ModalControls>(null);

  const onOpenQrCode = () => {
    qrCodeModalRef?.current?.open();
  };

  const onCreateChat = async () => {
    if (!userName || !currentUserName) {
      return;
    }

    const members = [userName, currentUserName];

    try {
      const data = await createGroupMutation({
        createGroupRequest: {
          members,
        },
      }).unwrap();

      dispatch(
        chatsSlice.actions.addChat({
          id: data.id,
          members,
        })
      );

      navigate(`/chat/${data.id}`);
    } catch {
      console.error('[UserPage] Error while chat creating');
    }
  };

  return (
    <>
      <Layout>
        <div className="overflow-hidden flex-1 flex-grow">
          <div className="flex flex-col h-full mx-auto md:p-4 gap-12 md:max-w-4xl">
            <div
              className={clsx(
                'bg-base-200 rounded w-full',
                animeMode && 'bg-opacity-50'
              )}
            >
              <div
                className={clsx(
                  'w-full p-4 bg-primary/60 relative h-40 rounded'
                )}
              >
                <div className="absolute top-full md:left-4 md:translate-x-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row gap-4">
                  <div className="rounded-full border-2 border-primary border-opacity-60">
                    <Avatar name={user?.username} size="lg" />
                  </div>
                </div>
              </div>
              <div className="md:pl-48 md:pr-4 md:pb-8 md:pt-4 pb-4 pt-20 flex md:flex-row flex-col md:justify-between items-center justify-center">
                <div>
                  <h1 className="font-bold text-4xl">{user?.username}</h1>
                  {user?.status && (
                    <p className="text-secondary text-xl text-center md:text-left">
                      {user?.status}
                    </p>
                  )}
                </div>

                <div className="flex flex-row md:pt-0 pt-4 gap-2">
                  <Button color="primary" onClick={onCreateChat}>
                    Написать
                  </Button>

                  <Button color="accent" onClick={onOpenQrCode}>
                    <FontAwesomeIcon size="lg" icon="qrcode" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Navbar />
      </Layout>

      <Modal ref={qrCodeModalRef}>
        <div className="bg-white p-4">
          <div className="max-w-64 aspect-square">
            <QRCode
              size={256}
              style={{
                height: 'auto',
                maxWidth: '100%',
                width: '100%',
              }}
              value={`https://chat.vsezol.com/user/${userName}`}
              viewBox={`0 0 512 512`}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
