import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="lg:container h-screen mx-auto lg:p-4 p-0">
      <Outlet />
    </div>
  );
}
