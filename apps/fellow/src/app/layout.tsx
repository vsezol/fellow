import { PropsWithChildren } from 'react';
import { AppearAnimation } from '../shared/ui/appear-animation';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AppearAnimation>
      <div className="h-screen mx-auto md:p-4 p-0 flex md:flex-row-reverse flex-col">
        {children}
      </div>
    </AppearAnimation>
  );
}
