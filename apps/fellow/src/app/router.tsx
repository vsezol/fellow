import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { withGuards } from '../shared';
import { HasUserNameGuard } from './guards';
import { Preloader } from './preloader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Preloader />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="chat" />,
      },
      {
        path: 'user',
        lazy: () => import('../pages/user'),
      },
      withGuards(
        {
          path: 'chat/:chatName?',
          lazy: () => import('../pages/chat'),
        },
        <HasUserNameGuard to="user" replace />
      ),
    ],
  },
]);
