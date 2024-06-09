import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppearAnimation } from '../shared/ui/appear-animation';

let stack: string[] = [];

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const [isBack, setIsBack] = useState(false);

  useLayoutEffect(() => {
    if (stack.at(-1) === location.pathname) {
      return;
    }

    stack.push(location.pathname);

    for (let i = stack.length - 2; i >= 0; i--) {
      if (location.pathname === stack[i]) {
        setIsBack(true);
        stack = stack.slice(0, i);
        console.log(i);
        console.log('true!');
        return;
      }
    }

    isBack && setIsBack(false);
  }, [location.pathname]);

  console.log(stack, isBack);

  return (
    <AppearAnimation>
      <div className="lg:container h-screen mx-auto md:p-4 p-0 flex md:flex-row-reverse flex-col">
        {children}
      </div>
    </AppearAnimation>
  );
}
