import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { Preloader } from './preloader';

export const RootLayout = () => {
  return (
    <div className={clsx('absolute h-full w-full')}>
      <Preloader />
      <Outlet />
    </div>
  );
};
