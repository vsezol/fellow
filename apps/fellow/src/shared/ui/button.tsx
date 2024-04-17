import { clsx } from 'clsx';
import { PropsWithChildren, SyntheticEvent } from 'react';
import { Color, Size } from './types';

export type ButtonProps = {
  size?: Size;
  ariaLabel?: string;
  color?: Color;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: (event: SyntheticEvent) => unknown;
} & PropsWithChildren;

const sizeClass: Partial<Record<Size, string>> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  lg: 'btn-lg',
};

const colorClass: Partial<Record<Color, string>> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  link: 'btn-link',
};

export const Button = ({
  children,
  size = 'md',
  ariaLabel,
  color = 'ghost',
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
      className={clsx(
        'btn',
        disabled && 'btn-disabled',
        colorClass?.[color],
        sizeClass?.[size]
      )}
    >
      <div className="flex flex-row gap-2 items-center">{children}</div>
    </button>
  );
};
