import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import { useAppSelector } from '../store';
import { Preloader } from './preloader';

export const RootLayout = () => {
  const animeMode = useAppSelector(selectAnimeModeEnabled);

  return (
    <div
      className={clsx(
        'absolute h-full w-full',
        animeMode && 'dark:bg-anime-dark bg-anime-light bg-[center_top]'
      )}
    >
      <Preloader />
      <Outlet />
    </div>
  );
};
