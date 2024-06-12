import {
  FC,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useWindowSize } from './use-window-size';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const BreakpointContext = createContext<Breakpoint>('xs');

export const useBreakpoint = () => useContext(BreakpointContext);

export const useIsMobile = () => {
  const breakpoint = useBreakpoint();

  return breakpoint === 'xs' || breakpoint === 'sm';
};

export const BreakpointProvider: FC<PropsWithChildren> = ({ children }) => {
  const [width] = useWindowSize();
  const breakpoint = useMemo(() => getBreakpoint(width), [width]);

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
};

export type BreakpointSwitcherProps = Partial<Record<Breakpoint, ReactNode>>;

export const BreakpointSwitcher: FC<BreakpointSwitcherProps> = (props) => {
  const breakpoint = useBreakpoint();
  const width = getBreakpointWidth(breakpoint);

  const breakpoints = Object.keys(props) as Breakpoint[];

  let availableBreakpoint: Breakpoint = breakpoints[0];

  for (let i = 0; i < breakpoints.length; i++) {
    const current = breakpoints[i];
    const lastWidth = BREAKPOINTS[availableBreakpoint];
    const currentWidth = BREAKPOINTS[current];

    if (currentWidth <= width && currentWidth >= lastWidth) {
      availableBreakpoint = current;
    }
  }

  if (!availableBreakpoint) {
    throw new Error('[BreakpointSwitcher] No available breakpoint!');
  }

  return props[availableBreakpoint];
};

export const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

function getBreakpointWidth(breakpoint: Breakpoint): number {
  return BREAKPOINTS[breakpoint];
}

function getBreakpoint(width: number): Breakpoint {
  if (BREAKPOINTS.xs <= width && width < BREAKPOINTS.sm) {
    return 'xs';
  }

  if (BREAKPOINTS.sm <= width && width < BREAKPOINTS.md) {
    return 'sm';
  }

  if (BREAKPOINTS.md <= width && width < BREAKPOINTS.lg) {
    return 'md';
  }

  if (BREAKPOINTS.lg <= width && width < BREAKPOINTS.xl) {
    return 'lg';
  }

  if (BREAKPOINTS.xl <= width && width < BREAKPOINTS.xxl) {
    return 'xl';
  }

  return 'xxl';
}
