import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="container h-screen mx-auto p-4">
      <Outlet />
    </div>
  );
}
