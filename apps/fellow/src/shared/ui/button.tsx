import { clsx } from 'clsx';
import { PropsWithChildren } from 'react';
import { Color, Size } from './types';

export type ButtonProps = {
  size: Size;
  ariaLabel?: string;
  color?: Color;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
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
  size,
  ariaLabel,
  color = 'ghost',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      aria-label={ariaLabel}
      type={type}
      className={clsx(
        'btn',
        disabled && 'btn-disabled',
        colorClass?.[color],
        sizeClass?.[size]
      )}
    >
      {children}
    </button>
  );
};
