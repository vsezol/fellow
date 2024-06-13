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
        animeMode &&
          'md:dark:bg-anime-dark md:bg-anime-light dark:bg-anime-mobile-dark bg-anime-mobile-light bg-cover'
      )}
    >
      <Preloader />
      <Outlet />
    </div>
  );
};
