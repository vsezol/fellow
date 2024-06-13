import clsx from 'clsx';
import {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
} from 'react';
import { Color, Size } from './types';

export interface InputTextProps {
  onChange: ChangeEventHandler;
  onBlur: FocusEventHandler;
  name: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  size?: Size;
  color?: Color;
  transparent?: boolean;
}

const sizeClass: Record<Size, string> = {
  xs: 'input-xs',
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
};

const colorClass: Record<Color, string> = {
  neutral: 'input-neutral',
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  ghost: 'input-ghost',
  link: 'input-link',
};

export const InputText = forwardRef(
  (
    {
      size = 'md',
      color = 'primary',
      transparent = false,
      ...props
    }: InputTextProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        {...props}
        ref={ref}
        type="text"
        className={clsx(
          'input input-bordered w-full',
          sizeClass?.[size],
          colorClass?.[color],
          transparent && 'bg-opacity-50'
        )}
      />
    );
  }
);
