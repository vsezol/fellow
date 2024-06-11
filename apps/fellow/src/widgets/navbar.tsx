import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { selectUserName } from '../entities/user';
import { Button } from '../shared';
import { useAppSelector } from '../store';

const withActiveLinkClasses = (isActive: boolean) =>
  isActive ? 'text-primary transition-all' : undefined;

export const Navbar = () => {
  const userName = useAppSelector(selectUserName);

  return (
    <div className="flex flex-row items-center justify-center p-2 gap-4 md:flex-col md:justify-start md:items-start md:gap-2">
      <NavLink
        to="/user"
        className={({ isActive }) => withActiveLinkClasses(isActive)}
      >
        <Button size="md">
          <FontAwesomeIcon size="lg" icon="gear" />
          <div className="hidden md:block">Настройки</div>
        </Button>
      </NavLink>

      <NavLink
        to="/chat"
        end
        className={({ isActive }) => withActiveLinkClasses(isActive)}
      >
        <Button size="md" disabled={!userName}>
          <FontAwesomeIcon size="lg" icon="message" />
          <div className="hidden md:block">Сообщения</div>
        </Button>
      </NavLink>

      <NavLink
        to="/rep"
        end
        className={({ isActive }) => withActiveLinkClasses(isActive)}
      >
        <Button size="md" disabled={!userName}>
          <FontAwesomeIcon size="lg" icon="arrow-trend-up" />
          <div className="hidden md:block">Репутация</div>
        </Button>
      </NavLink>
    </div>
  );
};
