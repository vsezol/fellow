import { Navigate, createBrowserRouter } from 'react-router-dom';
import { withGuards } from '../shared/lib';
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
        path: 'profile',
        lazy: () => import('../pages/profile'),
      },
      {
        path: 'user/:userName',
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
        <HasUserNameGuard to="profile" replace />
      ),
      withGuards(
        {
          path: 'chat/:chatName?',
          lazy: () => import('../pages/chat'),
        },
        <HasUserNameGuard to="profile" replace />
      ),
      {
        path: '*',
        element: <Navigate to="chat" />,
      },
    ],
  },
]);
