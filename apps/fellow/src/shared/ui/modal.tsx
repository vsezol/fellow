import {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';

export type ModalProps = PropsWithChildren;

export interface ModalControls {
  open: () => void;
  close: () => void;
}

export const Modal = forwardRef<ModalControls, ModalProps>(
  ({ children }: ModalProps, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => {
            modalRef.current?.showModal?.();
          },
          close: () => {
            modalRef.current?.close?.();
          },
        };
      },
      []
    );

    return (
      <dialog ref={modalRef} className="modal">
        {children}
      </dialog>
    );
  }
);
