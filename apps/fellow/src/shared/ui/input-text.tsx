import {
  ChangeEventHandler,
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
} from 'react';

export interface InputTextProps {
  onChange: ChangeEventHandler;
  onBlur: FocusEventHandler;
  name: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const InputText = forwardRef(
  (props: InputTextProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        {...props}
        ref={ref}
        type="text"
        className="input input-primary input-bordered w-full"
      />
    );
  }
);
