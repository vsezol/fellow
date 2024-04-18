import { FC, PropsWithChildren, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.css';

export type SlideTransitionProps = {
  direction?: SlideTransitionDirection;
  visible?: boolean;
} & PropsWithChildren;

export type SlideTransitionDirection = 'left' | 'right';

export const SlideTransition: FC<SlideTransitionProps> = ({
  children,
  visible = true,
  direction = 'left',
}) => {
  const classes = `slide-${direction}`;
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={visible}
      nodeRef={nodeRef}
      timeout={500}
      unmountOnExit
      classNames={classes}
    >
      <div className="h-full w-full" ref={nodeRef}>
        {children}
      </div>
    </CSSTransition>
  );
};
