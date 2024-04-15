import { useNavigate } from 'react-router-dom';
import { selectUserName } from '../entity/user';
import { Button } from '../shared';
import { useAppSelector } from '../store';
import { UserForm } from '../widgets/user-form';

export const Component = () => {
  const navigate = useNavigate();
  const userName = useAppSelector(selectUserName);
  const goToChats = () => navigate('/chat');

  return (
    <div className="flex flex-col h-full mx-auto py-4 gap-4 items-center justify-center sm:max-w-md max-w-sm">
      <UserForm />

      {userName && (
        <div className="self-end">
          <Button onClick={goToChats} size="sm" color="neutral">
            Перейти к чатам
          </Button>
        </div>
      )}
    </div>
  );
};
