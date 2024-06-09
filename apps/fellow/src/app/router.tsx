import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { withGuards } from '../shared';
import { HasUserNameGuard } from './guards';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
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
