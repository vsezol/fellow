import clsx from 'clsx';
import { getHslColorFromString } from '../lib';
import { usePreferredTheme } from '../lib/theme';
import { Size } from './types';

export type AvatarProps = {
  name?: string;
  src?: string;
  size?: Size;
  active?: boolean;
};

const sizeClass: Partial<Record<Size, string>> = {
  xs: 'w-6',
  sm: 'w-10',
  md: 'w-16',
  lg: 'w-40',
};

const textSizeClass: Partial<Record<Size, string>> = {
  xs: 'text-md',
  sm: 'text-lg',
  md: 'text-3xl font-semibold',
  lg: 'text-5xl font-semibold',
};

export const Avatar = ({ name = 'Unknown', src, size = 'md' }: AvatarProps) => {
  const theme = usePreferredTheme();

  const nameInitials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join('');

  const saturation = theme === 'dark' ? 50 : 60;
  const lightness = theme === 'dark' ? 30 : 60;

  const backgroundColor = getHslColorFromString(name, saturation, lightness);

  return (
    <div className="avatar">
      <div
        className={clsx(
          '!flex items-center justify-center rounded-full transition-all',
          sizeClass[size]
        )}
        style={{ backgroundColor }}
      >
        {src ? (
          <img src={src} alt={`${name} avatar`} />
        ) : (
          <span className={clsx(textSizeClass[size])}>{nameInitials}</span>
        )}
      </div>
    </div>
  );
};
