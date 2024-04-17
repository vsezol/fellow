import { Navigate, createBrowserRouter } from 'react-router-dom';
import { withGuards } from '../shared';
import { HasUserNameGuard } from './guards';
import Layout from './layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
