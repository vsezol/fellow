import { Navigate, createBrowserRouter } from 'react-router-dom';
import { withGuards } from '../shared';
import { HasUserNameGuard } from './guards';
import { RootLayout } from './root-layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="chat" />,
      },
      {
        path: 'user',
        lazy: () => import('../pages/user'),
      },
      {
        path: 'settings',
        lazy: () => import('../pages/settings'),
      },
      withGuards(
        {
          path: 'rep',
          lazy: () => import('../pages/rep'),
        },
        <HasUserNameGuard to="user" replace />
      ),
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
