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
  fullWidth?: boolean;
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
  fullWidth = false,
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
        sizeClass?.[size],
        fullWidth && 'w-full'
      )}
    >
      <div className="w-full flex flex-row gap-2 items-center justify-center">
        {children}
      </div>
    </button>
  );
};
