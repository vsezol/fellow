import {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export type ModalProps = PropsWithChildren;

export interface ModalControls {
  open: () => void;
  close: () => void;
}

export const ModalCloseByClickOutside = () => {
  return (
    <form method="dialog" className="modal-backdrop">
      <button>close</button>
    </form>
  );
};

export const Modal = forwardRef<ModalControls, ModalProps>(
  ({ children }: ModalProps, ref) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => {
            setIsVisible(true);
            modalRef.current?.showModal?.();
          },
          close: () => {
            setIsVisible(false);
            modalRef.current?.close?.();
          },
        };
      },
      []
    );

    return createPortal(
      <dialog ref={modalRef} className="modal">
        {isVisible && children}
      </dialog>,
      document.body
    );
  }
);
