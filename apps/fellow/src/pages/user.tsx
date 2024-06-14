import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../app/layout';
import { chatsSlice } from '../entities/chat';
import { selectUserName } from '../entities/user';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import {
  Avatar,
  Button,
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
    <Layout>
      <div className="overflow-hidden flex-1 flex-grow">
        <div className="flex flex-col h-full mx-auto p-4 gap-12 max-w-4xl">
          <div
            className={clsx(
              'bg-base-200 rounded w-full',
              animeMode && 'bg-opacity-50'
            )}
          >
            <div
              className={clsx('w-full p-4 bg-primary/60 relative h-40 rounded')}
            >
              <div className="absolute top-full -translate-y-1/2 flex flex-row gap-4">
                <div className="rounded-full border-2 border-primary border-opacity-60">
                  <Avatar name={user?.username} size="lg" />
                </div>
              </div>
            </div>
            <div className="pl-48 pr-4 pb-8 pt-4 flex flex-row justify-between">
              <div>
                <h1 className="font-bold text-4xl">{user?.username}</h1>
                {user?.status && (
                  <p className="text-secondary text-xl">{user?.status}</p>
                )}
              </div>

              <div className="flex flex-row gap-2">
                <Button color="primary" onClick={onCreateChat}>
                  Написать
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </Layout>
  );
};
