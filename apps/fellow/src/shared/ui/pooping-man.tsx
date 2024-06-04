import { CSSProperties, useMemo, useRef } from 'react';

type PoopingManProps = {
  target: HTMLDivElement | null;
};

export const PoopingMan = ({ target }: PoopingManProps) => {
  const manLeg = useRef<HTMLDivElement>(null);
  const targetY = useMemo(
    () =>
      (target?.getBoundingClientRect().top ?? 0) -
      (manLeg?.current?.getBoundingClientRect()?.top ?? 0),
    [target, manLeg]
  );

  return (
    <div className="man w-7 absolute">
      <div className="flex flex-col items-center justify-center relative">
        <div className="rounded-full w-3 h-3 bg-white"></div>
        <div className="w-4 h-1 bg-white right-0 top-4 absolute"></div>
        <div className="w-1 h-4 bg-white"></div>
        <div className="w-4 h-1 bg-white self-end"></div>
        <div className="w-1 h-3 bg-white self-end" ref={manLeg}></div>
      </div>

      {targetY && Poops(targetY)}
    </div>
  );
};

function Poops(targetY: number) {
  return (
    <>
      {new Array(20).fill('').map((_, i) => (
        <span
          aria-label="poop"
          role="img"
          className="poop left-2 top-6"
          key={i}
          style={
            {
              '--delay': i + 1,
              '--x': i % 2 === 0 ? 5 : -5,
              '--y': targetY ?? 0,
            } as CSSProperties
          }
        >
          💩
        </span>
      ))}
      <div
        className="final-poop-wrapper absolute"
        style={
          {
            '--y': targetY ?? 0,
          } as CSSProperties
        }
      >
        <span aria-label="poop" role="img" className="final-poop m-auto">
          💩
        </span>
      </div>
    </>
  );
}
