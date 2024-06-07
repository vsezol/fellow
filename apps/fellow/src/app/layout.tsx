import { Outlet } from 'react-router-dom';
import { selectCurrentChatName } from '../entities/chat';
import { useIsMobile } from '../shared';
import { useAppSelector } from '../store';
import { Navbar } from '../widgets/navbar';

export default function Layout() {
  const isMobile = useIsMobile();
  const currentChatName = useAppSelector(selectCurrentChatName);

  const isMobileConversation = isMobile && currentChatName;

  return (
    <div className="lg:container h-screen mx-auto md:p-4 p-0 flex md:flex-row-reverse flex-col">
      <div className="overflow-hidden flex-1 flex-grow">
        <Outlet />
      </div>

      {!isMobileConversation && <Navbar />}
    </div>
  );
}
