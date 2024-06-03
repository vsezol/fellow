import { Outlet } from 'react-router-dom';
import { Navbar } from '../widgets/navbar';

export default function Layout() {
  return (
    <div className="lg:container h-screen mx-auto md:p-4 p-0 flex md:flex-row-reverse flex-col">
      <div className="overflow-hidden flex-1 flex-grow">
        <Outlet />
      </div>

      <Navbar />
    </div>
  );
}
