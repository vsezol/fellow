import { ReactNode, useEffect, useRef } from 'react';

export type ResizableTwoPanelsInitial = [number, number] | [number];
export type ResizableTwoPanelsMin = [number, number];
export type ResizableTwoPanelsOnChange = (width: [number, number]) => void;

export type ResizableTwoPanelsProps = {
  left: ReactNode;
  right: ReactNode;
  initial: ResizableTwoPanelsInitial;
  min: [number, number];
  onChange?: ResizableTwoPanelsOnChange;
};

interface StartData {
  clientX: number;
  leftOffsetWidth: number;
  rightOffsetWidth: number;
}

export const ResizableTwoPanels = ({
  left,
  right,
  initial,
  min = [0, 0],
  onChange,
}: ResizableTwoPanelsProps) => {
  const leftPanel = useRef<HTMLDivElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);
  const resizeHandle = useRef<HTMLDivElement>(null);
  const startData = useRef<StartData>();

  const onMouseDown = (event: React.MouseEvent) => {
    startData.current = {
      clientX: event.clientX,
      leftOffsetWidth: leftPanel.current?.offsetWidth ?? 0,
      rightOffsetWidth: rightPanel.current?.offsetWidth ?? 0,
    };
  };

  useEffect(() => {
    if (!leftPanel.current || !rightPanel.current) {
      return;
    }

    leftPanel.current.style.width = `${initial[0]}px`;
    rightPanel.current.style.width = initial?.[1]
      ? `${initial?.[1]}px`
      : '100%';
  }, [initial]);

  useEffect(() => {
    const mouseMoveListener = (event: MouseEvent) => {
      if (!startData.current || !leftPanel.current || !rightPanel.current) {
        return;
      }

      const dx = event.clientX - startData.current.clientX;

      const newLeft = startData.current.leftOffsetWidth + dx;
      const newRight = startData.current.rightOffsetWidth - dx;

      if (min[0] && newLeft < min[0]) {
        return;
      }

      if (min[1] && newRight < min[1]) {
        return;
      }

      leftPanel.current.style.width = `${newLeft}px`;
      rightPanel.current.style.width = `${newRight}px`;
      onChange?.([newLeft, newRight]);
    };

    const mouseUpListener = () => {
      startData.current = undefined;
    };

    document.addEventListener('mousemove', mouseMoveListener);
    document.addEventListener('mouseup', mouseUpListener);

    return () => {
      document.removeEventListener('mousemove', mouseMoveListener);
      document.removeEventListener('mouseup', mouseUpListener);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-row gap-2">
      <div ref={leftPanel} className="h-full">
        {left}
      </div>

      <div
        onMouseDown={onMouseDown}
        ref={resizeHandle}
        className="cursor-col-resize w-1 h-full opacity-20 border-dashed border-white border-l-2 my-1"
      ></div>

      <div ref={rightPanel} className="h-full flex-1">
        {right}
      </div>
    </div>
  );
};
