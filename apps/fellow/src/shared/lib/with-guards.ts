import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export const withGuards = (
  route: RouteObject,
  ...guards: ReactNode[]
): RouteObject =>
  guards.reverse().reduce(
    (childRoute, guard) => ({
      element: guard,
      children: [childRoute],
    }),
    route
  );
