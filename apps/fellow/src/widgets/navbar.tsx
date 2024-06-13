import { IconName } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { selectUserName } from '../entities/user';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import { Button } from '../shared';
import { useAppSelector } from '../store';

interface NavItem {
  to: string;
  end?: boolean;
  name: string;
  icon: IconName;
  disabled?: boolean;
}

const withActiveLinkClasses = (isActive: boolean) =>
  isActive ? 'text-primary transition-all' : undefined;

export const Navbar = () => {
  const userName = useAppSelector(selectUserName);
  const animeMode = useAppSelector(selectAnimeModeEnabled);

  const items: NavItem[] = useMemo(
    () => [
      {
        name: 'Профиль',
        to: '/user',
        icon: 'user',
      },
      {
        name: 'Сообщения',
        to: '/chat',
        icon: 'message',
        end: true,
        disabled: !userName,
      },
      {
        name: 'Репутация',
        to: '/rep',
        icon: 'arrow-trend-up',
        end: true,
        disabled: !userName,
      },
      {
        name: 'Настройки',
        to: '/settings',
        icon: 'gear',
        end: true,
        disabled: !userName,
      },
    ],
    [userName]
  );

  return (
    <div
      className={clsx(
        'flex flex-row items-center justify-center md:p-2 gap-4 md:flex-col md:justify-start md:items-start md:gap-2 bg-base-300',
        animeMode && 'bg-opacity-50'
      )}
    >
      {items.map(({ to, disabled, name, icon }) => (
        <NavLink
          to={to}
          key={to}
          className={({ isActive }) => withActiveLinkClasses(isActive)}
        >
          <Button size="md" disabled={disabled}>
            <FontAwesomeIcon size="lg" icon={icon} />
            <div className="hidden md:block">{name}</div>
          </Button>
        </NavLink>
      ))}
    </div>
  );
};
