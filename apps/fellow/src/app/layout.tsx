import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen mx-auto md:p-4 p-0 flex md:flex-row-reverse flex-col">
      {children}
    </div>
  );
}
