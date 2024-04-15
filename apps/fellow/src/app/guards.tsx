import { Navigate, NavigateProps, Outlet } from 'react-router-dom';
import { selectUserName } from '../entity/user';
import { useAppSelector } from '../store';

export const HasUserNameGuard = (props: NavigateProps) => {
  const userName = useAppSelector(selectUserName);

  return userName ? <Outlet /> : <Navigate {...props} />;
};
